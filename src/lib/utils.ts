
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function staggeredDelay(index: number, baseDelay: number = 0.1): string {
  return `${(baseDelay + index * 0.1).toFixed(1)}s`;
}

