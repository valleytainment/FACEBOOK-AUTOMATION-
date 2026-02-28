/**
 * ============================================================================
 * 🛠️ UTILITY FUNCTIONS
 * ============================================================================
 * Description: Core utility functions used across the application.
 * Focus: Performance, Reusability, and Type Safety.
 * ============================================================================
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 🎨 Class Name Merger (cn)
 * ----------------------------------------------------------------------------
 * Intelligently merges Tailwind CSS classes without style conflicts.
 * 
 * @param inputs - An array of class values (strings, objects, arrays, etc.)
 * @returns A single, conflict-free string of Tailwind classes.
 * 
 * @example
 * cn("bg-red-500", isTrue && "text-white", "hover:bg-red-600")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
