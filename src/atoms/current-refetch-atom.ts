import { atom } from "jotai";

type RefetchFns = (() => void)[];

export const currentRefetchAtom = atom<RefetchFns>([]);
