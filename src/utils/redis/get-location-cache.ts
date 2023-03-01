import type { LocationModel } from '@server/trpc/models/location';
import { redis } from './redis-client';

export async function getLocationCache(query: string): Promise<LocationModel[]> {

    const cachedLocations = await redis.get<LocationModel[]>(`locations:${query}`);

    if (cachedLocations) {
        return cachedLocations;
    }

    return Promise.reject("Not in cache");
}