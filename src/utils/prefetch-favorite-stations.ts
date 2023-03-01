import { favoriteStationAtom } from "@atoms/favorite-station-atom";
import { useAtom } from "jotai";
import { trpc } from "./trpc";

export function usePrefetchFavoriteStations() {
    const [favoriteStations] = useAtom(favoriteStationAtom);

    const utils = trpc.useContext();

    for (const [idx, station] of favoriteStations.entries()) {
        //only prefetch the first 3 stations to avoid too many requests
        if (idx >= 3) break;
        utils.departure.byStationId.prefetch({ stationId: station.id }, { staleTime: 1000 * 10 });
    }

}