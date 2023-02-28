export function isDate(d: unknown): d is Date {
  return d instanceof Date;
}
