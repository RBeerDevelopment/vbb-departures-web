import { router } from "../trpc";
import { departureRouter } from "./departures";
import { locationRouter } from "./location";

export const appRouter = router({
  location: locationRouter,
  departure: departureRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
