"use client";

import { useEffect, useState } from "react";
import { QrCode, X } from "lucide-react";
import { PaymentQrCode } from "./qr-code";

// Mobile only — the QR sits inline on desktop (see PaymentQrCode), but is
// tucked behind this button on mobile per the reference design.
export function MobileQrButton({ value }: { value: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mx-auto flex h-11 items-center gap-2 rounded-full bg-muted px-6 text-sm font-medium text-foreground"
      >
        Pay with <QrCode className="h-4 w-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background/95 px-6">
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-muted-foreground"
          >
            <X className="h-6 w-6" />
          </button>
          <PaymentQrCode value={value} size={220} />
          <p className="max-w-xs text-center text-sm break-all text-muted-foreground">{value}</p>
        </div>
      )}
    </div>
  );
}
