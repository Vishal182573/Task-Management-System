import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormatter(date_string: Date) {
  const date = new Date(date_string);

  const day = date.getDate(); // Get the day (1-31)
  const month = date.getMonth(); // Get the month (0-11)
  const year = date.getFullYear(); // Get the year (e.g., 2024)

  return `${day}/${month + 1}/${year}`;
}

export function calculateDaysDifference(date1: Date, date2: Date) {
  // Calculate the difference in milliseconds:
  const differenceMilliseconds = new Date(date1) - new Date(date2);
  // Convert milliseconds to days
  const daysDifference = Math.floor(
    differenceMilliseconds / (1000 * 60 * 60 * 24)
  );

  return daysDifference;
}

export const calculateDelayInDays = (endingDate) => {
  const today = new Date();
  const end = new Date(endingDate);
  const diffTime = today - end;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export function RouteNameformatter(route: string) {
  let parts: any = route.split("/")[1];

  parts = parts.split("-");

  // Capitalize each word in the parts
  const capitalizedParts = parts.map((part: string) => {
    return part.charAt(0).toUpperCase() + part.slice(1);
  });

  // Join the parts with a space
  const formattedName = capitalizedParts.join(" ");

  return formattedName;
}

export function calculateDelay(endingDate: string) {
  const endDate = new Date(endingDate);
  const currentDate = new Date();
  if (currentDate > endDate) {
    const differenceMs = currentDate.getTime() - endDate.getTime();
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    return `${differenceDays} Day${differenceDays > 1 ? "s" : ""}`;
  } else {
    return "-";
  }
}
