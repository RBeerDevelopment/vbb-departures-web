import { useAutoAnimate } from "@formkit/auto-animate/react";
import { type NextPage } from "next";
import type { LegacyRef } from "react";
import { useRef } from "react";
import React, { useState } from "react";
import { DebouncedInput } from "@components/debounced-input";
import { LoadingIndicator } from "@components/loading-indicators/loading-indicator";
import { NavBar } from "@components/nav-bar";
import { NearbyInput } from "@components/nearby-input";
import { useCurrentRefetchFns } from "@components/refresh-button";
import { SearchResultItem } from "@components/search-result-item";

import { trpc } from "@utils/trpc";
import { FavoriteStations } from "@components/favorite-stations/favorite-stations";
import NonSsrWrapper from "@components/non-ssr-wrapper";
import { useFocusOnTyping } from "@utils/hooks";

const Home: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userCoords, setUserCoords] = useState<GeolocationCoordinates>();

  const {
    data: stations,
    isFetching,
    refetch,
  } = trpc.location.byFuzzyName.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.length > 2, staleTime: Infinity }
  );

  const inputRef = useRef(null);
  useFocusOnTyping(inputRef);

  useCurrentRefetchFns([refetch]);

  const { data: nearbyStatios, isFetching: isFetchingNearby } =
    trpc.location.byLocation.useQuery(
      { lat: userCoords?.latitude || 0, long: userCoords?.longitude || 0 },
      { enabled: Boolean(userCoords), staleTime: Infinity }
    );

  const [isLoadingLocation, setIsLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string>();

  const [parent] = useAutoAnimate({ duration: 400 });

  function queryNearby() {
    setIsLocationLoading(true);
    if (!navigator.geolocation) {
      return;
    }
    setSearchQuery("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords(pos.coords);
        setIsLocationLoading(false);
      },
      (error) => {
        setIsLocationLoading(false);
        setLocationError(error.message);
      }
    );
  }

  return (
    <NonSsrWrapper>
      <main className="mx-auto flex min-h-screen w-full flex-col items-center justify-center bg-slate-300 dark:bg-black">
        <NavBar isMain={true} />
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          <span className="text-red-600 dark:text-red-600">Travel</span>{" "}
          <span className="text-black dark:text-gray-200">12</span>
        </h1>
        <DebouncedInput
          ref={inputRef}
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Station Name"
        />
        <div
          ref={parent as LegacyRef<HTMLDivElement>}
          className="mt-4 flex max-h-96 w-3/4 flex-col divide-y divide-gray-700 overflow-y-scroll rounded-lg bg-white shadow-lg dark:bg-gray-800 lg:w-1/4"
        >
          {isFetching || isFetchingNearby ? (
            <LoadingIndicator />
          ) : (stations?.length || 0) > 0 ? (
            stations?.map((s) => <SearchResultItem key={s.id} location={s} />)
          ) : (nearbyStatios?.length || 0) > 0 ? (
            nearbyStatios?.map((s) => (
              <SearchResultItem key={s.id} location={s} />
            ))
          ) : null}
        </div>
        <NearbyInput onClick={queryNearby} isLoading={isLoadingLocation} />
        <div>{locationError}</div>
        <FavoriteStations />
      </main>
    </NonSsrWrapper>
  );
};

export default Home;
