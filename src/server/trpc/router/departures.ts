import axios from "axios";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import type { DepatureResponse } from "../models/departure.js";
import { mapDepartureResponseToDeparture } from "../models/departure";

import { router, publicProcedure } from "../trpc";

export const departureRouter = router({
    byStationId: publicProcedure
        .input(z.object({ stationId: z.string(), resultCount: z.number().default(15), duration: z.number().default(30) }))
        .query(async ({ input }) => {

            console.time("departureRouter");
            const { stationId, resultCount, duration } = input;

            const apiUrl = new URL(env.VBB_API_URL + `stops/${stationId}/departures`);

            apiUrl.searchParams.append("results", String(resultCount));
            apiUrl.searchParams.append("duration", String(duration));
            apiUrl.searchParams.append("ferry", "false");
            apiUrl.searchParams.append("express", "false");
            apiUrl.searchParams.append("regional", "false");
            apiUrl.searchParams.append("pretty", "false");
            apiUrl.searchParams.append("remarks", "false");

            const resp = await axios.get<DepatureResponse[]>(apiUrl.toString());

            const data = resp.data.map(mapDepartureResponseToDeparture);

            console.timeEnd("departureRouter");
            return data;
        }),
});
