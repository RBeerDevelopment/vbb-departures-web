import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { currentRefetchAtom } from "@atoms/index";

export function useCurrentRefetchFns(currentRefetchFns: (() => void)[]) {
    const setRefetchFns = useSetAtom(currentRefetchAtom);

    useEffect(() => {
        setRefetchFns(currentRefetchFns);
    }, [currentRefetchFns, setRefetchFns]);
}