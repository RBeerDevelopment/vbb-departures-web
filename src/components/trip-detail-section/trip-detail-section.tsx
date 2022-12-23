import type { LegacyRef} from "react";
import React, { useState } from "react";
import type { Trip } from "@server/trpc/models/trip";
import { DetailCard } from "@components/detail-card";
import { SingleStationDetail } from "./single-station-detail";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SimpleStopOverview } from "@components/stop-overview";
import { StopState } from "@components/stop-overview/stop-state";
import { ExpandIcon } from "@components/expand-icon";

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
        content = trip.stopovers.map(s => <div key={s.id} className="my-2"><SimpleStopOverview stop={s} stopState={StopState.Current} /></div>)
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