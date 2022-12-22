import axios from "axios";
import { z } from "zod";
import { env } from "@env/server.mjs";

import { router, publicProcedure } from "../trpc";
import type { TripResponse } from "../models/trip";
import { mapTripResponseToTrip } from "../models/trip";

export const tripRouter = router({
    byTripId: publicProcedure
        .input(z.object({ 
            tripId: z.string(), 
            lineName: z.string(), 
            polyline: z.boolean().default(false), 
            stopovers: z.boolean().default(true)
        }))
        .query(async ({ input }) => {

            const { tripId, lineName, stopovers, polyline } = input;

            const apiUrl = new URL(env.VBB_API_URL + `trips/${encodeURIComponent(tripId)}`);

            apiUrl.searchParams.append("lineName", String(lineName));
            apiUrl.searchParams.append("stopovers", String(stopovers));
            apiUrl.searchParams.append("remarks", "false");
            apiUrl.searchParams.append("polyline", String(polyline));
            apiUrl.searchParams.append("pretty", "false");

            const resp = await axios.get<TripResponse>(apiUrl.toString());

            const data = mapTripResponseToTrip(resp.data);

            return data;
        }),
});
