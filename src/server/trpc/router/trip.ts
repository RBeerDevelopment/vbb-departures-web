import { z } from "zod";

import { router, publicProcedure } from "../trpc";
import type { TripResponse } from "../models/trip";
import { mapTripResponseToTrip } from "../models/trip";
import { hafasClient } from "@utils/vbb-hafas";

export const tripRouter = router({
    byTripId: publicProcedure
        .input(z.object({
            tripId: z.string(),
            polyline: z.boolean().default(false),
            stopovers: z.boolean().default(true)
        }))
        .query(async ({ input }) => {

            const { tripId, stopovers, polyline } = input;

            const { trip }: { trip: TripResponse } = await hafasClient.trip(tripId, {
                remarks: false,
                polyline,
                stopovers
            });

            return mapTripResponseToTrip(trip);
        }),
});
