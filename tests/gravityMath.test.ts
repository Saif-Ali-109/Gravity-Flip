import { describe, expect, it } from 'vitest';
import {
  gravityTangent,
  gravityVector,
  projectOnto,
  type GravityDirection
} from '../src/physics/gravityMath';

describe('gravity direction mapping', () => {
  const cases: Array<[GravityDirection, number, number, number, number]> = [
    ['down', 0, 1, -1, 0],
    ['up', 0, -1, 1, 0],
    ['left', -1, 0, 0, 1],
    ['right', 1, 0, 0, -1]
  ];

  it.each(cases)('%s maps to the correct gravity and tangent', (direction, gx, gy, tx, ty) => {
    expect(gravityVector(direction)).toEqual({ x: gx, y: gy });
    expect(gravityTangent(direction)).toEqual({ x: tx, y: ty });
  });

  it('returns independent vectors', () => {
    const first = gravityVector('down');
    first.x = 99;
    expect(gravityVector('down')).toEqual({ x: 0, y: 1 });
  });

  it('projects velocity onto a movement axis', () => {
    expect(projectOnto({ x: 3, y: 4 }, { x: 0, y: 1 })).toBe(4);
  });
});
