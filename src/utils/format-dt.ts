export function formatDateTime(date: Date) {
    return date.toLocaleDateString("de") + " | " + date.toLocaleTimeString("de").slice(0,);
}
