# Agent Brief — QA Lane (Cycle 3 Map Recovery)

Owner: QA/Integration lane

## Mission
Prove the map-recovery pack is stable across success and failure paths with evidence.

## Test Matrix
1. Valid Street View path:
   - Round loads panorama.
   - Nav controls work.
   - Pin placement and submit work.
2. Panorama ID failure path:
   - Coordinate fallback engages.
   - Round remains playable.
3. Street View unavailable path:
   - Fallback stock image engages.
   - Round remains playable.
4. Full phase continuity:
   - `landing -> round -> roundResult -> round -> finalResults`

## Evidence Required
- brief notes per scenario (pass/fail)
- screenshots or log snippets for failures
- blockers with exact repro steps

## Verification Commands
- `npm run build`
- `npm run dev`
- manual flow walkthrough in Electron

## Closeout format
STATUS + scenarios run + pass/fail summary + blockers.
