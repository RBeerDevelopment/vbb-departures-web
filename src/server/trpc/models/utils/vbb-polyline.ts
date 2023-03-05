import type { VbbLocationExtended } from "./vbb-location";

export interface VbbPolyline {
    type: string;
    features: Feature[];
}

interface Geometry {
    type: string;
    coordinates: number[];
}

interface Feature {
    type: string;
    properties: VbbLocationExtended;
    geometry: Geometry;
}