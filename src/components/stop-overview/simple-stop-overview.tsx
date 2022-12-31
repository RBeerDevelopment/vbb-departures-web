import { TimeWithDelay } from "@components/time-with-delay";
import type { Stopover } from "@server/trpc/models/trip";
import React from "react";
import { StopState } from "./stop-state";

interface Props {
    stop: Stopover,
    stopState: StopState
    bgColor: string
    isSelectedStation: boolean
}

export function SimpleStopOverview(props: Props): React.ReactElement {

    const { stop, stopState, bgColor, isSelectedStation } = props;

    return (
        <div className="flex flex-row gap-4 pl-4 h-16 items-center justify-between">
            <div className="w-3 h-full self-start items-center flex flex-col">
                {(stopState === StopState.Past || stopState === StopState.Current) && 
                    <div className={`w-1 h-1/2 ${bgColor}`}/>}
                {stopState === StopState.Current ? 
                    <div className={`w-3 h-3 ${bgColor} rounded-full z-10`} />
                : <></>}
                {stopState === StopState.Past ? 
                    <div className={`w-1 h-1/2 ${bgColor}`} />
                : <></>}
            </div>
            <p className={`text-left w-1/2 ${isSelectedStation ? "text-red-600" : ""}`}>{stop.stopName}</p>
            <div className="flex flex-col w-1/3">
                <TimeWithDelay time={stop.arrival} delay={stop.arrivalDelay} />
                <TimeWithDelay time={stop.departure} delay={stop.departureDelay} />
            </div>
        </div>
    );
}