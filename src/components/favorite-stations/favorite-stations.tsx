import React from "react";
import { favoriteStationAtom } from "@atoms/favorite-station-atom";
import { SearchResultItem } from "@components/search-result-item";
import { usePrefetchFavoriteStations } from "@utils/prefetch-favorite-stations";
import { useAtom } from "jotai";
import type { LocationModel } from "@server/trpc/models/location";

export function FavoriteStations(): React.ReactElement {
  const [favoriteStations] = useAtom(favoriteStationAtom);

  usePrefetchFavoriteStations();

  const stationCards = favoriteStations.map((fs) => (
    <SearchResultItem
      key={fs.id}
      location={fs as LocationModel}
      rounded={true}
    />
  ));
  return (
    <div className="flex w-full flex-col gap-4 p-6 lg:w-1/3">
      {stationCards}
    </div>
  );
}
