import React from "react";
import type { Departure } from "../server/trpc/models/departure";
import { formatTime } from "../utils/format-time";

interface Props {
    departure: Departure
}

export function DepartureCard(props: Props): React.ReactElement {

    const { departure } = props;

    let lineNameTextColor = "text-white";

    console.log({ lineNumber: departure.lineName, isNaN: isNaN(+departure.lineName), isLarger89: Number(departure.lineName) > 89 })
    if (!isNaN(+departure.lineName) && Number(departure.lineName) > 89) {
        console.log("entered if")
        lineNameTextColor = "text-black"
    }

    return (
        <div className="bg-white rounded-md w-11/12 md:w-1/2 py-3 px-2 my-2 flex flex-row gap-2">
            <span className={`px-2 py-2 h-12 w-12 ${lineNameTextColor} text-center text-xl rounded-lg bg-${departure.lineName.toLowerCase()}`}>{departure.lineName}</span>
            <div className="flex flex-col overflow-hidden">
                <p className="font-thin text-lg overflow-hidden whitespace-nowrap text-ellipsis">{departure.direction}</p>
                <p className="font-bold text-md">{formatTime(departure.when)}</p>

            </div>
        </ div>
    );
}
