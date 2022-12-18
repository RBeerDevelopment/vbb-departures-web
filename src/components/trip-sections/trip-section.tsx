import React from "react";
import type { Trip } from "../../server/trpc/models/trip";
import { findIndexOfClosestPoint } from "../../utils/coordinates";
import { formatTimeHHMM } from "../../utils/format-time";
import { DelayText } from "../delay-text";
import type { PolylinePoint, PolylinePoints } from "../map-section";

interface Props {
    trip: Trip,
    polylinePoints?: PolylinePoints
}

export function TripSection(props: Props): React.ReactElement {

    const { trip, polylinePoints } = props;
    const lineBgClass = `bg-${trip.lineName.toLowerCase()}`

    const currentLocationPolylinePoint: PolylinePoint = [trip.currentLocation?.latitude || 0, trip.currentLocation?.longitude || 0];
    const tripProgress = calculateTripProgress(polylinePoints || [], currentLocationPolylinePoint);

    return (
        <div className="flex flex-col items-start bg-white w-11/12 lg:w-1/2 min-h-min rounded-md my-4 p-4">
            <h2 className={`text-2xl font-medium text-${trip.lineName.toLowerCase()}`}>{trip.lineName} ({trip.direction})</h2>
            <div className="w-full flex flex-col items-center py-4">
                <div className="w-full flex justify-between items-center font-light text-sm px-2 py-2">
                    <p>{trip.originName}</p>
                    <p>{trip.destination}</p>
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="bg-gray-400 w-4/5 h-3 rounded-full relative z-0">
                        <div id="test" className={`${lineBgClass} h-3 rounded-full relative z-10`} style={{ width: `calc(${Math.floor(tripProgress * 100)}% - 4px)` }} />
                    </div>
                </div>
                <div className="w-full flex justify-between items-center font-light text-sm px-5 py-2">
                    <p>{formatTimeHHMM(trip.departure)} {Boolean(trip.departureDelay) && <DelayText delay={trip.departureDelay} />}</p>
                    <p>{formatTimeHHMM(trip.arrival)} {Boolean(trip.arrivalDelay) && <DelayText delay={trip.arrivalDelay} />}</p>
                </div>
            </div>
        </div>
    );
}

function calculateTripProgress(tripPolyline: PolylinePoints, currentLocation: PolylinePoint): number {
    const closestPointIndex = findIndexOfClosestPoint(currentLocation, tripPolyline);
    return closestPointIndex / tripPolyline.length;
}