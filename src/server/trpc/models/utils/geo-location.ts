export interface GeoLocation {
    type: string;
    latitude: number;
    longitude: number;
}

export interface GeoLocationWithId extends GeoLocation {
    id: string
}