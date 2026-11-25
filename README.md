# Gravity Flip

A touch-first, four-direction gravity puzzle platformer built with Phaser 3, TypeScript and Vite.

## Current build

Phase 1 is a playable single-room prototype. It includes:
- Four-way gravity switching (up, down, left and right).
- Gravity-relative movement with keyboard and on-screen hold controls.
- Solid platforms, three optional energy orbs, a hazard and an exit portal.
- A completion state and deterministic room restart.
- Responsive canvas scaling and a desktop keyboard fallback.
- Automated tests for gravity vectors and movement-axis mapping.

The art is currently generated from Phaser vector shapes; final character art, sound, level progression and additional rooms are not included yet.

## Requirements

- Node.js 20+
- npm 10+

## Run locally

```bash
git clone https://github.com/Saif-Ali-109/Gravity-Flip.git
cd Gravity-Flip
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Validate and build

```bash
npm run typecheck
npm test
npm run build
npm run preview
```

## Controls

| Action | Keyboard | Touch |
|---|---|---|
| Move along the current gravity-relative tangent | A / D or ← / → | Hold the two lower movement buttons |
| Set gravity up | W | ↑ |
| Set gravity down | S | ↓ |
| Set gravity left | Q | ← |
| Set gravity right | E | → |
| Restart room | R | — |

Movement direction is relative to the current gravity orientation. Try switching gravity to find a route around the room.

## Project structure

```text
src/
  main.ts
  style.css
  physics/
    gravityMath.ts
    GravityController.ts
  scenes/
    GameScene.ts
specs/              Design, mechanics, level and platform requirements
tests/              Automated gravity tests and manual test plan
```

## YouTube Playables

The project is being developed as a standalone web game first. No YouTube Playables SDK integration, certification or publication is claimed. Integrate the official SDK only after confirming current developer access and platform requirements.

## License

See [LICENSE](./LICENSE). Third-party assets must have compatible licenses and attribution before inclusion.
