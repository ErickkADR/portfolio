import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* Helper que os componentes do Aceternity/shadcn esperam encontrar em
   `@/lib/utils`: junta classes condicionais e resolve conflitos do
   Tailwind (a última classe da mesma família vence). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
