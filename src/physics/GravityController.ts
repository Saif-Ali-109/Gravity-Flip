import Phaser from 'phaser';

export type GravityDirection = 'down' | 'up' | 'left' | 'right';

const vectors: Record<GravityDirection, Phaser.Math.Vector2> = {
  down: new Phaser.Math.Vector2(0, 1),
  up: new Phaser.Math.Vector2(0, -1),
  left: new Phaser.Math.Vector2(-1, 0),
  right: new Phaser.Math.Vector2(1, 0)
};

export class GravityController {
  private direction: GravityDirection = 'down';

  constructor(
    private readonly scene: Phaser.Scene,
    private readonly strength = 900
  ) {}

  setDirection(direction: GravityDirection): void {
    this.direction = direction;
    const vector = vectors[direction];
    this.scene.physics.world.gravity.set(
      vector.x * this.strength,
      vector.y * this.strength
    );
  }

  getDirection(): GravityDirection {
    return this.direction;
  }

  getVector(): Phaser.Math.Vector2 {
    return vectors[this.direction].clone();
  }

  getTangent(): Phaser.Math.Vector2 {
    const gravity = vectors[this.direction];
    return new Phaser.Math.Vector2(-gravity.y, gravity.x);
  }
}
