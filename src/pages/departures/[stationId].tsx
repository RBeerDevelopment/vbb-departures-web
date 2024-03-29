import { type NextPage } from "next";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useEffect } from "react";
import React, { useState } from "react";
import { DepartureCard } from "@components/departure-card";
import { LoadingIndicator } from "@components/loading-indicators/loading-indicator";
import { NavBar } from "@components/nav-bar";
import { useCurrentRefetchFns } from "@components/refresh-button";
import { trpc } from "@utils/trpc";
import { favoriteStationAtom } from "@atoms/favorite-station-atom";
import { useAtom } from "jotai";
import type { LineTypeWithAll } from "@components/filters";
import { LineTypeFilter } from "@components/filters";
import { LineFilter } from "@components/filters";
import type { Departure } from "@server/trpc/models";
import type { LineType } from "@server/trpc/models/utils";

const Departures: NextPage = () => {
  const [lineFilter, setLineFilter] = useState<string>("All");
  const [lineTypeFilter, setLineTypeFilter] = useState<LineTypeWithAll>("All");

  useEffect(() => {
    setLineFilter("All");
  }, [lineTypeFilter]);

  const router = useRouter();
  const stationId = String(router.query.stationId);

  const [favoriteStations, setFavoriteStations] = useAtom(favoriteStationAtom);

  const isFavoriteStation = favoriteStations
    .map((s) => s.id)
    .includes(stationId);

  const {
    data: departures,
    isLoading,
    refetch,
  } = trpc.departure.byStationId.useQuery(
    { stationId: String(stationId) },
    { enabled: Boolean(stationId), staleTime: 1000 * 10 }
  );

  const { data: stationDetails } = trpc.location.byStationId.useQuery({
    stationId: String(stationId),
  });

  useCurrentRefetchFns([refetch]);

  const lines = [
    ...new Set(
      departures
        ?.filter((d) => filterByLineType(d, lineTypeFilter))
        .map((d) => d.lineName)
    ),
  ];
  const lineTypes: LineType[] = [
    ...new Set(departures?.map((d) => d.lineType)),
  ];

  let content: ReactNode = (
    <p className="italic">No departures found within the next 30 minutes.</p>
  );

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (departures && departures.length > 0) {
    const filteredDepartures = departures
      .filter((d) => filterByLineType(d, lineTypeFilter))
      .filter((d) => filterDeparturesByLine(d, lineFilter));

    content = filteredDepartures.map((d) => (
      <DepartureCard key={d.id} departure={d} stationId={String(stationId)} />
    ));
  }

  function toggleFavoriteStation() {
    if (isFavoriteStation) {
      setFavoriteStations((prev) => {
        return prev.filter((s) => s.id !== stationId);
      });
      return;
    }

    if (!stationDetails) return;

    setFavoriteStations((prev) => {
      return [...prev, stationDetails];
    });
  }

  const hasMultipleLinesOrLineTypes =
    (lineTypes && lineTypes.length > 1) || (lines && lines.length > 1);

  return (
    <main className="mx-auto flex h-screen w-full flex-col bg-slate-300 dark:bg-black">
      <NavBar
        favoriteFn={toggleFavoriteStation}
        isFavorite={isFavoriteStation}
      />
      <div className="w-full overflow-y-scroll pt-16 pb-4">
        {hasMultipleLinesOrLineTypes && (
          <div className="flex flex-row gap-4 py-2 pl-3">
            <LineTypeFilter
              lineTypes={lineTypes}
              setSelectedLineType={setLineTypeFilter}
            />
            <LineFilter lines={lines} setSelectedLine={setLineFilter} />
          </div>
        )}
        <div className="mx-auto flex flex-col items-center">{content}</div>
      </div>
    </main>
  );
};

function filterDeparturesByLine(
  departure: Departure,
  lineName: string
): boolean {
  if (lineName === "All") return true;
  return departure.lineName.toLowerCase() === lineName.toLowerCase();
}

function filterByLineType(
  departure: Departure,
  lineType: LineTypeWithAll
): boolean {
  if (lineType === "All") return true;
  return departure.lineType === lineType;
}

export default Departures;
