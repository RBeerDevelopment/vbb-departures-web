import type { GeoLocation, LineExtended, VbbLocation, VbbLocationExtended, VbbPolyline } from "../utils";
import type { StopoverResponse } from "./stopover-response";

export interface TripResponse {
    origin: VbbLocation;
    destination: VbbLocationExtended;
    departure: Date;
    plannedDeparture: Date;
    departureDelay: number;
    arrival: Date;
    plannedArrival: Date;
    arrivalDelay: number;
    reachable: boolean;
    polyline: VbbPolyline;
    line: LineExtended;
    direction: string;
    currentLocation: GeoLocation;
    arrivalPlatform?: string;
    plannedArrivalPlatform?: string;
    arrivalPrognosisType: string;
    departurePlatform: string;
    plannedDeparturePlatform: string;
    departurePrognosisType: string;
    id: string;
    realtimeDataUpdatedAt: number;
    stopovers?: StopoverResponse[];
}