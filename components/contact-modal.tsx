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
        <div className="py-4 text-center">
          <p className="text-black">Thanks — our team will reach out within 1 business day.</p>
          <Button
            className="mt-6 rounded-full bg-black text-white hover:bg-black/80"
            onClick={() => handleOpenChange(false)}
          >
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="contact-country">Country</Label>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="contact-country">
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
            {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>}
          </div>
          <div>
            <Label htmlFor="contact-company">Company</Label>
            <Input id="contact-company" autoComplete="organization" {...register("company")} />
            {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>}
          </div>
          <div>
            <Label htmlFor="contact-email">Email</Label>
            <Input id="contact-email" type="email" autoComplete="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="contact-phone">Phone (optional)</Label>
            <Input id="contact-phone" type="tel" autoComplete="tel" {...register("phone")} />
          </div>
          <div>
            <Label htmlFor="contact-comment">Comment</Label>
            <Textarea id="contact-comment" rows={4} {...register("comment")} />
            {errors.comment && <p className="mt-1 text-xs text-red-600">{errors.comment.message}</p>}
          </div>
          {serverError && (
            <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-700">{serverError}</p>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-black text-white hover:bg-black/80"
          >
            {isSubmitting ? "Sending…" : "Send"}
          </Button>
        </form>
      )}
    </GlassModal>
  );
}
