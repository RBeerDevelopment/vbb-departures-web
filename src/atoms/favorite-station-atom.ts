import type { Stop } from "@server/trpc/models/stop";
import { atomWithStorage } from "jotai/utils";


export const favoriteStationAtom = atomWithStorage<Stop[]>(
  "favoriteStations",
  []
);
