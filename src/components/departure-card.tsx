import Link from "next/link";
import React from "react";
import type { Departure } from "@server/trpc/models/departure";
import { DelayText } from "./delay-text";
import { formatMinDiffToNow } from "@utils/format-min-diff-to-now";

interface Props {
  departure: Departure;
  stationId: string;
}

export function DepartureCard(props: Props): React.ReactElement {
  const { departure, stationId } = props;

  let lineNameTextColor = "text-white";

  if (!isNaN(+departure.lineName) && Number(departure.lineName) > 89) {
    lineNameTextColor =
      "text-black border border-black dark:text-white dark:border-gray-200";
  }

  return (
    <Link
      className="my-2 flex w-11/12 flex-row items-center gap-2 rounded-md bg-white py-3 px-2 dark:bg-gray-900 dark:text-white md:w-1/2"
      href={`/trip/${stationId}/${departure.id}/${departure.lineName}`}
    >
      <span
        className={`h-12 w-12 px-2 py-2 ${lineNameTextColor} inline-flex items-center justify-center rounded-lg text-xl bg-${departure.lineName.toLowerCase()}`}
      >
        {departure.lineName}
      </span>
      <div className="flex flex-col overflow-hidden">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-thin">
          {departure.direction}
        </p>
        <div className="flex flex-row gap-3">
          <p className="text-md font-bold">
            {formatMinDiffToNow(departure.when)}
          </p>
          <DelayText delay={departure.delay} />
        </div>
      </div>
    </Link>
  );
}
