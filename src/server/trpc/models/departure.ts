import type { TransportType } from "./transport-type";

interface Color {
    fg: string;
    bg: string;
}

export interface Line {
    type: string;
    id: string;
    name: string;
    productName: string;
    mode: TransportType;
    product: LineType;
    symbol: string;
    nr: number;
    color: Color;
}


interface Destination {
    id: string;
    name: string;
}

interface CurrentTripPosition {
    type: string;
    latitude: number;
    longitude: number;
}

export interface DepatureResponse {
    tripId: string
    when: string;
    stop: { name: string }
    delay: number;
    direction: string;
    line: Line;
    type: LineType;
    destination: Destination;
    currentTripPosition: CurrentTripPosition;
}

export const LineType = ["suburban", "subway", "tram", "bus", "ferry", "express", "regional"] as const;
export type LineType = typeof LineType[number]

export const LineTypeLabels: Record<LineType, string> = {
    "suburban": "S-Bahn",
    "subway": "U-Bahn",
    "tram": "Tram",
    "bus": "Bus",
    "ferry": "Fähre",
    "express": "Express",
    "regional": "Regio"
} as const;

export interface Departure {
    id: string
    when: Date
    stopName: string
    delay: number
    direction: string
    lineName: string
    lineType: LineType
    transportType: TransportType
    destinationName: string
}

export function mapDepartureResponseToDeparture(resp: DepatureResponse): Departure {
    return {
        id: resp.tripId,
        when: new Date(resp.when),
        stopName: resp.stop.name,
        delay: resp.delay,
        direction: resp.direction,
        lineName: resp.line.name,
        lineType: resp.line.product,
        transportType: resp.line.mode,
        destinationName: resp.destination.name,
    };
}