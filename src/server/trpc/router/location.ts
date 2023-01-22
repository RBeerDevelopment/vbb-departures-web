import { z } from "zod";
import type { LocationResponse } from "../models/location";
import { mapLocationResponseToLocation } from "../models/location";

import { router, publicProcedure } from "../trpc";
import { hafasClient } from "@utils/vbb-hafas";

export const locationRouter = router({
    byFuzzyName: publicProcedure
        .input(z.object({ query: z.string(), resultCount: z.number().default(10) }))
        .query(async ({ input }) => {

            const locations: LocationResponse[] = await hafasClient.locations(input.query, {
                fuzzy: true,
                poi: false,
                addresses: false,
                results: input.resultCount,
                lang: "de"
            });

            return locations.map(mapLocationResponseToLocation);
        }),
    byLocation: publicProcedure
        .input(z.object({
            lat: z.number().lte(90, "Must at below or equal to 90").gte(-90, "Must be larger or equal to -90"),
            long: z.number().lte(180, "Must at below or equal to 180").gte(-180, "Must be larger or equal to -180"),
        }))
        .query(async ({ input }) => {

            const locations: LocationResponse[] = await hafasClient.nearby({
                type: 'location',
                longitude: input.long,
                latitude: input.lat
            }, {
                results: 10,
                poi: false,
                distance: 1000
            });

            return locations.map(mapLocationResponseToLocation);
        }),
});
