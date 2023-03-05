export const LineType = [
    "suburban",
    "subway",
    "tram",
    "bus",
    "ferry",
    "express",
    "regional",
] as const;

export type LineType = (typeof LineType)[number];

export const LineTypeLabels: Record<LineType, string> = {
    suburban: "S-Bahn",
    subway: "U-Bahn",
    tram: "Tram",
    bus: "Bus",
    ferry: "Fähre",
    express: "Express",
    regional: "Regio",
} as const;