import { TimeWithDelay } from "@components/time-with-delay";
import type { Stopover } from "@server/trpc/models/trip";
import React from "react";
import type { StopState } from "./stop-state";

interface Props {
    stop: Stopover,
    stopState: StopState
}

export function SimpleStopOverview(props: Props): React.ReactElement {

    const { stop } = props;

    return (
        <div className="flex flex-row gap-4 pl-4 items-center justify-between">
            {/* <di */}
            <div className="-my-8 h-12 w-1 bg-red-700"/>
            <p>{stop.stopName}</p>
            <div className="flex flex-col gap-1">
                <TimeWithDelay time={stop.arrival} delay={stop.arrivalDelay} />
                <TimeWithDelay time={stop.departure} delay={stop.departureDelay} />
            </div>
        </div>
    );
}