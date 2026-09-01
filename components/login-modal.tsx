// components/login-modal.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlassModal } from "@/components/ui/glass-modal";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginInput } from "@/lib/validation/login";

export function LoginModal() {
  const { activeModal, close, openContact } = useModal();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async () => {
    setServerError(null);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setServerError("Invalid email or password.");
  };

  const clearForm = () => {
    setServerError(null);
    reset();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      close();
      clearForm();
    }
  };

  // Switching straight to the contact modal never fires Radix's onOpenChange,
  // so clear the form here too — otherwise reopening login shows stale state.
  const handleContactClick = () => {
    clearForm();
    openContact();
  };

  return (
    <GlassModal open={activeModal === "login"} onOpenChange={handleOpenChange} title="Log in to HQclouds">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="login-email">Email</Label>
          <Input id="login-email" type="email" autoComplete="email" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
        </div>
        {serverError && (
          <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-700">{serverError}</p>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-black text-white hover:bg-black/80"
        >
          {isSubmitting ? "Logging in…" : "Log in"}
        </Button>
        <p className="text-center text-xs text-black/60">
          Don&apos;t have an account?{" "}
          <button type="button" onClick={handleContactClick} className="font-medium underline">
            Contact us
          </button>
        </p>
      </form>
    </GlassModal>
  );
}
