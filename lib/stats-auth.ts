import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const STATS_COOKIE = "stats_session";

export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

// Derived from STATS_PASSWORD, so changing the password logs out every session.
export function sessionToken(): string | null {
  const password = process.env.STATS_PASSWORD;
  if (!password) return null;
  return createHmac("sha256", password).update("amdak-stats-session").digest("hex");
}

export async function isStatsAuthed(): Promise<boolean> {
  const token = sessionToken();
  if (!token) return false;
  const cookie = (await cookies()).get(STATS_COOKIE)?.value;
  return !!cookie && safeEqual(cookie, token);
}
