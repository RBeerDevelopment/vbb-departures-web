import { useIsFetching } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import React from "react";
import { currentRefetchAtom } from "@atoms/index";
import { NavbarLoadingIndicator } from "@components/loading-indicators";

export function RefreshButton(): React.ReactElement {

    const currentRefetchFns = useAtomValue(currentRefetchAtom);

    const isFetching = useIsFetching();

    function refetch() {
        if (isFetching) return;

        currentRefetchFns.forEach(fn => fn());
    }

    if (isFetching) {
        return <NavbarLoadingIndicator />;
    }

    return (
        <svg onClick={refetch} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
    );
}