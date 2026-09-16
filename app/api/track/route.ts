import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";
import {
  VISITS_COLLECTION,
  isBot,
  parseUserAgent,
  referrerSource,
  visitorId,
  type Visit,
} from "@/lib/analytics";

export const dynamic = "force-dynamic";

const noContent = () => new NextResponse(null, { status: 204 });

export async function POST(req: NextRequest) {
  const userAgent = req.headers.get("user-agent") ?? "";
  if (isBot(userAgent)) return noContent();

  let body: { path?: unknown; referrer?: unknown };
  try {
    body = await req.json();
  } catch {
    return noContent();
  }

  const path = typeof body.path === "string" ? body.path.slice(0, 200) : "/";
  if (path.startsWith("/stats")) return noContent();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "";
  const city = req.headers.get("x-vercel-ip-city");

  const visit: Visit = {
    path,
    referrer: referrerSource(
      typeof body.referrer === "string" ? body.referrer : "",
      req.nextUrl.hostname,
    ),
    country: req.headers.get("x-vercel-ip-country") ?? "Unknown",
    city: city ? decodeURIComponent(city) : "Unknown",
    ...parseUserAgent(userAgent),
    visitorId: visitorId(ip, userAgent),
    createdAt: new Date(),
  };

  try {
    const db = await getDb();
    await db?.collection<Visit>(VISITS_COLLECTION).insertOne(visit);
  } catch (err) {
    console.error("[analytics] failed to record visit", err);
  }

  return noContent();
}
