import { router } from "../trpc";
import { departureRouter } from "./departures";
import { locationRouter } from "./location";
import { tripRouter } from "./trip";

export const appRouter = router({
  location: locationRouter,
  departure: departureRouter,
  trip: tripRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
