import { atom } from "jotai";

// reason for using number here: we want to trigger an update any time a change happens
// boolean would suggest a more binary (on/off) logic

type RefetchFns = (() => void)[]

export const currentRefetchAtom = atom<RefetchFns>([])