import { z } from "zod";

export const contactSchema = z.object({
  country: z.string().min(1, "Country is required").max(200),
  company: z.string().min(1, "Company is required").max(200),
  email: z.email("Enter a valid email").max(200),
  phone: z.string().max(200).optional(),
  comment: z.string().min(1, "Please add a comment").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
