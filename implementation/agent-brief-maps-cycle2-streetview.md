# Agent Brief — Maps Lane (Cycle 2 Street View)

Owner: Maps lane

## Mission
Provide deterministic Street View metadata for the existing five rounds so the FE lane can render real panoramas.

## Files (owned)
- `src/types/game.ts`
- `src/data/mockRounds.ts`
- `src/utils/streetView.ts` (new)

## Tasks
1. Extend round schema in `src/types/game.ts`:
   - Add optional `panoramaId?: string`
   - Add optional `streetViewPov?: { heading: number; pitch: number }`
2. Update `src/data/mockRounds.ts`:
   - Keep same 5 landmarks and same `answer` values.
   - Add panorama metadata for each round:
     - `panoramaId` (preferred)
     - `streetViewPov` tuned for a recognizable landmark-facing view.
3. Add `src/utils/streetView.ts` helper:
   - Utility to normalize POV defaults and provide fallback if panoramaId is absent.
   - Keep helper pure TS (no React).
4. Keep existing scoring contract untouched.

## Verification
- `npx tsc --noEmit` (report only errors introduced by this lane)
- Confirm `MOCK_ROUNDS` still length 5 and locations unchanged.

## Closeout format
STATUS + files changed + verification result + blockers.
