import React from "react";
import type { Trip } from "@server/trpc/models/trip";
import { findIndexOfClosestPoint } from "@utils/coordinates";
import { DetailCard } from "@components/detail-card";
import type { PolylinePoint, PolylinePoints } from "@components/map-section";
import { TimeWithDelay } from "@components/time-with-delay";

interface Props {
  trip: Trip;
  polylinePoints?: PolylinePoints;
}

export function TripSection(props: Props): React.ReactElement {
  const { trip, polylinePoints } = props;
  const lineBgClass = `bg-${trip.lineName.toLowerCase()}`;

  const currentLocationPolylinePoint: PolylinePoint = [
    trip.currentLocation?.latitude || 0,
    trip.currentLocation?.longitude || 0,
  ];
  const tripProgress = calculateTripProgress(
    polylinePoints || [],
    currentLocationPolylinePoint
  );

  return (
    <DetailCard>
      <h2
        className={`text-2xl font-medium text-${trip.lineName.toLowerCase()}`}
      >
        {trip.lineName} ({trip.direction})
      </h2>
      <div className="flex w-full flex-col items-center py-4">
        <div className="flex w-full items-center justify-between px-2 py-2 text-sm font-light">
          <p>{trip.originName}</p>
          <p>{trip.destination}</p>
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="relative z-0 h-3 w-4/5 rounded-full bg-gray-400">
            <div
              id="test"
              className={`${lineBgClass} relative z-10 h-3 rounded-full`}
              style={{
                width: `calc(${Math.floor(tripProgress * 100)}% - 4px)`,
              }}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-between px-5 py-2 text-sm font-light">
          <TimeWithDelay time={trip.departure} delay={trip.departureDelay} />
          <TimeWithDelay time={trip.arrival} delay={trip.arrivalDelay} />
        </div>
      </div>
    </DetailCard>
  );
}

function calculateTripProgress(
  tripPolyline: PolylinePoints,
  currentLocation: PolylinePoint
): number {
  const closestPointIndex = findIndexOfClosestPoint(
    currentLocation,
    tripPolyline
  );
  return closestPointIndex / tripPolyline.length;
}
