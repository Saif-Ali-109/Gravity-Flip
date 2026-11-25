import Phaser from 'phaser';
import { GameScene } from './scenes/GameScene';
import './style.css';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 960,
  height: 600,
  backgroundColor: '#0b1220',
  render: {
    antialias: true,
    pixelArt: false,
    roundPixels: true
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 960,
    height: 600
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 900 },
      debug: false
    }
  },
  input: {
    activePointers: 3
  },
  scene: [GameScene]
};

new Phaser.Game(config);
