import type { StopResponse } from "./stop-response";

export interface StopoverResponse {
    stop: StopResponse;
    arrival?: Date;
    plannedArrival?: Date;
    arrivalDelay?: number;
    arrivalPlatform: string;
    arrivalPrognosisType: string;
    plannedArrivalPlatform: string;
    departure?: Date;
    plannedDeparture?: Date;
    departureDelay?: number;
    departurePlatform: string;
    departurePrognosisType: string;
    plannedDeparturePlatform: string;
}