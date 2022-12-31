import { TimeWithDelay } from "@components/time-with-delay";
import type { Stopover } from "@server/trpc/models/trip";
import React from "react";

interface Props {
    selectedStation: Stopover
}

export function SingleStationDetail(props: Props): React.ReactElement {

    const { selectedStation } = props;
    return (
        <table className="border-spacing-x-2 border-separate">
            <tbody>
                {selectedStation.arrival && 
                    
                    <tr>
                        <td className="font-bold text-md">Ankunft:</td>
                        <TimeWithDelay time={selectedStation.arrival} delay={selectedStation.arrivalDelay} />
                    </tr>
                }
                {selectedStation.departure && 
                    <tr>
                        <td className="font-bold text-md">Abfahrt:</td>
                        <TimeWithDelay time={selectedStation.departure} delay={selectedStation.departureDelay} />
                    </tr>
                }
                <tr>
                    <td className="font-bold text-md">Plattform: </td>
                    <td className="text-md">{selectedStation.platform ? selectedStation.plannedPlatform : "-"}</td>
                </tr>
            </tbody>
        </table>
    );
}