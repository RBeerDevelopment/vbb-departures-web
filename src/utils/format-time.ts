import { isDate } from "./is-date";

export function formatTimeHHMM(date: Date): string {

    console.log({ date, isDate: isDate(date) })
    if (!isDate(date)) return "-"
    return date.toLocaleTimeString("de").slice(0, 5);
}
