# Manual Test Plan — Phase 1

## Setup
1. Run `npm install`.
2. Run `npm run dev`.
3. Test in a desktop browser and a touch-capable mobile browser.

## Functional checks
- [ ] Game loads without console errors.
- [ ] Down gravity pulls player downward.
- [ ] Up gravity pulls player upward.
- [ ] Left gravity pulls player left.
- [ ] Right gravity pulls player right.
- [ ] Gravity direction label updates.
- [ ] Player collides with each platform side.
- [ ] Movement follows the documented tangent direction.
- [ ] Touching a collectible removes it and increments the counter.
- [ ] Touching a hazard restarts the level.
- [ ] Reaching the exit completes the level.
- [ ] R restarts the level.

## Input checks
- [ ] Gravity buttons respond to mouse click.
- [ ] Gravity buttons respond to touch.
- [ ] Movement buttons respond to press and release.
- [ ] Keyboard movement works.
- [ ] Keyboard gravity shortcuts work.

## Regression checks
- [ ] Repeated restarts do not multiply event handlers.
- [ ] Switching gravity repeatedly does not cause unbounded velocity.
- [ ] Player cannot become trapped outside the room.
- [ ] All buttons remain visible at supported viewport sizes.

## Known limitations to resolve
- Tangent-relative movement mapping needs usability verification for all four gravity directions.
- Current level is a physics test room, not a tuned puzzle.
- Visuals are geometric placeholders.
- Responsive mobile control placement needs a dedicated pass.
