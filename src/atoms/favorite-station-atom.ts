import { atomWithStorage } from "jotai/utils";

export interface FavoriteStation {
  id: string;
  name: string;
}

export const favoriteStationAtom = atomWithStorage<FavoriteStation[]>(
  "favoriteStations",
  []
);
