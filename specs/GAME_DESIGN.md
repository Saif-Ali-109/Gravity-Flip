# Game Design Document

## Product
**Title:** Gravity Flip (working title)  
**Genre:** 2D physics puzzle platformer  
**Platform target:** YouTube Playables (HTML5), with browser-based local development  
**Art direction:** Bright, friendly 2D cartoon; clean silhouettes; readable hazards; restrained effects.

## High concept
Guide a small character through compact puzzle rooms by changing the direction of gravity. Collect energy orbs, avoid hazards, use surfaces as routes, and reach the exit portal.

## Design pillars
1. **One-glance readability:** The player, safe surfaces, hazards, collectibles, and exit must be distinguishable immediately.
2. **Deliberate choices:** Each gravity change should help solve a spatial problem.
3. **Short satisfying levels:** A room should be understandable quickly and take roughly 20–90 seconds on an initial attempt.
4. **Fair physics:** Inputs are predictable; deaths are explainable; restart is immediate.
5. **Touch-first:** Core play must work with large, reachable buttons and no keyboard requirement.

## Target audience
Casual players who enjoy short arcade and puzzle experiences. The game should be understandable without a long tutorial.

## Core loop
Enter room → inspect route → choose gravity → move along a surface → collect optional energy → avoid hazards → reach exit → receive completion feedback → next room.

## Controls
- Four dedicated gravity buttons: Up, Down, Left, Right.
- Two movement buttons: Move negative / Move positive along the current gravity-relative tangent.
- Keyboard fallback for desktop testing.
- Buttons must provide pressed, selected, disabled, and focus states.

## Core rules
- Exactly one global gravity direction is active at a time.
- Gravity acts on the player and any explicitly gravity-affected dynamic object.
- Static platforms collide from all sides.
- Movement is constrained to the axis tangent to gravity for the initial prototype.
- Hazards reset the current room.
- Energy orbs are optional collectibles.
- Exit completes the room only when the player overlaps its trigger.

## Progression
Initial release target: 30 carefully authored levels across three themed worlds. The first prototype contains one test room only. Do not represent the 30-level target as already implemented.

## Accessibility and usability
- No color-only communication: use shape, icon, and label in addition to color.
- Large touch targets and clear contrast.
- Audio is optional and never required to understand the game.
- Respect reduced-motion preferences where practical.
- Provide pause/restart and a clear way to resume.

## Monetization
No monetization is included in the prototype. Any future ads, rewards, purchases, or platform features must follow YouTube Playables policies and be reviewed separately.

## Success criteria
- New players understand the four gravity controls within the first tutorial room.
- Restart is immediate and reliable.
- Levels have no unavoidable hazards or soft locks.
- Gameplay remains responsive on supported mobile devices.
