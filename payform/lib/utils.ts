// Duplicated from landing/lib/utils.ts — payform is a fully independent
// app and doesn't share a package with landing, so this tiny helper is
// just copied rather than pulled from a shared workspace package.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
