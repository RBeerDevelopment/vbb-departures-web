import Link from "next/link";
import React from "react";
import type { Departure } from "@server/trpc/models/departure";
import { formatTimeHHMM } from "@utils/format-time";
import { DelayText } from "./delay-text";
import { formatMinDiffToNow } from "@utils/format-min-diff-to-now";

interface Props {
    departure: Departure
    stationId: string
}

export function DepartureCard(props: Props): React.ReactElement {

    const { departure, stationId } = props;

    let lineNameTextColor = "text-white";

    if (!isNaN(+departure.lineName) && Number(departure.lineName) > 89) {
        lineNameTextColor = "text-black border border-black";
    }

    return (
        <Link className="bg-white rounded-md w-11/12 md:w-1/2 py-3 px-2 my-2 flex flex-row gap-2" href={`/trip/${stationId}/${departure.id}/${departure.lineName}`}>
            <span className={`px-2 py-2 h-12 w-12 ${lineNameTextColor} text-center text-xl rounded-lg bg-${departure.lineName.toLowerCase()}`}>{departure.lineName}</span>
            <div className="flex flex-col overflow-hidden">
                <p className="font-thin text-lg overflow-hidden whitespace-nowrap text-ellipsis">{departure.direction}</p>
                <div className="flex flex-row gap-3">
                    <p className="font-bold text-md">{formatMinDiffToNow(departure.when)}</p>
                    <DelayText delay={departure.delay} />
                </div>
            </div>
        </Link>
    );
}
