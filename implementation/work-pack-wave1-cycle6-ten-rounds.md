# Geogame Work Pack — Wave 1 Cycle 6 (10-Round Game Integrity)

Issued: 2026-07-02T12:00:00Z
Coordinator: Wave-1 Cycle-6 Coordinator

## Goal
Make the full 10-round game playable end-to-end by aligning round data generation with `GAME_CONFIG.totalRounds`.

## Problem Statement
- `GAME_CONFIG.totalRounds` was changed to 10 on branch `featureaddrounds`.
- `MOCK_ROUNDS` is still built from 5 static `RAW_MOCK_ROUNDS` seeds.
- UI components (`RoundIndicator`, `ResultStatsBar`, `LandingScreen`) already display 10 rounds.
- Game logic indexes `MOCK_ROUNDS[state.roundIndex]` — rounds 6–10 will be `undefined` and crash gameplay.

## Scope
- In scope:
  - Generate exactly `GAME_CONFIG.totalRounds` rounds at module init.
  - Random mode: each round picks from `urbanLocationPool.json` with jitter (existing policy).
  - Static mode (`VITE_RANDOM_STREET_VIEW=0`): preserve curated-round behaviour or document fallback.
  - Verify all four core phase flows for a complete 10-round session.
  - FE cleanup of dead imports on `LandingScreen.tsx`.
- Out of scope:
  - Scoring algorithm changes.
  - New IPC channels or game phases.
  - Multiplayer, persistence, leaderboards.
- Stretch (Maps lane, if primary work completes early):
  - Continue expanding `urbanLocationPool.json` toward 300 entries.

## Canonical Contract Delta (Cycle 6)

### Round count invariant
```
MOCK_ROUNDS.length === GAME_CONFIG.totalRounds
```
Currently: `totalRounds = 10`.

### Round generation (random mode ON)
1. At module load, build N rounds where N = `GAME_CONFIG.totalRounds`.
2. Each round selects a random entry from `urbanLocationPool.json`.
3. Apply existing jitter (±0.06°), POV randomization, and `normalizeStreetViewRoundInput`.
4. Round `id` is 1-based index (1..N).
5. `landmark`, `location`, `hint`, `answer` derived from urban entry (existing pattern).

### Round generation (static mode OFF random)
- When `VITE_RANDOM_STREET_VIEW=0`, use curated rounds.
- If fewer curated rounds exist than `totalRounds`, Maps lane must either:
  a) expand curated set to match, or
  b) document and implement explicit fallback (repeat or generate from pool).
- Coordinator must approve chosen approach before implementation.

### Unchanged
- Game phases: `landing | round | roundResult | finalResults`
- Round schema: `id`, `landmark`, `location`, `hint`, `answer`, `streetViewPov`, optional `panoramaId`, legacy `imageUrl`/`thumbnailUrl`
- IPC channels unchanged (`maps:getApiKey`, `maps:getApiDiagnostics`)
- Scoring unchanged

## Team and Lane Ownership (strict)

### Maps lane (primary owner)
- `src/data/mockRounds.ts` — refactor round generation to use `GAME_CONFIG.totalRounds`
- `src/data/urbanLocationPool.json` — stretch: expand toward 300 entries
- `src/utils/streetView.ts` — no schema changes expected

### FE lane
- `src/screens/LandingScreen.tsx` — remove unused imports (`LANDING_PANELS`, `MOCK_ROUNDS`)
- `src/screens/RoundScreen.tsx`, `src/screens/FinalResultsScreen.tsx` — verify 10-round UX
- `src/components/RoundIndicator.tsx`, `src/components/ResultStatsBar.tsx` — confirm no regressions
- `src/hooks/useGameState.ts` — read-only verification unless round-index bug found

### BE lane
- No functional changes expected.
- Confirm IPC bridge and API key path unchanged.
- Optional: log round count diagnostic at startup if useful for integration testing.

## Required Verification Matrix
1. `npm run build` succeeds.
2. `MOCK_ROUNDS.length === 10` at runtime.
3. Full game playthrough (10 rounds):
   - `landing -> round` (round 1 loads Street View)
   - `round -> roundResult` (each round)
   - `roundResult -> round` (rounds 2–10)
   - `round -> finalResults` (after round 10)
4. `FinalResultsScreen` shows 10 outcome rows.
5. `RoundIndicator` renders 10 segments; active segment advances correctly.
6. No console errors referencing undefined round data at any round index 0–9.
7. Random mode ON: rounds use urban pool coordinates.
8. Core Street View fallback still works when panorama unavailable.

## Lane Kickoff Reply Format
- assumptions
- first deliverable in progress
- blockers/mismatches (exact example)
- STATUS: `DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED`

## Cycle 6 Execution Pack (Coordinator-Approved)

Decision: canonical IPC list is updated to match current implementation, no adapter handlers in Cycle 6.

Rationale:
- This cycle's primary risk is 10-round data integrity, not IPC feature expansion.
- Existing renderer/main integration depends only on API-key bridge channels.
- Adding adapter channels now would increase integration scope and regression risk.

Canonical IPC (effective this cycle):
- `maps:getApiKey`
- `maps:getApiDiagnostics`

Lane execution (strict ownership):
- FE lane:
  - completed deliverable: `LandingScreen.tsx` dead-import cleanup and round-10 logic audit on `RoundResultScreen`, `ResultStatsBar`, `RoundIndicator`, `FinalResultsScreen`, `useGameState`.
  - blockers: none reported.
  - STATUS: `DONE`
- Maps lane:
  - completed deliverable: `mockRounds.ts` refactor now generates exactly `GAME_CONFIG.totalRounds` rounds and preserves normalization pipeline.
  - static-mode decision implemented: repeat curated rounds in order until `totalRounds` is reached.
  - blockers: none reported.
  - STATUS: `DONE`
- BE lane:
  - deliverable in progress: Electron IPC audit for channel stability and round-count neutrality.
  - blockers: none for audit; contract was mismatched before this update and is now aligned.
  - STATUS: `DONE_WITH_CONCERNS`

Execution rule:
- Keep agents in-lane only (`src/screens|components|hooks` for FE, `electron/*` for BE, `src/data/*` + `src/utils/streetView.ts` for Maps).
- Any cross-lane task must be re-routed by coordinator in the same sync cycle.

## Cycle Deadline
2026-07-03T18:00:00Z

## Status
EXECUTING — lane implementation complete; final manual 10-round integration smoke pending
