# Geogame Execution Pack — Wave 1 Cycle 7 (Map Interaction Modes)

Issued: 2026-07-02T14:38:00Z
Coordinator: Wave-1 Cycle-7 Coordinator

## Objective
Deliver selectable round interaction modes with no phase/IPC regressions.

## Locked Contracts
- Phases: `landing | round | roundResult | finalResults`
- IPC: `maps:getApiKey`, `maps:getApiDiagnostics`
- Round invariant: `MOCK_ROUNDS.length === GAME_CONFIG.totalRounds`

## Lane Team
- FE lane agent: landing selector + mode plumbing
- Maps lane agent: Street View mode enforcement
- BE lane agent: IPC/no-regression audit

## Current Execution Snapshot
- FE: selector + state plumbing implemented; kickoff STATUS `DONE_WITH_CONCERNS`
- Maps: Street View restrictions implemented; kickoff STATUS `DONE_WITH_CONCERNS`
- BE: no functional changes required; kickoff STATUS `DONE_WITH_CONCERNS`

## Verification Gate
1. `npm run build`
2. Option 1 manual smoke: move/pan/zoom all available.
3. Option 2 manual smoke: move blocked; pan/zoom available.
4. Option 3 manual smoke: move/pan/zoom blocked.
5. Confirm 10-round phase transitions still pass.

## Cycle Status
STARTED — kickoff complete across FE/BE/Maps, implementation integrated, build passing.
