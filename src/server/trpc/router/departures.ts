import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { hafasClient } from "@utils/vbb-hafas/client";
import type { Departure } from "../models/departure";
import { mapDepartureResponseToDeparture } from "../models/departure";

export const departureRouter = router({
    byStationId: publicProcedure
        .input(z.object({ stationId: z.string(), resultCount: z.number().default(30), duration: z.number().default(30) }))
        .query(async ({ input }) => {


            const { stationId, resultCount, duration } = input;

            const { departures } = await hafasClient.departures(stationId,
                {
                    remarks: false,
                    results: resultCount,
                    duration: duration,
                }
            );

            const data: Departure[] = departures.map(mapDepartureResponseToDeparture);
            return data;
        }),
});
