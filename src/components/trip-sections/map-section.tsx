// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// necessary because of the usage of mismatching @types/react versions in lib and here

import React from "react";
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
        <>
            <div className="h-96 w-screen p-4">
                <MapkitProvider tokenOrCallback="eyJhbGciOiJFUzI1NiIsImtpZCI6IjlNNjZER1hCOEsiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiI0UlQ4NE05OU40IiwiaWF0IjoxNjY4NzE1MTM0Ljg4Njk3LCJleHAiOjE2NzIzMTUxMzQuODg2OTd9.qwbb-HxaG0VSLGs8ASi8Gd4g7Ol9qD_L4sCWxS955tpcmKY_du3XgKgSXGiLMj83DqF77lXFitgV9wPpLrYnCQ">
                    <Map region={visibleRect} padding={12} >
                        <MapPolyline polylinePoints={polylinePoints} style={{ lineWidth: 5, strokeColor: lineColorCode }} />
                        <Marker latitude={currentLocation?.latitude} longitude={currentLocation?.longitude} />
                    </Map>
                </MapkitProvider>
            </div >
        </>
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