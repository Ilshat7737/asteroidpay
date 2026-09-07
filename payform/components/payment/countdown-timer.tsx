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

function useCountdown(createdAt: string, expiredAt: string, onExpire?: () => void) {
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
  return { text: formatDuration(remaining), ratio, state } as const;
}

const COLOR = { safe: "text-accent", warning: "text-amber-400", critical: "text-destructive" } as const;
const BAR_COLOR = { safe: "bg-accent", warning: "bg-amber-400", critical: "bg-destructive" } as const;

// Desktop: label above, value+bar below, right-aligned, narrow bar.
export function CountdownTimer({
  createdAt,
  expiredAt,
  onExpire,
}: {
  createdAt: string;
  expiredAt: string;
  onExpire?: () => void;
}) {
  const { text, ratio, state } = useCountdown(createdAt, expiredAt, onExpire);

  return (
    <div className="text-right">
      <p className="text-sm text-muted-foreground">Expiration time</p>
      <p className={`font-mono text-lg font-semibold tabular-nums ${COLOR[state]}`}>{text}</p>
      <div className="mt-1.5 h-1 w-40 overflow-hidden rounded-full bg-border">
        <div
          className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${BAR_COLOR[state]}`}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );
}

// Mobile: label/value on one row, full-width bar underneath.
export function CountdownTimerRow({
  createdAt,
  expiredAt,
  onExpire,
}: {
  createdAt: string;
  expiredAt: string;
  onExpire?: () => void;
}) {
  const { text, ratio, state } = useCountdown(createdAt, expiredAt, onExpire);

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Expiration time</span>
        <span className={`font-mono font-semibold tabular-nums ${COLOR[state]}`}>{text}</span>
      </div>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border">
        <div
          className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${BAR_COLOR[state]}`}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );
}
