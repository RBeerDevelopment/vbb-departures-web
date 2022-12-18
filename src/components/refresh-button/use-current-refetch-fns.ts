import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { currentRefetchAtom } from "../../atoms";

export function useCurrentRefetchFns(currentRefetchFns: (() => void)[]) {
    const setRefetchFns = useSetAtom(currentRefetchAtom)

    useEffect(() => {
        setRefetchFns(currentRefetchFns)
    }, [currentRefetchFns, setRefetchFns])
}