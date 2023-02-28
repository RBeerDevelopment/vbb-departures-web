import { formatMinDiff } from "./format-min-diff";

export function formatMinDiffToNow(date: Date): string {
  const now = new Date();

  const diff = Math.round((date.getTime() - now.getTime()) / 60000);

  return formatMinDiff(diff);
}
