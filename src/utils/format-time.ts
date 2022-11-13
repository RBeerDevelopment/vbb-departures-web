export function formatTime(date: Date) {
    return date.toLocaleTimeString("de").slice(0, 5);
}
