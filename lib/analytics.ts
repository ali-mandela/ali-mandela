import { createHash } from "crypto";
import { getDb } from "@/lib/mongodb";

export const VISITS_COLLECTION = "visits";
export const STATS_TIMEZONE = "Asia/Kolkata";

export interface Visit {
  path: string;
  referrer: string;
  country: string;
  city: string;
  device: string;
  browser: string;
  os: string;
  visitorId: string;
  createdAt: Date;
}

const BOT_PATTERN =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|quora link|whatsapp|telegram|headless|lighthouse|pingdom|uptime|curl|wget|python-requests|axios|node-fetch/i;

export function isBot(userAgent: string): boolean {
  return !userAgent || BOT_PATTERN.test(userAgent);
}

export function parseUserAgent(ua: string) {
  const device = /ipad|tablet/i.test(ua)
    ? "Tablet"
    : /mobi|android|iphone/i.test(ua)
      ? "Mobile"
      : "Desktop";

  const browser = /edg\//i.test(ua)
    ? "Edge"
    : /opr\/|opera/i.test(ua)
      ? "Opera"
      : /samsungbrowser/i.test(ua)
        ? "Samsung Internet"
        : /firefox|fxios/i.test(ua)
          ? "Firefox"
          : /chrome|crios/i.test(ua)
            ? "Chrome"
            : /safari/i.test(ua)
              ? "Safari"
              : "Other";

  const os = /windows/i.test(ua)
    ? "Windows"
    : /android/i.test(ua)
      ? "Android"
      : /iphone|ipad|ipod/i.test(ua)
        ? "iOS"
        : /mac os/i.test(ua)
          ? "macOS"
          : /linux/i.test(ua)
            ? "Linux"
            : "Other";

  return { device, browser, os };
}

// One-way hash of IP + user agent: counts unique visitors without storing IPs.
export function visitorId(ip: string, userAgent: string): string {
  const salt = process.env.ANALYTICS_SALT ?? "amdak";
  return createHash("sha256")
    .update(`${salt}:${ip}:${userAgent}`)
    .digest("hex")
    .slice(0, 16);
}

export function referrerSource(referrer: string, siteHost: string): string {
  if (!referrer) return "Direct";
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (!host || host === siteHost.replace(/^www\./, "")) return "Direct";
    return host;
  } catch {
    return "Direct";
  }
}

export async function getVisitorCount(): Promise<number | null> {
  const db = await getDb();
  if (!db) return null;
  const [row] = await db
    .collection<Visit>(VISITS_COLLECTION)
    .aggregate<{ n: number }>([{ $group: { _id: "$visitorId" } }, { $count: "n" }])
    .toArray();
  return row?.n ?? 0;
}

export interface Breakdown {
  label: string;
  count: number;
}

export interface Stats {
  pageViews: number;
  uniqueVisitors: number;
  views24h: number;
  visitors7d: number;
  daily: Breakdown[];
  pages: Breakdown[];
  countries: Breakdown[];
  referrers: Breakdown[];
  devices: Breakdown[];
  browsers: Breakdown[];
  recent: Visit[];
}

const DAYS = 30;

function dayKey(date: Date): string {
  return date.toLocaleDateString("en-CA", { timeZone: STATS_TIMEZONE });
}

export async function getStats(): Promise<Stats | null> {
  const db = await getDb();
  if (!db) return null;
  const visits = db.collection<Visit>(VISITS_COLLECTION);

  const now = Date.now();
  const since24h = new Date(now - 24 * 60 * 60 * 1000);
  const since7d = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const since30d = new Date(now - DAYS * 24 * 60 * 60 * 1000);

  const countUnique = async (match: object) => {
    const [row] = await visits
      .aggregate<{ n: number }>([
        { $match: match },
        { $group: { _id: "$visitorId" } },
        { $count: "n" },
      ])
      .toArray();
    return row?.n ?? 0;
  };

  const breakdown = (field: keyof Visit, limit = 8) =>
    visits
      .aggregate<Breakdown>([
        { $group: { _id: `$${field}`, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: limit },
        { $project: { _id: 0, label: { $ifNull: ["$_id", "Unknown"] }, count: 1 } },
      ])
      .toArray();

  const [
    pageViews,
    uniqueVisitors,
    views24h,
    visitors7d,
    dailyRows,
    pages,
    countries,
    referrers,
    devices,
    browsers,
    recent,
  ] = await Promise.all([
    visits.countDocuments(),
    countUnique({}),
    visits.countDocuments({ createdAt: { $gte: since24h } }),
    countUnique({ createdAt: { $gte: since7d } }),
    visits
      .aggregate<Breakdown>([
        { $match: { createdAt: { $gte: since30d } } },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: STATS_TIMEZONE },
            },
            count: { $sum: 1 },
          },
        },
        { $project: { _id: 0, label: "$_id", count: 1 } },
      ])
      .toArray(),
    breakdown("path"),
    breakdown("country"),
    breakdown("referrer"),
    breakdown("device", 4),
    breakdown("browser", 6),
    visits.find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(25).toArray(),
  ]);

  const byDay = new Map(dailyRows.map((r) => [r.label, r.count]));
  const daily: Breakdown[] = Array.from({ length: DAYS }, (_, i) => {
    const key = dayKey(new Date(now - (DAYS - 1 - i) * 24 * 60 * 60 * 1000));
    return { label: key, count: byDay.get(key) ?? 0 };
  });

  return {
    pageViews,
    uniqueVisitors,
    views24h,
    visitors7d,
    daily,
    pages,
    countries,
    referrers,
    devices,
    browsers,
    recent,
  };
}
