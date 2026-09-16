"use client";

import { useEffect, useState } from "react";

export default function VisitorCount({
  className,
  prefix = "",
}: {
  className?: string;
  prefix?: string;
}) {
  const [visitors, setVisitors] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data: { visitors: number | null }) => setVisitors(data.visitors))
      .catch(() => {});
  }, []);

  if (!visitors) return null;

  return (
    <span className={className}>
      {prefix}
      {visitors.toLocaleString("en-IN")} {visitors === 1 ? "visitor" : "visitors"}
    </span>
  );
}
