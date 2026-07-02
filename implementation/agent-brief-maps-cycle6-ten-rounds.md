# Agent Brief — Maps Lane (Cycle 6 Ten-Round Integrity)

Owner: Maps lane

## Mission
Refactor round generation so `MOCK_ROUNDS` always contains exactly `GAME_CONFIG.totalRounds` entries, sourced from the urban location pool in random mode.

## Files (owned)
- `src/data/mockRounds.ts`
- `src/data/urbanLocationPool.json` (stretch: expand toward 300)
- `src/utils/streetView.ts`

## Tasks
1. Import `GAME_CONFIG.totalRounds` in `mockRounds.ts`.
2. Replace fixed 5-round seed array as the round-count source of truth.
   - Random mode ON: generate N rounds (N = `totalRounds`) from `urbanLocationPool.json`.
   - Each round: random urban pick, jitter, POV, normalize via `normalizeStreetViewRoundInput`.
   - Assign sequential `id` 1..N.
3. Static mode (`VITE_RANDOM_STREET_VIEW=0`):
   - Propose to coordinator: repeat curated rounds, expand curated set, or hybrid.
   - Implement approved approach.
4. Keep `LANDING_PANELS` export valid or remove if FE lane drops usage.
5. Stretch: add urban pool entries toward 300 (Cycle 5 carryover).

## Contract requirements
```
MOCK_ROUNDS.length === GAME_CONFIG.totalRounds  // must be 10
```
Round schema unchanged. No IPC changes.

## Verification
- `npm run build`
- Node/script or DevTools check: `MOCK_ROUNDS.length === 10`
- Manual smoke: play rounds 1, 5, 6, and 10 — Street View loads or falls back gracefully
- Confirm no duplicate-coordinate policy decision documented if implemented

## Closeout format
STATUS + files changed + verification result + blockers + static-mode decision if applicable.
