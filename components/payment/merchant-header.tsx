import type { PaymentInfoResult } from "@/lib/payment/types";

export function MerchantHeader({ branding, uuid }: { branding: PaymentInfoResult["branding"]; uuid: string }) {
  return (
    <div className="flex items-center gap-3">
      {branding.icon_default ? (
        // eslint-disable-next-line @next/next/no-img-element -- remote, merchant-provided icon URL
        <img src={branding.icon_default} alt="" className="h-10 w-10 rounded-full bg-muted object-cover" />
      ) : (
        <div className="h-10 w-10 rounded-full bg-muted" />
      )}
      <div>
        <p className="font-heading text-base font-semibold text-foreground">{branding.name}</p>
        <p className="text-sm text-muted-foreground">Invoice #{uuid.slice(0, 8).toUpperCase()}</p>
      </div>
    </div>
  );
}
