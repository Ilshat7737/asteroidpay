"use client";

import { useEffect, useState } from "react";

function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function CountdownTimer({
  createdAt,
  expiredAt,
  onExpire,
}: {
  createdAt: string;
  expiredAt: string;
  onExpire?: () => void;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const start = new Date(createdAt).getTime();
  const end = new Date(expiredAt).getTime();
  const remaining = end - now;
  const total = Math.max(1, end - start);
  const ratio = Math.max(0, Math.min(1, remaining / total));

  useEffect(() => {
    if (remaining <= 0) onExpire?.();
    // Only the crossing into <= 0 matters — `now` ticks every second and
    // would otherwise re-fire this on every tick once expired.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining <= 0]);

  const state = ratio > 0.33 ? "safe" : ratio > 0.1 ? "warning" : "critical";
  const colorClass =
    state === "safe" ? "text-accent" : state === "warning" ? "text-amber-400" : "text-destructive";
  const barClass = state === "safe" ? "bg-accent" : state === "warning" ? "bg-amber-400" : "bg-destructive";

  return (
    <div className="text-right">
      <p className="text-sm text-muted-foreground">Expiration time</p>
      <p className={`font-mono text-lg font-semibold tabular-nums ${colorClass}`}>
        {formatDuration(remaining)}
      </p>
      <div className="mt-1.5 h-1 w-40 overflow-hidden rounded-full bg-border">
        <div
          className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${barClass}`}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );
}
