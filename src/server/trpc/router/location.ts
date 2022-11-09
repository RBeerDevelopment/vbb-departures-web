import axios from "axios";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import type { LocationResponse } from "../models/location";
import { mapLocationResponseToLocation } from "../models/location";

import { router, publicProcedure } from "../trpc";

export const locationRouter = router({
    byFuzzyName: publicProcedure
        .input(z.object({ query: z.string() }))
        .query(async ({ input }) => {

            const apiUrl = new URL(env.VBB_API_URL + "locations");

            apiUrl.searchParams.append("query", input.query);
            apiUrl.searchParams.append("fuzzy", "true");
            apiUrl.searchParams.append("addresses", "false");
            apiUrl.searchParams.append("poi", "false");
            apiUrl.searchParams.append("results", "10");

            const resp = await axios.get<LocationResponse[]>(apiUrl.toString());

            const data = resp.data.map(mapLocationResponseToLocation);

            return data;
        }),
});
