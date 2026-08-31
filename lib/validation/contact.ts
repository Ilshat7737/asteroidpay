import { z } from "zod";

export const contactSchema = z.object({
  country: z.string().min(1, "Country is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  comment: z.string().min(1, "Please add a comment"),
});

export type ContactInput = z.infer<typeof contactSchema>;
