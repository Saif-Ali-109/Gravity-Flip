import Phaser from 'phaser';
import { GravityController, type GravityDirection } from '../physics/GravityController';

type MoveDirection = 'negative' | 'positive';

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private gravity!: GravityController;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private hazards!: Phaser.Physics.Arcade.StaticGroup;
  private collectibles!: Phaser.Physics.Arcade.StaticGroup;
  private exit!: Phaser.GameObjects.Rectangle;
  private gravityText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private moveNegative = false;
  private movePositive = false;
  private collected = 0;
  private completed = false;
  private readonly moveSpeed = 245;

  constructor() {
    super('GameScene');
  }

  create(): void {
    this.collected = 0;
    this.completed = false;
    this.moveNegative = false;
    this.movePositive = false;

    this.createBackdrop();
    this.gravity = new GravityController(this);
    this.createWorld();
    this.createPlayer();
    this.createHud();
    this.createControls();

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.keys = this.input.keyboard!.addKeys('W,A,S,D,Q,E,R') as Record<string, Phaser.Input.Keyboard.Key>;

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.overlap(this.player, this.hazards, () => this.restartLevel());
    this.physics.add.overlap(this.player, this.collectibles, (_player, item) => {
      item.destroy();
      this.collected += 1;
      this.statusText.setText(`ENERGY  ${this.collected}/3`);
    });
    this.physics.add.overlap(this.player, this.exit, () => this.completeLevel());

    this.gravity.setDirection('down');
    this.updateGravityLabel();
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.onShutdown, this);
  }

  private createBackdrop(): void {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x111d31, 1);
    graphics.fillRoundedRect(20, 20, 920, 560, 24);
    graphics.lineStyle(2, 0x2b405e, 1);
    graphics.strokeRoundedRect(20, 20, 920, 560, 24);

    for (let x = 72; x < 920; x += 48) {
      for (let y = 132; y < 500; y += 48) {
        graphics.fillStyle(0x26364d, 0.32);
        graphics.fillCircle(x, y, 1.5);
      }
    }
  }

  private createWorld(): void {
    this.platforms = this.physics.add.staticGroup();
    this.hazards = this.physics.add.staticGroup();
    this.collectibles = this.physics.add.staticGroup();

    this.addPlatform(480, 548, 840, 24);
    this.addPlatform(480, 52, 840, 24);
    this.addPlatform(52, 300, 24, 480);
    this.addPlatform(908, 300, 24, 480);

    this.addPlatform(260, 430, 210, 18);
    this.addPlatform(650, 360, 220, 18);
    this.addPlatform(300, 205, 180, 18);
    this.addPlatform(700, 205, 160, 18);
    this.addPlatform(485, 285, 110, 16);

    this.addHazard(480, 510, 112, 16);
    this.addCollectible(260, 390);
    this.addCollectible(650, 320);
    this.addCollectible(700, 165);

    this.exit = this.add.rectangle(850, 112, 48, 58, 0x10b981)
      .setStrokeStyle(3, 0xa7f3d0);
    this.physics.add.existing(this.exit, true);
    this.add.text(850, 112, 'EXIT', {
      fontFamily: 'Arial',
      fontSize: '12px',
      color: '#ecfdf5',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }

  private addPlatform(x: number, y: number, width: number, height: number): void {
    const platform = this.add.rectangle(x, y, width, height, 0x526783)
      .setStrokeStyle(2, 0x91a7c4);
    this.platforms.add(platform);
  }

  private addHazard(x: number, y: number, width: number, height: number): void {
    const hazard = this.add.rectangle(x, y, width, height, 0xf05270)
      .setStrokeStyle(2, 0xffa6b7);
    this.hazards.add(hazard);
  }

  private addCollectible(x: number, y: number): void {
    const orb = this.add.circle(x, y, 10, 0xfbbf24)
      .setStrokeStyle(3, 0xfff0a6);
    this.collectibles.add(orb);
  }

  private createPlayer(): void {
    if (!this.textures.exists('player')) {
      const graphics = this.make.graphics({ x: 0, y: 0 });
      graphics.fillStyle(0x60a5fa, 1);
      graphics.fillRoundedRect(1, 1, 34, 38, 10);
      graphics.fillStyle(0xffffff, 1);
      graphics.fillCircle(11, 14, 4);
      graphics.fillCircle(25, 14, 4);
      graphics.fillStyle(0x172554, 1);
      graphics.fillCircle(12, 14, 1.8);
      graphics.fillCircle(26, 14, 1.8);
      graphics.fillRoundedRect(13, 25, 11, 3, 1);
      graphics.generateTexture('player', 36, 40);
      graphics.destroy();
    }

    this.player = this.physics.add.sprite(125, 475, 'player');
    this.player.setCollideWorldBounds(false);
    this.player.setMaxVelocity(650, 650);
    this.player.setDrag(900, 900);
    this.player.setDepth(10);
    this.player.setSize(28, 32);
  }

  private createHud(): void {
    this.add.text(52, 34, 'GRAVITY FLIP', {
      fontFamily: 'Arial',
      fontSize: '23px',
      color: '#f8fafc',
      fontStyle: 'bold'
    });
    this.gravityText = this.add.text(54, 69, '', {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#93c5fd',
      fontStyle: 'bold'
    });
    this.statusText = this.add.text(54, 94, 'ENERGY  0/3', {
      fontFamily: 'Arial',
      fontSize: '13px',
      color: '#fcd34d'
    });
    this.add.text(54, 116, 'Collect orbs if you can. The portal is always open.', {
      fontFamily: 'Arial',
      fontSize: '12px',
      color: '#b7c5d8'
    });
    this.add.text(54, 558, 'A / D or ← / →  MOVE     W / S / Q / E  GRAVITY     R  RESTART', {
      fontFamily: 'Arial',
      fontSize: '11px',
      color: '#8fa3bd'
    });
  }

  private createControls(): void {
    const gravityButtons: Array<{ direction: GravityDirection; x: number; y: number; icon: string }> = [
      { direction: 'up', x: 830, y: 72, icon: '↑' },
      { direction: 'left', x: 782, y: 120, icon: '←' },
      { direction: 'right', x: 878, y: 120, icon: '→' },
      { direction: 'down', x: 830, y: 168, icon: '↓' }
    ];

    for (const { direction, x, y, icon } of gravityButtons) {
      const circle = this.add.circle(x, y, 22, 0x263a56)
        .setStrokeStyle(2, 0x60a5fa)
        .setInteractive({ useHandCursor: true });
      const label = this.add.text(x, y - 1, icon, {
        fontFamily: 'Arial',
        fontSize: '25px',
        color: '#ffffff'
      }).setOrigin(0.5);
      circle.on('pointerdown', () => this.setGravity(direction));
      circle.on('pointerover', () => circle.setFillStyle(0x365477));
      circle.on('pointerout', () => circle.setFillStyle(0x263a56));
      label.setDepth(2);
    }

    this.addMovementButton(790, 510, '◀', 'negative');
    this.addMovementButton(870, 510, '▶', 'positive');
    this.input.on('pointerup', this.releaseMovement, this);
    this.input.on('gameout', this.releaseMovement, this);
  }

  private addMovementButton(
    x: number,
    y: number,
    label: string,
    direction: MoveDirection
  ): void {
    const button = this.add.rectangle(x, y, 62, 48, 0x263a56)
      .setStrokeStyle(2, 0x7187a5)
      .setInteractive();
    this.add.text(x, y, label, {
      fontFamily: 'Arial',
      fontSize: '21px',
      color: '#ffffff'
    }).setOrigin(0.5);

    const setPressed = (pressed: boolean) => {
      if (direction === 'negative') this.moveNegative = pressed;
      else this.movePositive = pressed;
      button.setFillStyle(pressed ? 0x3b82a8 : 0x263a56);
    };

    button.on('pointerdown', () => setPressed(true));
    button.on('pointerup', () => setPressed(false));
    button.on('pointerout', () => setPressed(false));
  }

  private releaseMovement(): void {
    this.moveNegative = false;
    this.movePositive = false;
  }

  private onShutdown(): void {
    this.input.off('pointerup', this.releaseMovement, this);
    this.input.off('gameout', this.releaseMovement, this);
    this.releaseMovement();
  }

  private setGravity(direction: GravityDirection): void {
    if (this.completed) return;

    const oldTangent = this.gravity.getTangent();
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const tangentSpeed = body.velocity.x * oldTangent.x + body.velocity.y * oldTangent.y;

    this.gravity.setDirection(direction);

    const newTangent = this.gravity.getTangent();
    this.player.setVelocity(
      newTangent.x * tangentSpeed,
      newTangent.y * tangentSpeed
    );
    this.updateGravityLabel();
  }

  private updateGravityLabel(): void {
    this.gravityText.setText(`GRAVITY  ${this.gravity.getDirection().toUpperCase()}`);
  }

  update(): void {
    if (this.keys.R && Phaser.Input.Keyboard.JustDown(this.keys.R)) {
      this.scene.restart();
      return;
    }

    if (this.keys.W && Phaser.Input.Keyboard.JustDown(this.keys.W)) this.setGravity('up');
    if (this.keys.S && Phaser.Input.Keyboard.JustDown(this.keys.S)) this.setGravity('down');
    if (this.keys.Q && Phaser.Input.Keyboard.JustDown(this.keys.Q)) this.setGravity('left');
    if (this.keys.E && Phaser.Input.Keyboard.JustDown(this.keys.E)) this.setGravity('right');

    if (!this.player?.body || this.completed) return;

    const tangent = this.gravity.getTangent();
    const negative = this.moveNegative || this.cursors.left.isDown || this.keys.A.isDown;
    const positive = this.movePositive || this.cursors.right.isDown || this.keys.D.isDown;
    const axis = Number(positive) - Number(negative);
    const targetSpeed = tangent.x * axis * this.moveSpeed;
    const targetVerticalSpeed = tangent.y * axis * this.moveSpeed;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const gravity = this.gravity.getVector();

    if (gravity.x !== 0) {
      this.player.setVelocity(targetSpeed, Phaser.Math.Linear(body.velocity.y, gravity.y * 130, 0.025));
    } else {
      this.player.setVelocity(
        Phaser.Math.Linear(body.velocity.x, gravity.x * 130, 0.025),
        targetVerticalSpeed
      );
    }
  }

  private completeLevel(): void {
    if (this.completed) return;
    this.completed = true;
    this.physics.pause();
    this.player.setTint(0x86efac);
    this.add.rectangle(480, 300, 430, 150, 0x0b1220, 0.94)
      .setStrokeStyle(2, 0x34d399)
      .setDepth(20);
    this.add.text(480, 270, 'ROOM CLEARED!', {
      fontFamily: 'Arial',
      fontSize: '30px',
      color: '#86efac',
      fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(21);
    this.add.text(480, 315, `Energy collected: ${this.collected}/3`, {
      fontFamily: 'Arial',
      fontSize: '17px',
      color: '#e2e8f0'
    }).setOrigin(0.5).setDepth(21);
    this.add.text(480, 350, 'Press R or tap RESTART to play again', {
      fontFamily: 'Arial',
      fontSize: '13px',
      color: '#cbd5e1'
    }).setOrigin(0.5).setDepth(21);
  }

  private restartLevel(): void {
    if (!this.completed) this.scene.restart();
  }
}
