import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import React from "react";
import { LoadingIndicator } from "@components/loading-indicators/loading-indicator";
import { NavBar } from "@components/nav-bar";
import type { PolylinePoints } from "@components/map-section";
import { MapSection } from "@components/map-section";
import { TripSection } from "@components/trip-sections/trip-section";

import { trpc } from "@utils/trpc";
import { useCurrentRefetchFns } from "@components/refresh-button";
import { TripDetailSection } from "@components/trip-detail-section";

const refetchInterval = 15 * 1000; // 15 sec
const Departures: NextPage = () => {
  const router = useRouter();
  const { stationId, tripId, lineName } = router.query;

  const {
    data: trip,
    isLoading,
    refetch,
  } = trpc.trip.byTripId.useQuery(
    {
      tripId: (tripId as string) || "",
      stopovers: true,
      polyline: true,
    },
    {
      refetchInterval: refetchInterval,
      enabled: Boolean(tripId) && Boolean(lineName),
    }
  );

  useCurrentRefetchFns([refetch]);

  let linePolyline: PolylinePoints | undefined = trip?.polyline?.features?.map(
    (f) => {
      if (!f.geometry.coordinates) return [NaN, NaN];
      return [
        f.geometry.coordinates[1] as number,
        f.geometry.coordinates[0] as number,
      ];
    }
  );

  linePolyline = linePolyline?.filter((p) => !(isNaN(p[0]) || isNaN(p[1])));
  let content: ReactNode = (
    <p className="italic">No data found for line {lineName}.</p>
  );

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (trip) {
    content = (
      <div className="mt-12 flex w-screen flex-col items-center gap-2 md:mt-8 md:gap-4 lg:mt-4">
        <TripSection trip={trip} polylinePoints={linePolyline} />
        {trip.stopovers && (
          <TripDetailSection trip={trip} stationId={String(stationId)} />
        )}
        {trip.polyline && (
          <MapSection
            lineName={trip.lineName}
            polylinePoints={linePolyline}
            currentLocation={trip.currentLocation}
          />
        )}
      </div>
    );
  }

  return (
    <main className="mx-auto flex h-screen w-full flex-col justify-center bg-slate-300 dark:bg-black">
      <NavBar />
      <div className="mx-auto flex w-full flex-col items-center overflow-y-scroll py-4 lg:py-16">
        {content}
      </div>
    </main>
  );
};

export default Departures;
