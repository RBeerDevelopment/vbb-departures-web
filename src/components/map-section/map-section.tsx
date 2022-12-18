// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// necessary because of the usage of mismatching @types/react versions in lib and here

import React from "react";

import { env } from "../../env/client.mjs"

import { Map, MapkitProvider, Marker } from 'react-mapkit'
import type { PolylinePoints } from "./map-polyline";
import { MapPolyline } from "./map-polyline";
import type { MapLocation } from "./map-location";

import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from "../../../tailwind.config.cjs"

const tailwindConfigObj = resolveConfig(tailwindConfig)

interface Props {
    polylinePoints?: PolylinePoints
    currentLocation?: MapLocation
    lineName: string
}

export function MapSection(props: Props): React.ReactElement {

    const {
        polylinePoints,
        lineName,
        currentLocation
    } = props;

    const lineColorCode = tailwindConfigObj.theme?.colors[lineName.toLowerCase()]

    const visibleRect = calculateVisibleRectFromPolyline(polylinePoints);
    return (
        <div className="h-96 w-11/12 lg:w-1/2 rounded-lg">
            <MapkitProvider tokenOrCallback={env.NEXT_PUBLIC_MAPKIT_TOKEN}>
                <Map region={visibleRect} padding={12} showsUserLocation={true} isRotationEnabled={false} >
                    <MapPolyline polylinePoints={polylinePoints} style={{ lineWidth: 5, strokeColor: lineColorCode }} />
                    <Marker latitude={currentLocation?.latitude} longitude={currentLocation?.longitude} title="Train Location" />
                </Map>
            </MapkitProvider>
        </div >
    );
}

function calculateVisibleRectFromPolyline(polylinePoints: PolylinePoints) {
    const lats = polylinePoints.map(p => p[0]);
    const longs = polylinePoints.map(p => p[1]);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    const minLong = Math.min(...longs);
    const maxLong = Math.max(...longs);

    return {
        latitude: (maxLat + minLat) / 2,
        longitude: (maxLong + minLong) / 2,
        latitudeSpan: maxLat - minLat,
        longitudeSpan: maxLong - minLong
    }
}