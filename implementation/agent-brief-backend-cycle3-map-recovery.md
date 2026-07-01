# Agent Brief — BE Lane (Cycle 3 Map Recovery)

Owner: Backend lane (Electron main/preload)

## Mission
Provide stronger non-secret diagnostics to quickly identify map breakage causes (missing key, empty key, renderer visibility).

## Files (owned)
- `electron/main.js`
- `electron/preload.js`
- `src/vite-env.d.ts` (for exposed diagnostics typing)

## Tasks
1. Keep existing stable channels:
   - `maps:getApiKey` (unchanged behavior)
   - `maps:getApiDiagnostics` (existing, non-secret)
2. Extend diagnostics payload (still non-secret):
   - `hasKey: boolean`
   - `keyLength: number`
   - `keyPrefix: string` (first 6 chars only, mask rest)
   - `source: 'env' | 'missing'`
3. Expose diagnostics in preload:
   - `window.electronAPI.getMapsDiagnostics(): Promise<...>`
4. Ensure no secret leakage:
   - never expose full API key through diagnostics.

## Verification
- `npm run build`
- Runtime check in Electron DevTools:
  - `window.electronAPI.mapsApiKey` exists as string
  - `await window.electronAPI.getMapsDiagnostics()` returns safe payload

## Closeout format
STATUS + files changed + verification result + blockers.
