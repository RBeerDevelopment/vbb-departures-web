import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import React from "react";
import { DepartureCard } from "@components/departure-card";
import { LoadingIndicator } from "@components/loading-indicators/loading-indicator";
import { NavBar } from "@components/nav-bar";
import { useCurrentRefetchFns } from "@components/refresh-button";

import { trpc } from "@utils/trpc";
import { favoriteStationAtom } from "@atoms/favorite-station-atom";
import { useAtom } from "jotai";

const Departures: NextPage = () => {

    const router = useRouter();
    const stationId = String(router.query.stationId);

    const [favoriteStations, setFavoriteStations] = useAtom(favoriteStationAtom);

    const isFavoriteStation = favoriteStations.includes(stationId);

    const { data: departures, isLoading, refetch } = trpc.departure.byStationId.useQuery({ stationId: String(stationId) }, { enabled: Boolean(stationId) });
    useCurrentRefetchFns([refetch]);

    let content: ReactNode = <p className="italic ">No departures found within the next 30 minutes.</p>;

    if (isLoading) {
        content = <LoadingIndicator />;
    }

    if (departures && departures.length > 0) {
        content = departures.map(d => (
            <DepartureCard key={d.id} departure={d} stationId={String(stationId)} />
        ));
    }

    function toggleFavoriteStation() {
        if(isFavoriteStation) {
            setFavoriteStations((prev) => {
                return prev.filter(s => s !== stationId);
            });
            return;
        }

        setFavoriteStations((prev) => {
            return [...prev, stationId];
        });
    }

    return (
        <>
            <Head>
                <title>VBB Departures</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-full mx-auto flex h-screen flex-col justify-center bg-slate-300">
                <NavBar favoriteFn={toggleFavoriteStation} isFavorite={isFavoriteStation}/>
                <div className="overflow-y-scroll w-full flex flex-col mx-auto items-center py-16">
                    {content}
                </div>
            </main>
        </>
    );
};

export default Departures;