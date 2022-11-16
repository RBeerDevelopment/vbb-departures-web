import { useAutoAnimate } from "@formkit/auto-animate/react";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import React, { ReactElement } from "react";
import { DepartureCard } from "../../components/departure-card";
import { LoadingIndicator } from "../../components/loading-indicator";
import { NavBar } from "../../components/nav-bar";

import { trpc } from "../../utils/trpc";

const Departures: NextPage = () => {

    const router = useRouter()
    const { stationId } = router.query


    const { data: departures, isFetching } = trpc.departure.byStationId.useQuery({ stationId: String(stationId) }, { enabled: Boolean(stationId) })

    let content: ReactNode = <p className="italic ">No departures found within the next 30 minutes.</p>;

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