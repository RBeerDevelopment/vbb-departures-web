import { type NextPage } from "next";
import { useRouter } from "next/router";
import type { ReactNode} from "react";
import React, { useState } from "react";
import { DepartureCard } from "@components/departure-card";
import { LoadingIndicator } from "@components/loading-indicators/loading-indicator";
import { NavBar } from "@components/nav-bar";
import { useCurrentRefetchFns } from "@components/refresh-button";
import { trpc } from "@utils/trpc";
import { favoriteStationAtom } from "@atoms/favorite-station-atom";
import { useAtom } from "jotai";
import { LineFilter } from "@components/filters";
import type { Departure } from "@server/trpc/models/departure";

const Departures: NextPage = () => {

    const [lineFilter, setLineFilter] = useState<string>("All");

    const router = useRouter();
    const stationId = String(router.query.stationId);

    const [favoriteStations, setFavoriteStations] = useAtom(favoriteStationAtom);

    const isFavoriteStation = favoriteStations.map(s => s.id).includes(stationId);

    const { data: departures, isLoading, refetch } = trpc.departure.byStationId.useQuery({ stationId: String(stationId) }, { enabled: Boolean(stationId) });
    useCurrentRefetchFns([refetch]);

    const lines = [...new Set(departures?.map(d => d.lineName))];

    React.useEffect(() => console.log({lineFilter}), [lineFilter]);

    let content: ReactNode = <p className="italic">No departures found within the next 30 minutes.</p>;

    if (isLoading) {
        content = <LoadingIndicator />;
    }

    if (departures && departures.length > 0) {
        content = departures.filter(d => filterDeparturesByLine(d, lineFilter)).map(d => (
            <DepartureCard key={d.id} departure={d} stationId={String(stationId)} />
        ));
    }

    function toggleFavoriteStation() {
        if(isFavoriteStation) {
            setFavoriteStations((prev) => {
                return prev.filter(s => s.id !== stationId);
            });
            return;
        }

        const stationName = departures ? departures[0]?.stopName || "" : "";

        setFavoriteStations((prev) => {
            return [...prev, { id: stationId, name: stationName }];
        });
    }

    return (
        <main className="w-full mx-auto flex h-screen flex-col bg-slate-300">
            <NavBar favoriteFn={toggleFavoriteStation} isFavorite={isFavoriteStation}/>
            <div className="pt-16 pb-4 w-full overflow-y-scroll ">
                {lines && lines.length > 1 && <div className="py-2 pl-3"><LineFilter lines={lines} setSelectedLine={setLineFilter} /></div>}
                <div className="flex mx-auto flex-col items-center">
                    {content}
                </div>
            </div>
        </main>
    );
};

function filterDeparturesByLine(departure: Departure, lineName: string): boolean {
    if(lineName === "All") return true;
    return departure.lineName.toLowerCase() === lineName.toLowerCase();
}

export default Departures;