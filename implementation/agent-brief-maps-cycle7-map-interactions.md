# Agent Brief — Maps Lane (Cycle 7 Map Interaction Modes)

Owner: Maps lane

## Mission
Enforce interaction-mode behavior in Street View rendering/navigation.

## Files (owned)
- `src/components/StreetViewPanel.tsx`
- `src/utils/streetView.ts` (if needed)
- `src/data/*` (read-only unless required)

## Tasks
1. Implement mode enforcement in Street View:
   - Option 1 (`moving`): moving + panning + zooming enabled.
   - Option 2 (`noMoving`): moving disabled; panning + zooming enabled.
   - Option 3 (`lockedView`): moving + panning + zooming disabled.
2. Keep fallback behavior intact when Street View is unavailable.
3. Keep round schema and IPC unchanged.

## Verification
- `npm run build`
- Manual round smoke for all three options.

## Closeout format
STATUS + files changed + verification result + blockers.
