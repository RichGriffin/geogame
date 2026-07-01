# Agent Brief — Maps Lane (Cycle 3 Map Recovery)

Owner: Maps lane

## Mission
Stabilize round panorama metadata and ensure fallback strategy is deterministic for all existing locations.

## Files (owned)
- `src/data/mockRounds.ts`
- `src/utils/streetView.ts`
- `src/types/game.ts` (only if type additions are required)

## Tasks
1. Validate each round's Street View metadata:
   - Ensure `panoramaId` values are non-empty and normalized.
   - For unreliable IDs, remove invalid ID and rely on coordinate fallback.
2. Strengthen helper policy in `streetView.ts`:
   - Add explicit fallback resolver output:
     - `primary: panoramaId | coordinates`
     - `secondary: coordinates | imageFallback`
   - Normalize POV safely (heading wrap, pitch clamp).
3. Keep compatibility:
   - Preserve same 5 rounds, same landmark names, same `answer` coordinates.
   - Preserve existing scoring and round flow contracts.

## Verification
- `npx tsc --noEmit` (report pre-existing vs introduced issues)
- Confirm all rounds produce deterministic resolved street-view config.

## Closeout format
STATUS + files changed + verification result + blockers.
