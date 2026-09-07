import type { ConfirmsResult } from "@/lib/payment/types";

export function ConfirmationsValue({ confirms, className }: { confirms: ConfirmsResult | null; className?: string }) {
  return (
    <span className={className}>{confirms ? `${confirms.confirms} from ${confirms.need_confirms}` : "0 from —"}</span>
  );
}

export function Confirmations({ confirms }: { confirms: ConfirmsResult | null }) {
  return (
    <p className="text-sm text-muted-foreground">
      Confirmations <ConfirmationsValue confirms={confirms} className="font-medium text-foreground" />
    </p>
  );
}
