import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import { hafasClient } from "@utils/vbb-hafas/client";
import type { DepatureResponse } from "../models/departure";
import { mapDepartureResponseToDeparture } from "../models/departure";

export const departureRouter = router({
    byStationId: publicProcedure
        .input(z.object({
            stationId: z.string(),
            resultCount: z.number().default(30),
            duration: z.number().default(30),
            lineId: z.string().optional(),
        }))
        .query(async ({ input }) => {

            const { stationId, resultCount, duration, lineId } = input;

            const { departures }: { departures: DepatureResponse[] } =
                await hafasClient.departures(
                    stationId,
                    {
                        remarks: false,
                        results: lineId ? resultCount * 3 : resultCount,
                        duration: lineId ? duration * 3 : duration,
                        ...(lineId ? { line: lineId } : {}),
                    }
                );

            return departures.map(mapDepartureResponseToDeparture);
        }),
});
