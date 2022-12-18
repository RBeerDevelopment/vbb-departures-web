import { useAutoAnimate } from "@formkit/auto-animate/react";
import { type NextPage } from "next";
import type { LegacyRef } from "react";
import React, { useState } from "react";
import { DebouncedInput } from "../components/debounced-input";
import { LoadingIndicator } from "../components/loading-indicators/loading-indicator";
import { NavBar } from "../components/nav-bar";
import { NearbyInput } from "../components/nearby-input";
import { useCurrentRefetchFns } from "../components/refresh-button";
import { SearchResultItem } from "../components/search-result-item";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [userCoords, setUserCoords] = useState<GeolocationCoordinates>();

  const { data: stations, isFetching, refetch } = trpc.location.byFuzzyName.useQuery({ query: searchQuery },
    { enabled: searchQuery.length > 0, staleTime: Infinity }
  );

  useCurrentRefetchFns([refetch]);

  const { data: nearbyStatios, isFetching: isFetchingNearby } = trpc.location.byLocation.useQuery(
    { lat: userCoords?.latitude || 0, long: userCoords?.longitude || 0 },
    { enabled: Boolean(userCoords), staleTime: Infinity }
  );

  const [isLoadingLocation, setIsLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string>();


  const [parent] = useAutoAnimate({ duration: 400 })

  function queryNearby() {
    setIsLocationLoading(true);
    if (!navigator.geolocation) {
      return;
    }
    setSearchQuery("")
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserCoords(pos.coords);
      setIsLocationLoading(false);
    }, (error) => {
      setIsLocationLoading(false);
      setLocationError(error.message)
    })

  }

  return (
    <main className="w-full mx-auto flex min-h-screen flex-col items-center justify-center bg-slate-300">
      <NavBar isMain={true} />
      <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
        <span className="text-red-600">VBB</span> Departures
      </h1>
      <DebouncedInput value={searchQuery} onChange={setSearchQuery} placeholder="Station Name" />
      <div ref={parent as LegacyRef<HTMLDivElement>} className="bg-white flex flex-col max-h-96 overflow-y-scroll gap-1 mt-4 shadow-lg rounded-lg lg:w-1/3 w-3/4 divide-y divide-dashed">
        {isFetching || isFetchingNearby ? <LoadingIndicator /> :
          (stations?.length || 0) > 0 ? stations?.map(s => <SearchResultItem key={s.id} location={s} />) :
            (nearbyStatios?.length || 0) > 0 ? nearbyStatios?.map(s => <SearchResultItem key={s.id} location={s} />) : null
        }
      </div>
      <NearbyInput onClick={queryNearby} isLoading={isLoadingLocation} />
      <div>{locationError}</div>
    </main>
  );
};

export default Home;