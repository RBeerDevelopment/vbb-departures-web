const formatter = new Intl.RelativeTimeFormat("en", { style: "narrow" });

export function formatMinDiff(minDiff: number): string {
  if (minDiff === 0) {
    return "now";
  }

  return formatter.format(minDiff, "minutes");
}
