import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormatter(date_string: String) {
  const date = new Date(date_string);

  const day = date.getDate(); // Get the day (1-31)
  const month = date.getMonth(); // Get the month (0-11)
  const year = date.getFullYear(); // Get the year (e.g., 2024)

  return `${day}/${month + 1}/${year}`;
}
