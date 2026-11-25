# Gravity Flip

A 2D four-direction gravity puzzle platformer built with Phaser 3 and TypeScript, designed with YouTube Playables in mind.

> **Status:** Phase 1 prototype scaffold. Local gameplay is being built before platform SDK integration. YouTube Playables developer access and approval are separate requirements; this repository does not imply acceptance or publication.

## Gameplay
- Switch gravity in four directions: up, down, left, right.
- Move along the surface perpendicular to gravity.
- Collect energy orbs, avoid hazards, and reach the exit.
- Play level-based puzzle rooms.

## Requirements
- Node.js 20+
- npm 10+

## Run locally
```bash
npm install
npm run dev
```
Open the Vite URL printed in the terminal.

## Validate and build
```bash
npm run typecheck
npm run build
npm run preview
```

## Controls
- On-screen arrows: select gravity direction.
- Move buttons: move along the current gravity-relative tangent.
- Keyboard: arrow keys or A/D to move; W/S/Q/E select gravity; R restarts.
- Touch and mouse are supported for the on-screen controls.

## Project structure
```text
specs/              Product, gameplay, technical and platform requirements
src/
  entities/         Player and world objects
  physics/          Gravity controller
  scenes/           Phaser scenes
  systems/          Level and game state
public/assets/      Art and audio assets
tests/              Test plan and future automated tests
```

## Specifications
Read the documents in [specs/](./specs/):
- [Game design](./specs/GAME_DESIGN.md)
- [Technical specification](./specs/TECHNICAL_SPEC.md)
- [Gameplay mechanics](./specs/GAMEPLAY_MECHANICS.md)
- [Level design](./specs/LEVEL_DESIGN.md)
- [UI/UX](./specs/UI_UX.md)
- [Roadmap](./specs/ROADMAP.md)
- [YouTube Playables requirements](./specs/PLAYABLES_REQUIREMENTS.md)

## Scope and limitations
This is an early prototype, not a finished or certified Playable. The first milestone focuses on responsive controls, four-direction gravity, collisions, one test room, collectibles, hazards, and an exit. Progress persistence, polished art/audio, complete level progression, and Playables SDK integration are later milestones.

## License
See [LICENSE](./LICENSE). Third-party assets must have compatible licenses and attribution before inclusion.
