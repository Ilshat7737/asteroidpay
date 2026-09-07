"use client";

import { useEffect, useState } from "react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { ChevronDown, Search, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AssetOption {
  id: string;
  label: string;
  iconUrl?: string | null;
  badge?: string;
}

export function AssetSelect({
  label,
  placeholder,
  value,
  disabled = false,
  loading = false,
  options,
  search,
  onSearchChange,
  onOpenChange,
  onSelect,
}: {
  label: string;
  placeholder: string;
  value: AssetOption | null;
  disabled?: boolean;
  loading?: boolean;
  options: AssetOption[];
  search: string;
  onSearchChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
  onSelect: (option: AssetOption) => void;
}) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    onOpenChange(next);
    if (!next) onSearchChange("");
  }

  function handleMobileOpen(next: boolean) {
    setMobileOpen(next);
    onOpenChange(next);
    if (!next) onSearchChange("");
  }

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileOpen]);

  return (
    <div>
      <p className="text-sm font-medium text-foreground">{label}</p>

      {/* Desktop: inline combobox — the trigger is itself a search input once open. */}
      <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
        <PopoverPrimitive.Trigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "mt-2 hidden h-11 w-full items-center justify-between gap-2 rounded-xl border border-input bg-transparent px-4 text-left text-sm text-foreground outline-none transition-colors md:flex",
              "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {value ? (
              <span className="flex items-center gap-2">
                {value.iconUrl && (
                  // eslint-disable-next-line @next/next/no-img-element -- remote, API-provided icon URL
                  <img src={value.iconUrl} alt="" className="h-5 w-5 rounded-full" />
                )}
                {value.label}
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={6}
            className="z-50 w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
          >
            <div className="flex items-center gap-2 border-b border-border px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                autoFocus
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={`Search ${label.toLowerCase()}…`}
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="max-h-56 overflow-y-auto p-1" onWheel={(e) => (e.currentTarget.scrollTop += e.deltaY)}>
              <OptionsList
                options={options}
                loading={loading}
                selectedId={value?.id ?? null}
                onSelect={(option) => {
                  onSelect(option);
                  handleOpenChange(false);
                }}
              />
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      {/* Mobile: full-screen sheet. */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => handleMobileOpen(true)}
        className={cn(
          "mt-2 flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-input bg-transparent px-4 text-left text-sm text-foreground outline-none transition-colors md:hidden",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {value ? (
          <span className="flex items-center gap-2">
            {value.iconUrl && (
              // eslint-disable-next-line @next/next/no-img-element -- remote, API-provided icon URL
              <img src={value.iconUrl} alt="" className="h-5 w-5 rounded-full" />
            )}
            {value.label}
          </span>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background md:hidden">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={`Search ${label.toLowerCase()}…`}
              className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              aria-label="Close"
              onClick={() => handleMobileOpen(false)}
              className="text-muted-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <OptionsList
              options={options}
              loading={loading}
              selectedId={value?.id ?? null}
              onSelect={(option) => {
                onSelect(option);
                handleMobileOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function OptionsList({
  options,
  loading,
  selectedId,
  onSelect,
}: {
  options: AssetOption[];
  loading: boolean;
  selectedId: string | null;
  onSelect: (option: AssetOption) => void;
}) {
  if (loading) {
    return <p className="px-3 py-4 text-center text-sm text-muted-foreground">Loading…</p>;
  }
  if (options.length === 0) {
    return <p className="px-3 py-4 text-center text-sm text-muted-foreground">No matches</p>;
  }
  return (
    <>
      {options.map((option) => {
        const isSelected = option.id === selectedId;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm outline-none",
              isSelected ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-muted"
            )}
          >
            {option.iconUrl && (
              // eslint-disable-next-line @next/next/no-img-element -- remote, API-provided icon URL
              <img src={option.iconUrl} alt="" className="h-6 w-6 shrink-0 rounded-full" />
            )}
            <span className="flex-1 truncate">{option.label}</span>
            {option.badge && (
              <span className="shrink-0 rounded-full bg-foreground/10 px-2 py-0.5 text-xs">{option.badge}</span>
            )}
            {isSelected && <Check className="h-4 w-4 shrink-0" />}
          </button>
        );
      })}
    </>
  );
}
