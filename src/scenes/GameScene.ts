import Phaser from 'phaser';
import { GravityController, GravityDirection } from '../physics/GravityController';

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private gravity!: GravityController;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private hazards!: Phaser.Physics.Arcade.StaticGroup;
  private collectibles!: Phaser.Physics.Arcade.StaticGroup;
  private exit!: Phaser.GameObjects.Rectangle;
  private gravityText!: Phaser.GameObjects.Text;
  private messageText!: Phaser.GameObjects.Text;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private moveNegative = false;
  private movePositive = false;
  private collected = 0;
  private completed = false;
  private readonly moveSpeed = 230;

  constructor() {
    super('GameScene');
  }

  create(): void {
    this.collected = 0;
    this.completed = false;
    this.moveNegative = false;
    this.movePositive = false;

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
      this.messageText.setText(`ENERGY: ${this.collected}/3`);
    });
    this.physics.add.overlap(this.player, this.exit, () => this.completeLevel());

    this.gravity.setDirection('down');
    this.updateGravityLabel();
  }

  private createWorld(): void {
    const panel = this.add.graphics();
    panel.fillStyle(0x172338, 1);
    panel.fillRoundedRect(24, 24, 912, 552, 22);
    panel.lineStyle(2, 0x30435f, 1);
    panel.strokeRoundedRect(24, 24, 912, 552, 22);

    this.platforms = this.physics.add.staticGroup();
    this.hazards = this.physics.add.staticGroup();
    this.collectibles = this.physics.add.staticGroup();

    // Room boundaries are authored as platforms so gravity can point in any direction.
    this.addPlatform(480, 548, 840, 24);
    this.addPlatform(480, 52, 840, 24);
    this.addPlatform(52, 300, 24, 480);
    this.addPlatform(908, 300, 24, 480);

    this.addPlatform(270, 430, 210, 18);
    this.addPlatform(650, 350, 210, 18);
    this.addPlatform(300, 190, 180, 18);
    this.addPlatform(700, 190, 150, 18);

    this.addHazard(480, 510, 110, 16);
    this.addCollectible(270, 390);
    this.addCollectible(650, 310);
    this.addCollectible(700, 150);

    this.exit = this.add.rectangle(850, 105, 48, 58, 0x34d399)
      .setStrokeStyle(3, 0xa7f3d0);
    this.physics.add.existing(this.exit, true);
  }

  private addPlatform(x: number, y: number, width: number, height: number): void {
    const platform = this.add.rectangle(x, y, width, height, 0x64748b)
      .setStrokeStyle(2, 0x94a3b8);
    this.platforms.add(platform);
  }

  private addHazard(x: number, y: number, width: number, height: number): void {
    const hazard = this.add.rectangle(x, y, width, height, 0xfb7185)
      .setStrokeStyle(2, 0xffc2cc);
    this.hazards.add(hazard);
  }

  private addCollectible(x: number, y: number): void {
    const orb = this.add.circle(x, y, 10, 0xfbbf24)
      .setStrokeStyle(2, 0xfef3c7);
    this.collectibles.add(orb);
  }

  private createPlayer(): void {
    if (!this.textures.exists('player')) {
      const graphics = this.make.graphics({ x: 0, y: 0 });
      graphics.fillStyle(0x60a5fa, 1);
      graphics.fillRoundedRect(0, 0, 34, 38, 9);
      graphics.fillStyle(0xffffff, 1);
      graphics.fillCircle(11, 13, 4);
      graphics.fillCircle(24, 13, 4);
      graphics.generateTexture('player', 34, 38);
      graphics.destroy();
    }

    this.player = this.physics.add.sprite(130, 470, 'player');
    this.player.setCollideWorldBounds(false);
    this.player.setMaxVelocity(650, 650);
    this.player.setDepth(5);
    this.player.setSize(28, 32);
  }

  private createHud(): void {
    this.add.text(52, 36, 'GRAVITY FLIP', {
      fontFamily: 'Arial', fontSize: '22px', color: '#f8fafc', fontStyle: 'bold'
    });
    this.gravityText = this.add.text(52, 70, '', {
      fontFamily: 'Arial', fontSize: '14px', color: '#93c5fd'
    });
    this.messageText = this.add.text(52, 94, 'Collect energy and reach the green portal.', {
      fontFamily: 'Arial', fontSize: '13px', color: '#cbd5e1'
    });
    this.add.text(52, 552, 'Keyboard: A/D or arrows move • W/S/Q/E change gravity • R restart', {
      fontFamily: 'Arial', fontSize: '11px', color: '#94a3b8'
    });
  }

  private createControls(): void {
    const gravityButtons: Array<{ direction: GravityDirection; x: number; y: number; icon: string }> = [
      { direction: 'up', x: 830, y: 72, icon: '↑' },
      { direction: 'left', x: 782, y: 120, icon: '←' },
      { direction: 'right', x: 878, y: 120, icon: '→' },
      { direction: 'down', x: 830, y: 168, icon: '↓' }
    ];

    gravityButtons.forEach(({ direction, x, y, icon }) => {
      const circle = this.add.circle(x, y, 23, 0x26364d)
        .setStrokeStyle(2, 0x60a5fa)
        .setInteractive({ useHandCursor: true });
      this.add.text(x, y - 1, icon, {
        fontFamily: 'Arial', fontSize: '25px', color: '#ffffff'
      }).setOrigin(0.5).setDepth(2);
      circle.on('pointerdown', () => this.setGravity(direction));
    });

    this.addMovementButton(790, 520, '◀', 'negative');
    this.addMovementButton(870, 520, '▶', 'positive');
  }

  private addMovementButton(
    x: number,
    y: number,
    label: string,
    direction: 'negative' | 'positive'
  ): void {
    const button = this.add.rectangle(x, y, 58, 42, 0x26364d)
      .setStrokeStyle(2, 0x64748b)
      .setInteractive();
    this.add.text(x, y, label, { fontSize: '20px', color: '#ffffff' }).setOrigin(0.5);
    const setPressed = (pressed: boolean) => {
      if (direction === 'negative') this.moveNegative = pressed;
      else this.movePositive = pressed;
    };
    button.on('pointerdown', () => setPressed(true));
    button.on('pointerup', () => setPressed(false));
    button.on('pointerout', () => setPressed(false));
    this.input.on('pointerup', () => setPressed(false));
  }

  private setGravity(direction: GravityDirection): void {
    if (this.completed) return;
    this.gravity.setDirection(direction);
    this.updateGravityLabel();
  }

  private updateGravityLabel(): void {
    this.gravityText.setText(`GRAVITY: ${this.gravity.getDirection().toUpperCase()}`);
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

    this.player.setVelocity(tangent.x * axis * this.moveSpeed, tangent.y * axis * this.moveSpeed);
  }

  private completeLevel(): void {
    if (this.completed) return;
    this.completed = true;
    this.physics.pause();
    this.messageText.setText(`LEVEL COMPLETE • ENERGY ${this.collected}/3 • Press R to retry`);
    this.player.setTint(0x34d399);
  }

  private restartLevel(): void {
    if (!this.completed) this.scene.restart();
  }
}
