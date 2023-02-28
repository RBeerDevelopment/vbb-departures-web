import type { PolylinePoint, PolylinePoints } from "@components/map-section";
import { absolutePointDistance } from "./absolute-point-distance";

export function findIndexOfClosestPoint(
  point: PolylinePoint,
  searchArray: PolylinePoints
): number {
  const distances = searchArray.map((p) => absolutePointDistance(p, point));
  const minDistance = Math.min(...distances);

  return distances.indexOf(minDistance);
}
