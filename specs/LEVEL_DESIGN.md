# Level Design

## Level format
Levels should be data-driven rather than hard-coded into scene logic. Each level definition should describe:
- Logical dimensions.
- Player spawn.
- Initial gravity direction.
- Platform rectangles.
- Hazard rectangles.
- Collectible positions.
- Exit rectangle.
- Optional tutorial prompt and mechanic flags.

## Teaching progression
1. Level 1: walk, jump is not required, reach a nearby exit.
2. Level 2: switch Down ↔ Up to reach a ceiling route.
3. Level 3: introduce Left/Right gravity on wall surfaces.
4. Level 4: combine gravity switching and movement around a simple obstacle.
5. Level 5: introduce optional collectibles and a safe retry loop.

## Difficulty rules
- Introduce one new mechanic at a time.
- Never require an unintroduced mechanic without visual teaching.
- Keep a safe area around spawn and exit.
- Make hazards visible before the player can collide with them.
- Test each level from a clean start and after restart.

## Initial prototype room
One room only. It should demonstrate all four gravity buttons, basic movement, at least one collectible, one hazard, solid platforms, and an exit. The prototype room is a mechanics test, not a polished tutorial level.

## Content target
Proposed initial content: 30 levels in three worlds. This is a planning target and may change after playtesting.
