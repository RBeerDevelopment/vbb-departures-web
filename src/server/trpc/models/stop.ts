
import type { StopResponse } from "./response/stop-response";

export type Stop = Omit<StopResponse, "type" | "location" | "stationDHID">

export function mapResponseToStop(response: StopResponse): Stop {
    return {
        id: response.id,
        name: response.name,
        products: response.products,
    };
}