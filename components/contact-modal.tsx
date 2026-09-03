// components/contact-modal.tsx
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlassModal } from "@/components/ui/glass-modal";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { contactSchema, type ContactInput } from "@/lib/validation/contact";

const COUNTRIES = [
  "United States", "United Kingdom", "Germany", "France", "Italy", "Spain", "Portugal",
  "Ireland", "Sweden", "Netherlands", "Brazil", "Mexico", "Nigeria", "Morocco",
  "United Arab Emirates", "India", "Malaysia", "Singapore", "Japan", "South Korea", "Australia",
];

export function ContactModal() {
  const { activeModal, close } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { country: "", company: "", email: "", phone: "", comment: "" },
  });

  const onSubmit = async (values: ContactInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
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
    <GlassModal open={activeModal === "contact"} onOpenChange={handleOpenChange} title="Contact us">
      {submitted ? (
        <div className="flex flex-col items-center gap-5 py-4 text-center">
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9.2" />
            <path d="m8.2 12.2 2.6 2.6 5-5.4" />
          </svg>
          <p className="text-foreground">Thanks — our team will reach out within 1 business day.</p>
          <Button className="h-11 w-full rounded-full" onClick={() => handleOpenChange(false)}>
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="contact-country" className="mb-1.5">Country</Label>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="contact-country" className="w-full">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.country && <p className="mt-1 text-xs text-destructive">{errors.country.message}</p>}
          </div>
          <div>
            <Label htmlFor="contact-company" className="mb-1.5">Company</Label>
            <Input id="contact-company" autoComplete="organization" {...register("company")} />
            {errors.company && <p className="mt-1 text-xs text-destructive">{errors.company.message}</p>}
          </div>
          <div>
            <Label htmlFor="contact-email" className="mb-1.5">Email</Label>
            <Input id="contact-email" type="email" autoComplete="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="contact-phone" className="mb-1.5">Phone (optional)</Label>
            <Input id="contact-phone" type="tel" autoComplete="tel" {...register("phone")} />
          </div>
          <div>
            <Label htmlFor="contact-comment" className="mb-1.5">Comment</Label>
            <Textarea id="contact-comment" rows={4} {...register("comment")} />
            {errors.comment && <p className="mt-1 text-xs text-destructive">{errors.comment.message}</p>}
          </div>
          {serverError && (
            <p className="rounded-xl border border-destructive/28 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {serverError}
            </p>
          )}
          <Button type="submit" disabled={isSubmitting} className="h-11 w-full rounded-full">
            {isSubmitting ? "Sending…" : "Send"}
          </Button>
        </form>
      )}
    </GlassModal>
  );
}
