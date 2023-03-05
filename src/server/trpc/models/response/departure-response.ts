import type { GeoLocation } from "../utils/geo-location";
import type { Line, LineType } from "../utils";

export interface DepartureResponse {
    tripId: string;
    when: string;
    stop: { name: string };
    delay: number;
    direction: string;
    line: Line;
    type: LineType;
    destination: Destination;
    currentTripPosition: GeoLocation;
}


interface Destination {
    id: string;
    name: string;
}