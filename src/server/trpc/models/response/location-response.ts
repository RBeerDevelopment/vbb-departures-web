import type { ProductsBoolean } from "../utils";

export interface LocationResponse {
    type: string;
    id: string;
    name: string;
    products: ProductsBoolean;
    latitude?: number;
    longitude?: number;
    distance?: number;
}