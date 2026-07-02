# Geogame Work Pack — Wave 1 Cycle 7 (Map Interaction Modes)

Issued: 2026-07-02T14:35:00Z
Coordinator: Wave-1 Cycle-7 Coordinator

## Goal
Add selectable map interaction rules at game start and enforce them during rounds.

## Scope
- In scope:
  - Add three interaction options on landing screen.
  - Apply selected option to round Street View behavior.
  - Keep existing phases and scoring logic unchanged.
  - Maintain strict lane ownership across FE/BE/Maps.
- Out of scope:
  - New IPC channels.
  - Scoring changes.
  - Multiplayer or persistence.

## Canonical Contract (Cycle 7)

### Phases (unchanged)
`landing | round | roundResult | finalResults`

### IPC (unchanged)
- `maps:getApiKey`
- `maps:getApiDiagnostics`

### Map interaction options
- `moving` (Option 1):
  - Moving, panning, and zooming enabled.
- `noMoving` (Option 2):
  - Moving disabled.
  - Panning and zooming enabled.
- `lockedView` (Option 3):
  - Moving, panning, and zooming disabled.

### Round invariants
- `MOCK_ROUNDS.length === GAME_CONFIG.totalRounds`
- Last-round transition remains `roundIndex >= GAME_CONFIG.totalRounds - 1`

## Lane Ownership (strict)
- FE lane: `src/screens/*`, `src/components/*`, `src/hooks/*`
- BE lane: `electron/*`
- Maps lane: `src/data/*`, `src/utils/streetView.ts`, map rendering behavior in Street View component plumbing

## Acceptance Checks
1. Landing shows all three options and starts game with selected mode.
2. Round mode behavior:
   - Option 1: movement + pan + zoom work.
   - Option 2: movement blocked, pan + zoom work.
   - Option 3: movement, pan, and zoom all blocked.
3. Build passes (`npm run build`).
4. No phase regression in 10-round flow.

## Kickoff Reply Format
- assumptions
- first deliverable in progress
- blockers/mismatches (exact phase or payload example)
- STATUS: `DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED`

## Status
EXECUTING — cycle initialized with lane briefs and execution pack.
