import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import React from "react";
import { LoadingIndicator } from "../../../components/loading-indicator";
import { NavBar } from "../../../components/nav-bar";
import type { PolylinePoints } from "../../../components/trip-sections/map-polyline";
import { MapSection } from "../../../components/trip-sections/map-section";
import { TripSection } from "../../../components/trip-sections/trip-section";

import { trpc } from "../../../utils/trpc";

const refetchInterval = 15 * 1000 // 15 sec
const Departures: NextPage = () => {

    const router = useRouter()
    const { tripId, lineName } = router.query


    const { data: trip, isFetching } = trpc.trip.byTripId.useQuery(
        {
            tripId: tripId as string || "",
            lineName: lineName as string || ""
        },
        {
            refetchInterval: refetchInterval,
            enabled: Boolean(tripId) && Boolean(lineName)
        }
    );

    let linePolyline: PolylinePoints | undefined = trip?.polyline?.features?.map(f => {
        if (!f.geometry.coordinates) return [NaN, NaN];
        return [f.geometry.coordinates[1] as number, f.geometry.coordinates[0] as number]
    });

    linePolyline = linePolyline?.filter(p => !(isNaN(p[0]) || isNaN(p[1])))
    let content: ReactNode = <p className="italic ">No data found for line {lineName}.</p>;

    if (isFetching) {
        content = <LoadingIndicator />
    }


    if (trip) {
        content = (
            <div className="flex flex-col gap-8">
                <TripSection trip={trip} />
                <MapSection
                    lineName={trip.lineName}
                    polylinePoints={linePolyline}
                    currentLocation={trip.currentLocation}
                />
            </div>);
    }

    return (
        <>
            <Head>
                <title>VBB Departures</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-full mx-auto flex h-screen flex-col justify-center bg-slate-300">
                <NavBar />
                <div className="overflow-y-scroll w-full flex flex-col mx-auto items-center pb-16">
                    {content}
                </div>
            </main>
        </>
    );
};

export default Departures;