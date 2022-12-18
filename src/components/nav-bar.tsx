import { useRouter } from "next/router";
import React from "react";

interface Props {
    isMain?: boolean
}

export function NavBar(props: Props): React.ReactElement {

    const router = useRouter();
    const { isMain = false } = props;

    if (isMain) return <></>;

    return (
        <div className="w-screen h-16 bg-red-600 fixed top-0 flex flex-row items-center justify-center p-4 gap-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-6 text-white w-8 h-8" onClick={router.back}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <p className="font-light text-2xl text-white">VBB Departures</p>
        </ div>
    );
}