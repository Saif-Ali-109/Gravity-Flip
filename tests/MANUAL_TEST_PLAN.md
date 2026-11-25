# Manual Test Plan

## Setup
1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Run `npm run dev` and open the local URL.

## Desktop
- [ ] Game fits the browser window without page scrolling.
- [ ] A/D and left/right arrows move the player.
- [ ] W, S, Q and E switch gravity up, down, left and right.
- [ ] Gravity switching preserves tangent momentum without launching the player.
- [ ] Player collides with all platforms in all four gravity directions.
- [ ] Collecting each orb updates the energy counter once.
- [ ] Touching the pink hazard restarts the room.
- [ ] Touching the green exit completes the room even if orbs remain.
- [ ] R restarts both an active and completed room.

## Touch
- [ ] Gravity buttons respond to taps.
- [ ] Movement buttons respond while held.
- [ ] Releasing a movement button or moving the pointer away stops movement.
- [ ] Two-finger input can move and switch gravity without stuck controls.

## Responsive
- [ ] Test landscape phone and tablet sizes.
- [ ] Confirm all gravity and movement buttons remain visible.
- [ ] Confirm browser back/navigation remains available.

## Automated checks
- `npm run typecheck`
- `npm test`
- `npm run build`
