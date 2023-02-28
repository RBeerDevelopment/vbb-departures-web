import type { PolylinePoints, PolylinePoint } from "@components/map-section";
import { findIndexOfClosestPoint } from "./find-index-of-closest-point";

export function findClosestPoint(
  point: PolylinePoint,
  searchArray: PolylinePoints
): PolylinePoint {
  const index = findIndexOfClosestPoint(point, searchArray);
  return searchArray[index] as PolylinePoint;
}
