import axios from "axios";
import { z } from "zod";
import { env } from "@env/server.mjs";
import type { LocationResponse } from "../models/location";
import { mapLocationResponseToLocation } from "../models/location";

import { router, publicProcedure } from "../trpc";

export const locationRouter = router({
    byFuzzyName: publicProcedure
        .input(z.object({ query: z.string() }))
        .query(async ({ input }) => {

            const apiUrl = new URL(`${env.VBB_API_URL}locations`);

            apiUrl.searchParams.append("query", input.query);
            apiUrl.searchParams.append("fuzzy", "true");
            apiUrl.searchParams.append("addresses", "false");
            apiUrl.searchParams.append("poi", "false");
            apiUrl.searchParams.append("results", "10");
            apiUrl.searchParams.append("lang", "de");

            const resp = await axios.get<LocationResponse[]>(apiUrl.toString());

            const data = resp.data.map(mapLocationResponseToLocation);

            return data;
        }),
    byLocation: publicProcedure
        .input(z.object({
            lat: z.number().lte(90, "Must at below or equal to 90").gte(-90, "Must be larger or equal to -90"),
            long: z.number().lte(180, "Must at below or equal to 180").gte(-180, "Must be larger or equal to -180"),
        }))
        .query(async ({ input }) => {

            const apiUrl = new URL(`${env.VBB_API_URL}stops/nearby`);

            apiUrl.searchParams.append("latitude", String(input.lat));
            apiUrl.searchParams.append("longitude", String(input.long));
            apiUrl.searchParams.append("results", "10");
            apiUrl.searchParams.append("poi", "false");
            apiUrl.searchParams.append("distance", "1000");

            const resp = await axios.get<LocationResponse[]>(apiUrl.toString());

            const data = resp.data.map(mapLocationResponseToLocation);

            return data;
        }),
});
