import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * دالة مساعدة لدمج كلاسات Tailwind CSS وتجنب التعارضات
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
