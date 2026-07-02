# Agent Brief — FE Lane (Cycle 6 Ten-Round Integrity)

Owner: Frontend lane

## Mission
Verify and harden the renderer for a complete 10-round game session after Maps lane aligns round data length with `GAME_CONFIG.totalRounds`.

## Files (owned)
- `src/screens/LandingScreen.tsx`
- `src/screens/RoundScreen.tsx`
- `src/screens/RoundResultScreen.tsx`
- `src/screens/FinalResultsScreen.tsx`
- `src/components/RoundIndicator.tsx`
- `src/components/ResultStatsBar.tsx`
- `src/hooks/useGameState.ts` (only if round-index bug found)

## Tasks
1. Remove dead imports from `LandingScreen.tsx` (`LANDING_PANELS`, `MOCK_ROUNDS` if unused).
2. Play through a full 10-round game and confirm:
   - no crash on rounds 6–10,
   - `RoundIndicator` shows correct progress (1/10 through 10/10),
   - `FinalResultsScreen` lists 10 rows.
3. Confirm `RoundResultScreen` "Next Round" vs "See Results" logic at round 10 (`roundIndex >= totalRounds - 1`).
4. Report any UI overflow or layout issues with 10-segment `RoundIndicator`.
5. Do not edit `mockRounds.ts` or `urbanLocationPool.json`.

## Dependencies
- Blocked on Maps lane delivering `MOCK_ROUNDS.length === 10`.
- Can start immediately on LandingScreen cleanup and read-only audit.

## Verification
- `npm run build`
- Manual 10-round smoke test with random mode ON
- Screenshot or note for FinalResults 10-row table

## Closeout format
STATUS + files changed + verification result + blockers.
