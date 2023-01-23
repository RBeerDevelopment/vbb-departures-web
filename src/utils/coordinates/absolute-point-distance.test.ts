import type { PolylinePoint } from '@components/map-section';
import { test, describe, expect } from 'vitest';
import { absolutePointDistance } from './absolute-point-distance';

describe('absolutePointDistance', () => {
    test('should 0 for the distance from a point to itself', () => {
        const a: PolylinePoint = [0, 0];
        const b: PolylinePoint = [0, 0];

        expect(absolutePointDistance(a, b)).toBe(0);
    });

    test('should return the same (positive) distance whichever way the points are passed in', () => {
        const a: PolylinePoint = [2, 5];
        const b: PolylinePoint = [5, 12];

        expect(absolutePointDistance(a, b)).toBe(absolutePointDistance(b, a));
    });
});