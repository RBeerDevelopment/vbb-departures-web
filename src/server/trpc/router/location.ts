import { z } from "zod";
import type { LocationModel } from "../models";
import type { LocationResponse } from "../models/response";
import { mapResponseToLocation } from "../models";

import { router, publicProcedure } from "../trpc";
import { hafasClient } from "@utils/vbb-hafas";

import { cacheLocationQuery, getLocationCache } from "@utils/redis";
import type { StopResponse } from "../models/response/stop-response";
import { mapResponseToStop } from "../models/stop";

export const locationRouter = router({
  byFuzzyName: publicProcedure
    .input(z.object({ query: z.string(), resultCount: z.number().default(10) }))
    .query(async ({ input }) => {

      const result = await Promise.any([getLocationCache(input.query), searchLocations(input.query, input.resultCount)]);

      return result;

    }),
  byStationId: publicProcedure
    .input(z.object({ stationId: z.string() }))
    .query(async ({ input }) => {

      const response: StopResponse = await hafasClient.stop(input.stationId);
      return mapResponseToStop(response);

    }),
  byLocation: publicProcedure
    .input(
      z.object({
        lat: z
          .number()
          .lte(90, "Must at below or equal to 90")
          .gte(-90, "Must be larger or equal to -90"),
        long: z
          .number()
          .lte(180, "Must at below or equal to 180")
          .gte(-180, "Must be larger or equal to -180"),
      })
    )
    .query(async ({ input }) => {
      const locations: LocationResponse[] = await hafasClient.nearby(
        {
          type: "location",
          longitude: input.long,
          latitude: input.lat,
        },
        {
          results: 10,
          poi: false,
          distance: 1000,
        }
      );

      return locations.map(mapResponseToLocation);
    }),
});

async function searchLocations(query: string, resultCount: number): Promise<LocationModel[]> {

  const locationResponse: LocationResponse[] = await hafasClient.locations(
    query,
    {
      fuzzy: true,
      poi: false,
      addresses: false,
      results: resultCount,
      lang: "de",
    }
  );

  const locations = locationResponse.map(mapResponseToLocation);

  cacheLocationQuery(query, locations);

  return locations;
}