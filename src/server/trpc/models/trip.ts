import type { GeoLocation, VbbPolyline } from "./utils";
import type { StopoverResponse, TripResponse } from "./response";

export interface Trip {
  id: string;

  originName: string;
  departure: Date;
  departureDelay: number;
  departurePlattform: string;

  destination: string;
  arrival: Date;
  arrivalDelay: number;
  arrivalPlattform: string;

  lineName: string;
  direction: string;
  currentLocation: GeoLocation;
  updatedAt: number;

  polyline?: VbbPolyline;
  stopovers?: Stopover[];
}



export function mapResponseToTrip(resp: TripResponse): Trip {
  return {
    id: resp.id,
    originName: resp.origin.name,
    departure: new Date(resp.departure),
    departureDelay: resp.departureDelay,
    departurePlattform: resp.departurePlatform,
    destination: resp.destination.name,
    arrival: new Date(resp.arrival),
    arrivalDelay: resp.arrivalDelay,
    arrivalPlattform: resp.arrivalPlatform || "",
    lineName: resp.line.name,
    direction: resp.direction,
    currentLocation: resp.currentLocation,
    updatedAt: resp.realtimeDataUpdatedAt,
    polyline: resp.polyline,
    stopovers: resp.stopovers
      ? resp.stopovers.map(mapResponseToStopover)
      : undefined,
  };
}

export interface Stopover {
  id: string;
  stopName: string;
  arrival?: Date;
  plannedArrival?: Date;
  arrivalDelay?: number;
  platform: string;
  plannedPlatform: string;
  departure?: Date;
  plannedDeparture?: Date;
  departureDelay?: number;
}

function mapResponseToStopover(resp: StopoverResponse): Stopover {
  return {
    id: resp.stop.id,
    stopName: resp.stop.name,
    arrival: resp.arrival ? new Date(resp.arrival) : undefined,
    plannedArrival: resp.plannedArrival
      ? new Date(resp.plannedArrival)
      : undefined,
    arrivalDelay: resp.arrivalDelay,
    platform: resp.arrivalPlatform,
    plannedPlatform: resp.plannedArrivalPlatform,
    departure: resp.departure ? new Date(resp.departure) : undefined,
    plannedDeparture: resp.plannedDeparture
      ? new Date(resp.plannedDeparture)
      : undefined,
    departureDelay: resp.departureDelay,
  };
}