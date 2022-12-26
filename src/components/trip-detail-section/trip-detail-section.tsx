import type { LegacyRef} from "react";
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
    trip: Trip
    stationId: string
}

export function TripDetailSection(props: Props): React.ReactElement {

    const { trip, stationId } = props;

    const [expanded, setExpanded] = useState(false)
    const [parent] = useAutoAnimate({ duration: 400 })

    if(!trip.stopovers) {
        return <></>;
    }

    const selectedStation = trip.stopovers.find(s => s.id === stationId)

    if(!selectedStation) {
        return <></>;
    }

    let content: React.ReactNode = <SingleStationDetail selectedStation={selectedStation} />

    if(expanded) {
        // todo find better way to calculate current station
        content = trip.stopovers.map(s => <div key={s.id}><SimpleStopOverview stop={s} stopState={calcualteStopState(s)} /></div>)
    }

    return (
        <DetailCard>
            <div ref={parent as LegacyRef<HTMLDivElement>} className="w-full h-full">
                <h2 className="text-2xl font-medium pb-2">Fahrt</h2>
                {content}
                <div className="w-full flex flex-row justify-center pt-4" onClick={() => setExpanded(!expanded)}>
                    <ExpandIcon isExpanded={expanded} />
                </div>
            </div>
        </DetailCard>
    );
}

function calcualteStopState(stop: Stopover): StopState {

    const arrivalInPast = isArrivalInPast(stop);

    if(arrivalInPast) return StopState.Past;
    if((arrivalInPast && !isDepartureInPast(stop)) || isArrivalNow(stop)) return StopState.Current;
    
    return StopState.Future;

}

function isDepartureInPast(stop: Stopover): boolean {
    // check if this is a useful default
    if(!stop.departure) return false;
    
    const now = nowWithoutSeconds().getTime(); 
    return (stop.departure?.getTime() - now) < 0;
}

function isArrivalNow(stop: Stopover): boolean {
    // check if this is a useful default
    if(!stop.arrival) return false;

    const now = nowWithoutSeconds().getTime(); 
    return (stop.arrival?.getTime() - now) === 0;
}

function isArrivalInPast(stop: Stopover): boolean {
    // check if this is a useful default
    if(!stop.arrival) return false;

    const now = nowWithoutSeconds().getTime(); 
    return (stop.arrival?.getTime() - now) < 0;
}