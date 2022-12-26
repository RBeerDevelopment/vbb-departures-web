export const StopState = {
    Past: "past",
    Current: "current",
    Future: "future"
} as const;

export type StopState = typeof StopState[keyof typeof StopState]