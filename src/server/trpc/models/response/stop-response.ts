import type { ProductsResponse } from "./products-response";

export interface StopResponse {
    type: string;
    id: string;
    name: string;
    location: Location;
    products: ProductsResponse;
    stationDHID: string;
}