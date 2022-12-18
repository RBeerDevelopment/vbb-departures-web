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
import { findIndexOfClosestPoint } from "../../utils/coordinates";

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

    const region = calculateVisibleRegionFromPolyline(polylinePoints);

    const currentLocationPolylinePoint = [currentLocation?.latitude || polylinePoints[0][0], currentLocation?.longitude || polylinePoints[0][1]];

    const indexOfClosestPointOnLine = findIndexOfClosestPoint(currentLocationPolylinePoint, polylinePoints);

    // also include current position as nearest point on line may be substantially behind train
    // TODO: this does not account for a situation where the next point on the line is further than the train location
    // this should be addressed in the future
    const completedPolylinePoints = [...polylinePoints.slice(0, indexOfClosestPointOnLine), currentLocationPolylinePoint]

    return (
        <div className="h-96 w-11/12 lg:w-1/2 rounded-lg">
            <MapkitProvider tokenOrCallback={env.NEXT_PUBLIC_MAPKIT_TOKEN}>
                <Map region={region} padding={12} showsUserLocation={true} isRotationEnabled={false} >
                    {/* full line */}
                    <MapPolyline polylinePoints={polylinePoints} style={{ lineWidth: 3, strokeColor: lineColorCode }} />
                    {/* section of the line that has been completed */}
                    <MapPolyline polylinePoints={completedPolylinePoints} style={{ lineWidth: 8, strokeColor: lineColorCode }} />
                    {/* <Marker latitude={currentLocationPolylinePoint[0]} longitude={currentLocationPolylinePoint[1]} title="Train Location" /> */}
                </Map>
            </MapkitProvider>
        </div >
    );
}

function calculateVisibleRegionFromPolyline(polylinePoints: PolylinePoints) {
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