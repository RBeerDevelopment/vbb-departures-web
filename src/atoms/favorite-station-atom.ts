import { atomWithStorage } from "jotai/utils";

export const favoriteStationAtom = atomWithStorage<string[]>("favoriteStations", []);

