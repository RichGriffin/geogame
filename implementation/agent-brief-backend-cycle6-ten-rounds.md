# Agent Brief — BE Lane (Cycle 6 Ten-Round Integrity)

Owner: Backend lane

## Mission
Confirm Electron main/preload IPC surfaces remain stable while round count increases from 5 to 10. No schema changes expected.
Canonical runtime channels for this cycle: `maps:getApiKey`, `maps:getApiDiagnostics`.

## Files (owned)
- `electron/main.js`
- `electron/preload.js`

## Tasks
1. Audit IPC handlers — confirm no hardcoded round count of 5 anywhere in main/preload.
2. Confirm `maps:getApiKey` bridge unchanged; renderer still reads `window.electronAPI.mapsApiKey`.
3. Optional: add startup log showing `GAME_CONFIG.totalRounds` is not applicable in main process (round count is renderer-side) — only if useful for debugging.
4. Do not modify round data generation (`src/data/*` is Maps lane).

## Dependencies
- None for audit work; integration verification after Maps + FE deliver.

## Verification
- `npm run build`
- `npm run dev` — confirm app launches, Street View loads on round 1
- DevTools: `window.electronAPI.mapsApiKey` returns non-empty string

## Closeout format
STATUS + files changed (or "no changes") + verification result + blockers.
