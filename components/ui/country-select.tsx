"use client";

import { useMemo, useState } from "react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { ChevronDownIcon, SearchIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { COUNTRIES } from "@/lib/data/countries";

// A searchable country picker. Radix's own Select has no text-search
// affordance beyond single-character type-ahead, which doesn't scale to a
// ~190-country list — this swaps it for a Popover + filtered list instead,
// styled to match SelectTrigger's look so the rest of the form is unaffected.
export function CountrySelect({
  id,
  value,
  onChange,
  placeholder = "Select your country",
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter((country) => country.toLowerCase().includes(q));
  }, [query]);

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <PopoverPrimitive.Trigger asChild>
        <button
          id={id}
          type="button"
          className="flex h-9 w-full items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30 dark:hover:bg-input/50"
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value || placeholder}
          </span>
          <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          className="z-50 w-80 overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
        >
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search countries…"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div
            className="max-h-56 overflow-y-auto p-1"
            // The modal this lives inside locks body scroll (Radix Dialog's
            // own scroll-lock), which also swallows wheel events aimed at
            // this list since it's a separate Popover portal, not part of
            // the Dialog's own recognized scrollable region — scrolling it
            // directly here bypasses that instead of fighting it.
            onWheel={(e) => {
              e.currentTarget.scrollTop += e.deltaY;
            }}
          >
            {filtered.length === 0 ? (
              <p className="px-2 py-3 text-center text-sm text-muted-foreground">No matches</p>
            ) : (
              filtered.map((country) => (
                <button
                  key={country}
                  type="button"
                  onClick={() => {
                    onChange(country);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between gap-1.5 rounded-md px-2 py-1.5 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                >
                  {country}
                  {value === country && <CheckIcon className="h-4 w-4 shrink-0" />}
                </button>
              ))
            )}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
