# Geogame Work Pack — Wave 1 Cycle 4 (Random Street View Coordinates)

Issued: 2026-07-01T19:55:00Z
Coordinator: Wave-1 Coordinator

## Goal
Run an experiment pack where each round uses generated latitude/longitude coordinates to drive Street View location selection.

## Problem Statement
- Current rounds are static and curated.
- We need a fast way to pressure-test Street View recovery and round flow with unpredictable coordinates.
- Lane ownership drift has caused mixed responsibilities during prior cycles.

## Scope
- In scope:
  - RNG-based round coordinates for Street View position.
  - Feature toggle for enabling/disabling random Street View mode.
  - Coordinator enforcement of FE/BE/Maps lane boundaries.
- Out of scope:
  - New game modes, persistence, multiplayer, leaderboards.
  - Replacing scoring or game phase contracts.

## Canonical Contract (Cycle 4)
- Game phases unchanged: `landing | round | roundResult | finalResults`.
- Random mode keeps round schema compatible with existing UI:
  - `id`, `landmark`, `location`, `hint`, `answer`, `streetViewPov`, optional `panoramaId`.
- In random mode:
  1. Generate `answer` lat/lng within bounded ranges.
  2. Use generated coordinates as Street View lookup position.
  3. Keep fallback path (`coordinates -> imageFallback`) for unavailable panoramas.

## Team and Lane Ownership (strict)
- FE lane:
  - `src/screens/RoundScreen.tsx`
  - UX messaging for random mode and fallback visibility.
- BE lane:
  - `electron/main.js`
  - `electron/preload.js`
  - optional diagnostics exposure for random-mode state.
- Maps lane:
  - `src/data/mockRounds.ts`
  - `src/utils/streetView.ts`
  - random coordinate policy + normalization/fallback compatibility.

## Required Verification Matrix
1. `npm run build` succeeds.
2. Random mode ON:
   - round uses generated coordinates,
   - Street View attempts coordinate load,
   - round remains playable when Street View is unavailable.
3. Random mode OFF:
   - existing curated coordinates still load.
4. Core transitions still pass:
   - `landing -> round`
   - `round -> roundResult`
   - `roundResult -> round`
   - `round -> finalResults`

## Lane Kickoff Reply Format
- assumptions
- first deliverable in progress
- blockers/mismatches (exact example)
- STATUS: `DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED`

## Cycle Deadline
2026-07-01T21:00:00Z
