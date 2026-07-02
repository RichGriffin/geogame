# Geogame Execution Pack — Wave 1 Cycle 6

Issued: 2026-07-02T14:10:00Z
Coordinator: Wave-1 Cycle-6 Coordinator

## Objective
Execute Cycle 6 with strict lane ownership and deliver reliable 10-round gameplay.

## Canonical Contracts (locked for this cycle)
- Phases: `landing | round | roundResult | finalResults`
- IPC channels: `maps:getApiKey`, `maps:getApiDiagnostics`
- Invariant: `MOCK_ROUNDS.length === GAME_CONFIG.totalRounds` (10)

## Lane-Scope Rules (non-negotiable)
- FE lane owns renderer/UI files only: `src/screens/*`, `src/components/*`, `src/hooks/*`
- BE lane owns Electron bridge only: `electron/*`
- Maps lane owns round data + street view policy: `src/data/*`, `src/utils/streetView.ts`
- Cross-lane work must be re-routed by coordinator before execution

## Execution Checklist

### FE lane
- Assumptions:
  - Maps lane will deliver 10-round data before full smoke pass.
- Completed deliverables:
  - Removed dead imports in `src/screens/LandingScreen.tsx`.
  - Verified round progression logic references `GAME_CONFIG.totalRounds` for round 10 transition behavior.
- Blockers/mismatches:
  - None after Maps lane fix.
- STATUS: `DONE`

### Maps lane
- Assumptions:
  - Random mode remains primary acceptance path for cycle completion.
- Completed deliverables:
  - Refactored `src/data/mockRounds.ts` to generate `GAME_CONFIG.totalRounds` rounds and reassign sequential IDs.
  - Random mode now emits N rounds from urban pool using existing jitter/POV + normalization behavior.
  - Static mode fallback implemented: repeat curated rounds in order until N is reached.
- Blockers/mismatches:
  - None reported.
- STATUS: `DONE`

### BE lane
- Assumptions:
  - Round sequencing remains renderer-owned.
- First deliverable in progress:
  - Validate IPC bridge stability on `maps:getApiKey` and `maps:getApiDiagnostics`.
- Blockers/mismatches:
  - None after canonical IPC alignment.
- STATUS: `DONE_WITH_CONCERNS`

## Verification Gate
1. `npm run build` (PASS)
2. Runtime check: `MOCK_ROUNDS.length === 10`
3. 10-round phase flow pass:
   - `landing -> round`
   - `round -> roundResult`
   - `roundResult -> round` (x9)
   - `round -> finalResults` (after round 10)
4. `FinalResultsScreen` shows 10 rows
5. `RoundIndicator` advances through 10 segments

## Current Cycle State
- Implementation lanes: complete
- Remaining: full manual 10-round integration smoke to lock phase-flow evidence

## Sync Cadence
- Next sync deadline: `2026-07-03T18:00:00Z`
- Required lane update fields: assumptions, first deliverable in progress, blockers/mismatches (exact example), STATUS
