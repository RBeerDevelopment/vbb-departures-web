import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { NavBar } from "../../components/nav-bar";

import { trpc } from "../../utils/trpc";

const Departures: NextPage = () => {

    const router = useRouter()
    const { stationId } = router.query

    const { data: departures, isFetching } = trpc.departure.byStationId.useQuery({ stationId: String(stationId) }, { enabled: Boolean(stationId) })

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

1 | 3101 | 8 | 86 | 13112022