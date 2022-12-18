
interface Location {
    type: string;
    id: string;
    latitude: number;
    longitude: number;
}

interface Products {
    suburban: boolean;
    subway: boolean;
    tram: boolean;
    bus: boolean;
    ferry: boolean;
    express: boolean;
    regional: boolean;
}

interface Origin {
    name: string;
    location: Location;
    products: Products;
    stationDHID: string;
}

interface Location2 {
    type: string;
    id: string;
    latitude: number;
    longitude: number;
}

interface Products2 {
    suburban: boolean;
    subway: boolean;
    tram: boolean;
    bus: boolean;
    ferry: boolean;
    express: boolean;
    regional: boolean;
}

interface Destination {
    type: string;
    id: string;
    name: string;
    location: Location2;
    products: Products2;
    stationDHID: string;
}

interface Location3 {
    type: string;
    id: string;
    latitude: number;
    longitude: number;
}

interface Products3 {
    suburban: boolean;
    subway: boolean;
    tram: boolean;
    bus: boolean;
    ferry: boolean;
    express: boolean;
    regional: boolean;
}

interface Properties {
    type: string;
    id: string;
    name: string;
    location: Location3;
    products: Products3;
    stationDHID: string;
}

interface Geometry {
    type: string;
    coordinates: number[];
}

interface Feature {
    type: string;
    properties: Properties;
    geometry: Geometry;
}

interface Polyline {
    type: string;
    features: Feature[];
}

interface Operator {
    type: string;
    id: string;
    name: string;
}

interface Color {
    fg: string;
    bg: string;
}

interface Line {
    type: string;
    id: string;
    fahrtNr: string;
    name: string;
    public: boolean;
    adminCode: string;
    productName: string;
    mode: string;
    product: string;
    operator: Operator;
    symbol: string;
    nr: number;
    metro: boolean;
    express: boolean;
    night: boolean;
    color: Color;
}

interface CurrentLocation {
    type: string;
    latitude: number;
    longitude: number;
}

export interface TripResponse {
    origin: Origin;
    destination: Destination;
    departure: Date;
    plannedDeparture: Date;
    departureDelay: number;
    arrival: Date;
    plannedArrival: Date;
    arrivalDelay: number;
    reachable: boolean;
    polyline: Polyline;
    line: Line;
    direction: string;
    currentLocation: CurrentLocation;
    arrivalPlatform?: string;
    plannedArrivalPlatform?: string;
    arrivalPrognosisType: string;
    departurePlatform: string;
    plannedDeparturePlatform: string;
    departurePrognosisType: string;
    id: string;
    realtimeDataUpdatedAt: number;
}

export interface Trip {
    id: string

    originName: string
    departure: Date
    departureDelay: number
    departurePlattform: string

    destination: string
    arrival: Date
    arrivalDelay: number
    arrivalPlattform: string

    lineName: string
    direction: string
    currentLocation: CurrentLocation
    updatedAt: number

    polyline: Polyline

}

export function mapTripResponseToTrip(resp: TripResponse): Trip {
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
        polyline: resp.polyline
    }
}