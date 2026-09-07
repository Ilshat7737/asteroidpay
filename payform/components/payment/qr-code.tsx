"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function PaymentQrCode({ value, size = 140 }: { value: string; size?: number }) {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    QRCode.toString(value, { type: "svg", margin: 1, width: size }, (err, result) => {
      if (!cancelled && !err) setSvg(result);
    });
    return () => {
      cancelled = true;
    };
  }, [value, size]);

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-xl bg-white p-2"
      style={{ width: size + 16, height: size + 16 }}
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
}
