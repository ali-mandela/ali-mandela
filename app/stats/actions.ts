"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { STATS_COOKIE, safeEqual, sessionToken } from "@/lib/stats-auth";

export async function login(formData: FormData) {
  const password = process.env.STATS_PASSWORD;
  const input = formData.get("password");

  if (!password || typeof input !== "string" || !safeEqual(input, password)) {
    // Slow down password guessing.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    redirect("/stats?error=1");
  }

  (await cookies()).set(STATS_COOKIE, sessionToken()!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/stats",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/stats");
}

export async function logout() {
  (await cookies()).delete({ name: STATS_COOKIE, path: "/stats" });
  redirect("/stats");
}
