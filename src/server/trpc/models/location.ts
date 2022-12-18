export interface Products {
    suburban: boolean;
    subway: boolean;
    tram: boolean;
    bus: boolean;
    ferry: boolean;
    express: boolean;
    regional: boolean;
}

export interface LocationResponse {
    type: string;
    id: string;
    name: string;
    products: Products;
    latitude?: number;
    longitude?: number;
    distance?: number;
}

export interface LocationModel {
    type: string;
    id: string;
    name: string;
    products: Products
    distance?: number
}

export function mapLocationResponseToLocation(resp: LocationResponse): LocationModel {
    return {
        id: resp.id,
        type: resp.type,
        name: resp.name,
        products: resp.products,
        distance: resp.distance
    }
}