import type { LocationModel } from "@server/trpc/models/location";
import { redis } from "./redis-client";

const EXP_ONE_DAY = 60 * 60 * 24;

export function cacheLocationQuery(query: string, result: LocationModel[]) {
    redis.set(`locations:${query}`, JSON.stringify(result), { ex: EXP_ONE_DAY });
}