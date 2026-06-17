import { format, getDay, startOfWeek } from "date-fns";

export const DAY_LABELS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export function getCurrentWeekStart(date: Date = new Date()): string {
  return format(startOfWeek(date, { weekStartsOn: 1 }), "yyyy-MM-dd");
}

/** date-fns getDay() returns 0 = Sunday ... 6 = Saturday; remap to 0 = Monday ... 6 = Sunday. */
export function getTodayDayIndex(date: Date = new Date()): number {
  return (getDay(date) + 6) % 7;
}
