import type { LineType, TransportType } from "./utils";
import type { DepartureResponse } from "./response";

export interface Departure {
  id: string;
  when: Date;
  stopName: string;
  delay: number;
  direction: string;
  lineName: string;
  lineType: LineType;
  transportType: TransportType;
  destinationName: string;
}

export function mapResponseToDeparture(
  resp: DepartureResponse
): Departure {
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
