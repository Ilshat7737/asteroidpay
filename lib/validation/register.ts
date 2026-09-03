import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.email("Enter a valid email").max(200),
});

export type RegisterInput = z.infer<typeof registerSchema>;
