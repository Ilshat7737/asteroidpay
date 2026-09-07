"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlassModal } from "@/components/ui/glass-modal";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, type RegisterInput } from "@/lib/validation/register";

export function RegisterModal() {
  const { activeModal, close } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values: RegisterInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      close();
      setSubmitted(false);
      setServerError(null);
      reset();
    }
  };

  return (
    <GlassModal open={activeModal === "register"} onOpenChange={handleOpenChange} title="Get the Asteroid Pay Wallet">
      {submitted ? (
        <div className="flex flex-col items-center gap-5 py-4 text-center">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9.2" />
            <path d="m8.2 12.2 2.6 2.6 5-5.4" />
          </svg>
          <p className="text-foreground">Thanks — we&apos;ll email you as soon as early access opens.</p>
          <Button className="h-11 w-full rounded-full" onClick={() => handleOpenChange(false)}>
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="register-name" className="mb-1.5">Name</Label>
            <Input id="register-name" autoComplete="name" {...register("name")} />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="register-email" className="mb-1.5">Email</Label>
            <Input id="register-email" type="email" autoComplete="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
          </div>
          {serverError && (
            <p className="rounded-xl border border-destructive/28 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {serverError}
            </p>
          )}
          <Button type="submit" disabled={isSubmitting} className="h-11 w-full rounded-full">
            {isSubmitting ? "Submitting…" : "Get early access"}
          </Button>
        </form>
      )}
    </GlassModal>
  );
}
