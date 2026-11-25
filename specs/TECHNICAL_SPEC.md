# Technical Specification

## Stack
- Phaser 3 for rendering, input, scenes, and Arcade Physics.
- TypeScript with strict compiler settings.
- Vite for local development and production bundling.
- HTML5 Canvas/WebGL selected by Phaser.AUTO.
- Web Audio/Phaser audio for later sound implementation.

## Runtime architecture
- `main.ts`: Phaser configuration and scene registration.
- `scenes/`: boot/menu/gameplay scenes.
- `entities/`: player, platforms, hazards, collectibles, exit.
- `physics/`: gravity direction and gravity-relative movement helpers.
- `systems/`: level loading, score, progression, persistence adapters.
- `specs/`: product and engineering source of truth.

## Coordinate model
Screen coordinates: +X points right and +Y points down. Gravity direction is a unit vector:
- down = (0, 1)
- up = (0, -1)
- left = (-1, 0)
- right = (1, 0)

For gravity vector g = (gx, gy), define a tangent t = (-gy, gx). The movement input scalar m is -1, 0, or +1. Initial tangential velocity is v = t * m * moveSpeed. Gravity acceleration is a = g * gravityStrength.

## Physics
Use Phaser Arcade Physics for the initial prototype. Platforms are static bodies. Player is a dynamic body. Static collision must work on all four sides. Keep the player's world-bound behavior configurable; screen-edge clamping must not unintentionally prevent gravity-direction puzzles. Prefer authored boundary platforms or explicit room bounds.

## Gravity switching
Changing direction updates the world's gravity vector. Preserve or deliberately project existing velocity; this choice must be consistent and play-tested. Initial prototype may reset velocity along the new gravity axis to avoid extreme accumulated impulses, but should preserve tangent momentum where possible.

## Input
- Pointer/touch buttons for four gravity directions.
- Pointer/touch hold buttons for movement.
- Keyboard fallback for desktop development.
- Prevent browser page scrolling/zooming over the game surface where appropriate, without breaking accessibility or browser navigation.

## Rendering and scaling
- Logical design resolution: 960 × 600.
- Phaser Scale.FIT and CENTER_BOTH for initial development.
- All interactive controls must remain visible and usable on narrow portrait screens. A responsive layout pass is required before platform submission.
- Use vector shapes or original/licensed assets; do not copy copyrighted characters or art.

## Performance
- Avoid per-frame object creation.
- Reuse textures and effects.
- Keep physics body counts modest.
- Target smooth gameplay on mid-range mobile devices; establish measured budgets during device testing.

## Persistence
Phase 1: no durable save requirement.
Later: define a storage adapter and integrate the official Playables cloud-save API only after confirming current SDK docs and access. Local fallback must not falsely claim cloud synchronization.

## Testing
- TypeScript typecheck and production build on every change.
- Unit tests for gravity vectors and tangent mapping.
- Manual matrix for all gravity directions, collisions, reset, touch and keyboard.
- Device testing on multiple viewport sizes and orientation changes.
