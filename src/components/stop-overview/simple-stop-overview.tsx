import { TimeWithDelay } from "@components/time-with-delay";
import type { Stopover } from "@server/trpc/models/trip";
import React from "react";
import { StopState } from "./stop-state";

interface Props {
  stop: Stopover;
  stopState: StopState;
  bgColor: string;
  isSelectedStation: boolean;
}

export function SimpleStopOverview(props: Props): React.ReactElement {
  const { stop, stopState, bgColor, isSelectedStation } = props;

  return (
    <div className="flex h-16 flex-row items-center justify-between gap-4 pl-4">
      <div className="flex h-full w-3 flex-col items-center self-start">
        {(stopState === StopState.Past || stopState === StopState.Current) && (
          <div className={`h-1/2 w-1 ${bgColor}`} />
        )}
        {stopState === StopState.Current ? (
          <div className={`h-3 w-3 ${bgColor} z-10 rounded-full`} />
        ) : (
          <></>
        )}
        {stopState === StopState.Past ? (
          <div className={`h-1/2 w-1 ${bgColor}`} />
        ) : (
          <></>
        )}
      </div>
      <p
        className={`w-1/2 text-left ${isSelectedStation ? "text-red-600" : ""}`}
      >
        {stop.stopName}
      </p>
      <div className="flex w-1/3 flex-col">
        <TimeWithDelay time={stop.arrival} delay={stop.arrivalDelay} />
        <TimeWithDelay time={stop.departure} delay={stop.departureDelay} />
      </div>
    </div>
  );
}
