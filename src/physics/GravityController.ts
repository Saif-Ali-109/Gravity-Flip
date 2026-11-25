import type Phaser from 'phaser';
import {
  gravityTangent,
  gravityVector,
  type GravityDirection,
  type Vector
} from './gravityMath';

export type { GravityDirection };

export class GravityController {
  private direction: GravityDirection = 'down';

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly strength = 900
  ) {}

  setDirection(direction: GravityDirection): void {
    this.direction = direction;
    const vector = gravityVector(direction);
    this.scene.physics.world.gravity.set(
      vector.x * this.strength,
      vector.y * this.strength
    );
  }

  getDirection(): GravityDirection {
    return this.direction;
  }

  getVector(): Vector {
    return gravityVector(this.direction);
  }

  getTangent(): Vector {
    return gravityTangent(this.direction);
  }
}
