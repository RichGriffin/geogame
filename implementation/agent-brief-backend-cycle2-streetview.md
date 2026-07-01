# Agent Brief — BE Lane (Cycle 2 Street View)

Owner: Backend lane (Electron main/preload)

## Mission
Harden main/preload map key bridge for Street View usage and provide minimal diagnostics without exposing secrets.

## Files (owned)
- `electron/main.js`
- `electron/preload.js`

## Tasks
1. Keep `maps:getApiKey` contract stable and ensure it always returns string.
2. Add non-secret diagnostics channel for renderer debug:
   - `maps:getApiDiagnostics` -> `{ hasKey: boolean, keyLength: number }`
   - Never return actual key value in diagnostics.
3. Expose diagnostics in preload as:
   - `window.electronAPI.getMapsDiagnostics(): Promise<{ hasKey: boolean; keyLength: number }>`
4. Keep existing security settings (`contextIsolation: true`, `nodeIntegration: false`).

## Verification
- `npm run dev`
- In DevTools console:
  - `window.electronAPI.mapsApiKey` returns non-empty when configured
  - `await window.electronAPI.getMapsDiagnostics()` returns object with expected flags

## Closeout format
STATUS + files changed + verification result + blockers.
