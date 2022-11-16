import { isDate } from "./is-date";

export function formatTime(date: Date) {
    if (!isDate(date)) return "-"
    return date.toLocaleTimeString("de").slice(0, 5);
}
