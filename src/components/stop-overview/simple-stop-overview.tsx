import { TimeWithDelay } from "@components/time-with-delay";
import type { Stopover } from "@server/trpc/models/trip";
import React from "react";
import { StopState } from "./stop-state";

interface Props {
    stop: Stopover,
    stopState: StopState
}

export function SimpleStopOverview(props: Props): React.ReactElement {

    const { stop, stopState } = props;

    console.log({ name: stop.stopName, stopState })

    return (
        <div className="flex flex-row gap-4 pl-4 h-16 items-center justify-between">
            <div className="w-3 h-full self-start items-center flex flex-col">
                <div className="w-1 h-1/2 bg-red-700"/>
                {stopState === StopState.Current ? 
                    <div className="w-3 h-3 bg-red-700 rounded-full" />
                : <></>}
                {stopState === StopState.Past ? 
                    <div className="w-1 h-1/2 bg-red-700" />
                : <></>}
            </div>
            <p>{stop.stopName}</p>
            <div className="flex flex-col">
                <TimeWithDelay time={stop.arrival} delay={stop.arrivalDelay} />
                <TimeWithDelay time={stop.departure} delay={stop.departureDelay} />
            </div>
        </div>
    );
}