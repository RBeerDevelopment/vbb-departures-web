import type { LocationResponse } from "./response";

export type LocationModel = Omit<LocationResponse, "longitude" | "latitude">

export function mapResponseToLocation(
  resp: LocationResponse
): LocationModel {
  return {
    id: resp.id,
    type: resp.type,
    name: resp.name,
    products: resp.products,
    distance: resp.distance,
  };
}
