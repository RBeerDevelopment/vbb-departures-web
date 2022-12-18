import React from "react";
import type { Trip } from "../../server/trpc/models/trip";
import { formatTimeHHMM } from "../../utils/format-time";
import { DelayText } from "../delay-text";

interface Props {
    trip: Trip
}

export function TripSection(props: Props): React.ReactElement {

    const { trip } = props;

    return (
        <div className="flex flex-col items-start bg-white w-11/12 lg:w-1/2 min-h-min rounded-md my-4 p-4">
            <h2 className={`text-2xl font-medium text-${trip.lineName.toLowerCase()}`}>{trip.lineName} ({trip.direction})</h2>
            <div className="w-full flex flex-col items-center py-4">
                <div className="w-full flex justify-between items-center font-light text-sm px-2 py-2">
                    <p>{trip.originName}</p>
                    <p>{trip.destination}</p>
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="bg-red-700 h-2 w-2 rounded-full -mr-1 z-10"></div>
                    <div className="bg-gray-900 h-1 w-4/5 rounded-full"></div>
                    <div className="bg-red-700 h-2 w-2 rounded-full -ml-1 z-10"></div>
                </div>
                <div className="w-full flex justify-between items-center font-light text-sm px-5 py-2">
                    <p>{formatTimeHHMM(trip.departure)} {Boolean(trip.departureDelay) && <DelayText delay={trip.departureDelay} />}</p>
                    <p>{formatTimeHHMM(trip.arrival)} {Boolean(trip.arrivalDelay) && <DelayText delay={trip.arrivalDelay} />}</p>
                </div>
            </div>
        </div>
    );
}