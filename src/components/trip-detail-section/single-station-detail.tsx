import { TimeWithDelay } from "@components/time-with-delay";
import type { Stopover } from "@server/trpc/models/trip";
import React from "react";

interface Props {
  selectedStation: Stopover;
}

export function SingleStationDetail(props: Props): React.ReactElement {
  const { selectedStation } = props;
  return (
    <table className="border-separate border-spacing-x-2">
      <tbody>
        {selectedStation.arrival && (
          <tr>
            <td className="text-md font-bold">Ankunft:</td>
            <TimeWithDelay
              time={selectedStation.arrival}
              delay={selectedStation.arrivalDelay}
            />
          </tr>
        )}
        {selectedStation.departure && (
          <tr>
            <td className="text-md font-bold">Abfahrt:</td>
            <TimeWithDelay
              time={selectedStation.departure}
              delay={selectedStation.departureDelay}
            />
          </tr>
        )}
        <tr>
          <td className="text-md font-bold">Plattform: </td>
          <td className="text-md">
            {selectedStation.platform ? selectedStation.plannedPlatform : "-"}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
