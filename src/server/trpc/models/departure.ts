import { listenerCount } from "process";

interface Color {
    fg: string;
    bg: string;
}

export interface Line {
    type: string;
    id: string;
    name: string;
    productName: string;
    mode: string;
    product: string;
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
    delay: number;
    direction: string;
    line: Line;
    destination: Destination;
    currentTripPosition: CurrentTripPosition;
}

export interface Departure {
    id: string
    when: Date
    delay: number
    direction: string
    lineName: string
    destinationName: string
    lineColor: Color
}

export function mapDepartureResponseToDeparture(resp: DepatureResponse): Departure {
    return {
        id: resp.tripId,
        when: new Date(resp.when),
        delay: resp.delay,
        direction: resp.direction,
        lineName: resp.line.name,
        destinationName: resp.destination.name,
        lineColor: resp.line.color
    }
}