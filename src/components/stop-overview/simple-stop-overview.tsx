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
                <div>
                    {stopState === StopState.Current ? 
                        <div className={`w-3 h-3 ${bgColor} rounded-full z-10`} />
                    : <></>}
                    {isSelectedStation ? 
                        <div className="w-4 h-4 bg-blue-600 rounded-full flex justify-center items-center z-10" >
                            <div className="w-2 h-2 bg-white rounded-full relative z-20" />
                        </div>
                    : <></>}
                </div>
                {stopState === StopState.Past ? 
                    <div className={`w-1 h-1/2 ${bgColor}`} />
                : <></>}
            </div>
            <p className="text-left w-1/2">{stop.stopName}</p>
            <div className="flex flex-col w-1/3">
                <TimeWithDelay time={stop.arrival} delay={stop.arrivalDelay} />
                <TimeWithDelay time={stop.departure} delay={stop.departureDelay} />
            </div>
        </div>
    );
}