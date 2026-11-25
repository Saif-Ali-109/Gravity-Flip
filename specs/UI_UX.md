# UI / UX Specification

## Visual style
- Friendly 2D cartoon style.
- Bright player character against calm, darker or pastel environments.
- Rounded platforms and high-contrast hazards.
- Consistent iconography and typography.
- No third-party copyrighted characters, logos, or copied level layouts.

## Gameplay HUD
- Level indicator.
- Collectible counter.
- Four gravity direction buttons arranged as a directional pad.
- Two movement buttons.
- Pause button (later phase).
- Short contextual instruction where needed.

## Button behavior
Each button needs idle, pressed, selected (gravity only), disabled, and keyboard-focus states. Touch targets should be comfortably large and separated to reduce accidental taps.

## Screen layout
- Logical reference size 960 × 600.
- Keep gameplay area clear of control overlays.
- On landscape mobile, controls should sit near lower corners with gravity pad on the right.
- On portrait mobile, use a responsive arrangement and verify that the playfield remains usable.
- Avoid relying on hover.

## Feedback
- Gravity change: directional highlight and brief transition cue.
- Collectible: pop/particle and counter update.
- Hazard: short impact feedback and reset.
- Completion: portal animation and clear completion panel.

## Menus
Future: title screen, level select, pause menu, settings (sound, haptics where supported), and completion screen.
