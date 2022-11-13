import { useAutoAnimate } from "@formkit/auto-animate/react";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { DepartureCard } from "../../components/departure-card";
import { LoadingIndicator } from "../../components/loading-indicator";
import { NavBar } from "../../components/nav-bar";

import { trpc } from "../../utils/trpc";

const Departures: NextPage = () => {

    const router = useRouter()
    const { stationId } = router.query


    const { data: departures, isFetching } = trpc.departure.byStationId.useQuery({ stationId: String(stationId) }, { enabled: Boolean(stationId) })

    let content = null;

    if (isFetching) {
        content = <LoadingIndicator />
    }

    if (departures && departures.length > 0) {
        content = departures.map(d => (
            <DepartureCard key={d.id} departure={d} />
        ))
    }

    return (
        <>
            <Head>
                <title>VBB Departures</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-full mx-auto flex h-screen flex-col items-center justify-center bg-slate-300 overflow-y-hidden">
                <NavBar />
                {content}
            </main>
        </>
    );
};

export default Departures;