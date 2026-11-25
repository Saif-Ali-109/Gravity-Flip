# Gameplay Mechanics

## Gravity directions
| Input | Gravity vector | Tangent |
|---|---|---|
| Down | (0, 1) | (-1, 0) |
| Up | (0, -1) | (1, 0) |
| Left | (-1, 0) | (0, 1) |
| Right | (1, 0) | (0, -1) |

The tangent convention defines positive movement. UI arrows should make the resulting direction intuitive; if necessary, use explicit world-left/world-right controls instead of tangent-relative controls after playtesting.

## Player
- A compact, rounded cartoon character with a clear face and readable orientation.
- Dynamic physics body with tuned acceleration, max speed, drag, and collision shape.
- Initial movement uses two buttons along the tangent axis.
- Player should not rotate in a way that makes controls or collision unclear.

## Surfaces
- Solid static platforms collide from all directions.
- The player may stand on any side when gravity pulls toward that surface.
- Platforms should have enough thickness to avoid tunneling at expected speeds.

## Collectibles
- Energy orb is optional.
- Collection increments the level collectible count and provides immediate visual/audio feedback.
- The exit remains usable even if optional orbs are missed, unless a later level explicitly introduces a key requirement.

## Hazards
- Spikes or energy barriers reset the current level.
- Hazard collision should have a short, readable feedback effect.
- Avoid unavoidable spawn-to-hazard collisions.

## Exit
- Clearly marked portal.
- Overlap triggers level completion once.
- Completion freezes gameplay and displays a clear next/retry action.

## Reset
- Restart returns player, collectibles, hazards, gravity direction, and level state to a deterministic initial state.
- Reset must not duplicate event listeners or objects.

## Future mechanics (not Phase 1)
- Moving platforms.
- Gravity-locked surfaces.
- One-way platforms.
- Switches and doors.
- Rotating hazards.
- Checkpoints.
