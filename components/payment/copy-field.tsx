"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyField({
  label,
  value,
  displayValue,
}: {
  label: string;
  value: string;
  // What's shown in the box, e.g. a truncated contract address — the
  // copy button always copies the full `value` regardless.
  displayValue?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard permission denied or unavailable — nothing sensible to
      // fall back to here, the field's text itself is already selectable.
    }
  }

  return (
    <div className="rounded-xl bg-muted/40 px-4 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-start justify-between gap-3">
        <p className="break-all font-mono text-sm text-foreground">{displayValue ?? value}</p>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${label.toLowerCase()}`}
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        >
          {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
