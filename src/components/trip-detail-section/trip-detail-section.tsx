import type { LegacyRef } from "react";
import React, { useState } from "react";
import type { Stopover, Trip } from "@server/trpc/models/trip";
import { DetailCard } from "@components/detail-card";
import { SingleStationDetail } from "./single-station-detail";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SimpleStopOverview } from "@components/stop-overview";
import { StopState } from "@components/stop-overview/stop-state";
import { ExpandIcon } from "@components/expand-icon";
import { nowWithoutSeconds } from "@utils/now-without-seconds";

interface Props {
  trip: Trip;
  stationId: string;
}

export function TripDetailSection(props: Props): React.ReactElement {
  const { trip, stationId } = props;

  const [expanded, setExpanded] = useState(false);
  const [parent] = useAutoAnimate({ duration: 400 });

  if (!trip.stopovers) {
    return <></>;
  }

  const selectedStation = trip.stopovers.find((s) => s.id === stationId);

  if (!selectedStation) {
    return <></>;
  }

  const bgColor = `bg-${trip.lineName.toLowerCase()}`;

  let content: React.ReactNode = (
    <SingleStationDetail selectedStation={selectedStation} />
  );

  if (expanded) {
    // todo think about using a combination of time and location based approaches here
    let currentStopIndex = trip.stopovers.findIndex((stop) => {
      return isArrivalNow(stop);
    });

    if (currentStopIndex < 0) {
      currentStopIndex = trip.stopovers.findIndex((stop) => {
        return isArrivalInPast(stop) && !isDepartureInPast(stop);
      });
    }

    if (currentStopIndex < 0) {
      // if no station index could be found until now,
      // the station has to be the one before the first one that hasn't been reacht yet
      currentStopIndex = trip.stopovers.findIndex((stop) => {
        return stop.arrival && !isArrivalInPast(stop);
      });
      currentStopIndex -= 1;
    }

    content = trip.stopovers.map((s, idx) => {
      let stopState: StopState = StopState.Future;
      if (idx < currentStopIndex) stopState = StopState.Past;
      else if (idx === currentStopIndex) stopState = StopState.Current;

      return (
        <div key={s.id}>
          <SimpleStopOverview
            bgColor={bgColor}
            stop={s}
            stopState={stopState}
            isSelectedStation={s.id === stationId}
          />
        </div>
      );
    });
  }

  return (
    <DetailCard>
      <div ref={parent as LegacyRef<HTMLDivElement>} className="h-full w-full">
        <h2 className="pb-2 text-2xl font-medium">Fahrt</h2>
        {content}
        <div
          className="flex w-full flex-row justify-center pt-4"
          onClick={() => setExpanded(!expanded)}
        >
          <ExpandIcon isExpanded={expanded} />
        </div>
      </div>
    </DetailCard>
  );
}

function isDepartureInPast(stop: Stopover): boolean {
  // check if this is a useful default
  if (!stop.departure) return false;

  const now = nowWithoutSeconds().getTime();
  return stop.departure?.getTime() - now < 0;
}

function isArrivalNow(stop: Stopover): boolean {
  // check if this is a useful default
  if (!stop.arrival) return false;

  const now = nowWithoutSeconds().getTime();
  return stop.arrival?.getTime() - now === 0;
}

function isArrivalInPast(stop: Stopover): boolean {
  // check if this is a useful default
  if (!stop.arrival) return false;

  const now = nowWithoutSeconds().getTime();
  return stop.arrival?.getTime() - now < 0;
}
