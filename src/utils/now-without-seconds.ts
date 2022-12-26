export function nowWithoutSeconds(): Date {
    const now = new Date();
    now.setSeconds(0, 0);
    return now;
}