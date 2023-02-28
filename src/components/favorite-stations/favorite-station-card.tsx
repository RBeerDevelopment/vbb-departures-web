import type { FavoriteStation } from "@atoms/favorite-station-atom";
import Link from "next/link";
import React from "react";

interface Props {
  station: FavoriteStation;
}

export function FavoriteStationCard(props: Props): React.ReactElement {
  const { station } = props;

  return (
    <Link href={`/departures/${station.id}`}>
      <div className="w-full cursor-pointer rounded-lg bg-white p-4 py-3 text-lg text-black shadow-lg">
        {station.name}
      </div>
    </Link>
  );
}
