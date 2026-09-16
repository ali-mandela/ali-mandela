import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock, LogOut } from "lucide-react";
import { isStatsAuthed } from "@/lib/stats-auth";
import { STATS_TIMEZONE, getStats, type Breakdown } from "@/lib/analytics";
import { login, logout } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Stats | Muhammad Ali",
  robots: { index: false, follow: false },
};

const card = "rounded-2xl border border-border-ui bg-surface p-6";

export default async function StatsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!(await isStatsAuthed())) {
    const { error } = await searchParams;
    return <LoginScreen error={!!error} configured={!!process.env.STATS_PASSWORD} />;
  }

  const stats = await getStats().catch((err) => {
    console.error("[analytics] failed to load stats", err);
    return null;
  });

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 md:px-12 py-10 md:py-16 max-w-6xl">
        <div className="flex items-center justify-between gap-4 mb-10">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-primary-text hover:text-highlight-text transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to portfolio
            </Link>
            <h1 className="text-4xl font-bold text-highlight-text tracking-tight">
              Visitor Stats
            </h1>
          </div>
          <form action={logout}>
            <button className="flex items-center gap-2 px-4 py-2 border border-border-ui rounded-full text-sm text-primary-text hover:text-highlight-text hover:bg-white/5 transition-colors">
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </form>
        </div>

        {!stats ? (
          <p className="text-primary-text">
            Couldn&apos;t load stats. Check that MONGODB_URI is set and the database is reachable.
          </p>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatTile label="Unique visitors" value={stats.uniqueVisitors} />
              <StatTile label="Page views" value={stats.pageViews} />
              <StatTile label="Views, last 24h" value={stats.views24h} />
              <StatTile label="Visitors, last 7 days" value={stats.visitors7d} />
            </div>

            <DailyChart data={stats.daily} />

            <div className="grid md:grid-cols-2 gap-6">
              <BreakdownList title="Top pages" data={stats.pages} />
              <BreakdownList title="Countries" data={stats.countries} />
              <BreakdownList title="Referrers" data={stats.referrers} />
              <div className="grid gap-6">
                <BreakdownList title="Devices" data={stats.devices} />
                <BreakdownList title="Browsers" data={stats.browsers} />
              </div>
            </div>

            <div className={card}>
              <h2 className="text-highlight-text font-semibold mb-4">Recent visits</h2>
              {stats.recent.length === 0 ? (
                <p className="text-primary-text text-sm">No visits yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-primary-text border-b border-border-ui">
                        {["Time (IST)", "Page", "Location", "Referrer", "Device", "Visitor"].map((h) => (
                          <th key={h} className="py-2 pr-4 font-medium whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recent.map((v, i) => (
                        <tr key={i} className="border-b border-border-ui/50 text-highlight-text/90">
                          <td className="py-2 pr-4 whitespace-nowrap font-mono text-xs">
                            {v.createdAt.toLocaleString("en-IN", {
                              timeZone: STATS_TIMEZONE,
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </td>
                          <td className="py-2 pr-4">{v.path}</td>
                          <td className="py-2 pr-4 whitespace-nowrap">
                            {v.city !== "Unknown" ? `${v.city}, ` : ""}
                            {v.country}
                          </td>
                          <td className="py-2 pr-4">{v.referrer}</td>
                          <td className="py-2 pr-4 whitespace-nowrap">
                            {v.device} · {v.browser} · {v.os}
                          </td>
                          <td className="py-2 font-mono text-xs text-primary-text">{v.visitorId.slice(0, 8)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LoginScreen({ error, configured }: { error: boolean; configured: boolean }) {
  return (
    <div className="bg-background text-foreground min-h-screen flex items-center justify-center px-4">
      <form action={login} className={`${card} w-full max-w-sm space-y-4`}>
        <div className="flex items-center gap-2 text-highlight-text">
          <Lock className="w-4 h-4" />
          <h1 className="font-semibold">Stats</h1>
        </div>
        {configured ? (
          <>
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoFocus
              required
              className="w-full px-4 py-3 rounded-xl bg-background border border-border-ui text-highlight-text placeholder:text-primary-text/60 focus:outline-none focus:border-highlight-text/40"
            />
            {error && <p className="text-sm text-red-400">Wrong password.</p>}
            <button className="w-full px-4 py-3 bg-highlight-text text-black rounded-xl font-semibold transition-all hover:opacity-90">
              Unlock
            </button>
          </>
        ) : (
          <p className="text-sm text-primary-text">STATS_PASSWORD is not configured.</p>
        )}
      </form>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className={card}>
      <p className="text-xs uppercase tracking-widest text-primary-text mb-2">{label}</p>
      <p className="text-3xl font-bold text-highlight-text tabular-nums">
        {value.toLocaleString("en-IN")}
      </p>
    </div>
  );
}

function DailyChart({ data }: { data: Breakdown[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  const formatDay = (key: string) =>
    new Date(`${key}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  return (
    <div className={card}>
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-highlight-text font-semibold">Page views, last 30 days</h2>
        <span className="text-xs text-primary-text tabular-nums">max {max}/day</span>
      </div>
      <div className="relative h-48 border-b border-border-ui" role="img" aria-label="Daily page views for the last 30 days">
        <div className="absolute inset-0 flex items-end gap-[2px]">
          {data.map((d) => (
            <div key={d.label} className="group relative flex-1 h-full flex items-end">
              <div
                className="w-full rounded-t bg-accent/80 group-hover:bg-accent transition-colors"
                style={{ height: d.count ? `${Math.max(2, (d.count / max) * 100)}%` : 0 }}
              />
              <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap rounded-lg border border-border-ui bg-background px-2 py-1 text-xs text-highlight-text z-10">
                {formatDay(d.label)}: <span className="tabular-nums font-semibold">{d.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-primary-text">
        <span>{formatDay(data[0].label)}</span>
        <span>{formatDay(data[data.length - 1].label)}</span>
      </div>
    </div>
  );
}

function BreakdownList({ title, data }: { title: string; data: Breakdown[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className={card}>
      <h2 className="text-highlight-text font-semibold mb-4">{title}</h2>
      {data.length === 0 ? (
        <p className="text-primary-text text-sm">No data yet.</p>
      ) : (
        <ul className="space-y-2">
          {data.map((d) => (
            <li key={d.label} className="relative flex items-center justify-between gap-4 px-3 py-1.5 text-sm">
              <div
                className="absolute inset-y-0 left-0 rounded bg-accent/15"
                style={{ width: `${(d.count / max) * 100}%` }}
              />
              <span className="relative truncate text-highlight-text/90">{d.label}</span>
              <span className="relative tabular-nums text-primary-text">{d.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
