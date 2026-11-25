export type GravityDirection = 'down' | 'up' | 'left' | 'right';

export interface Vector {
  x: number;
  y: number;
}

const directions: Record<GravityDirection, Vector> = {
  down: { x: 0, y: 1 },
  up: { x: 0, y: -1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};

export function gravityVector(direction: GravityDirection): Vector {
  return { ...directions[direction] };
}

export function gravityTangent(direction: GravityDirection): Vector {
  const tangents: Record<GravityDirection, Vector> = {
    down: { x: 1, y: 0 },
    up: { x: 1, y: 0 },
    left: { x: 0, y: 1 },
    right: { x: 0, y: -1 }
  };
  return { ...tangents[direction] };
}

export function projectOnto(vector: Vector, axis: Vector): number {
  return vector.x * axis.x + vector.y * axis.y;
}
