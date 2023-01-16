import { favoriteStationAtom } from "@atoms/favorite-station-atom";
import { useAtom } from "jotai";
import React from "react";
import { FavoriteStationCard } from "./favorite-station-card";

export function FavoriteStations(): React.ReactElement {

    const [favoriteStations] = useAtom(favoriteStationAtom);

    const stationCards = favoriteStations.map(fs => <FavoriteStationCard key={fs.id} station={fs} />);
    return (
        <div className="flex flex-col gap-4 lg:w-1/3 w-full p-6">
           {stationCards}
        </div>
    );
}