import type { GeoLocationWithId } from "./geo-location";
import type { ProductsBoolean } from "./products-boolean";

export interface VbbLocation {
    name: string;
    location: GeoLocationWithId;
    products: ProductsBoolean;
    stationDHID: string;
}

export interface VbbLocationExtended extends VbbLocation {
    type: string;
    id: string;
}