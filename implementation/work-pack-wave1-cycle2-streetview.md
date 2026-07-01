# Geogame Work Pack — Wave 1 Cycle 2 (Street View)

Issued: 2026-06-30T20:08:00Z  
Coordinator: Wave-1 Coordinator

## Objective
Replace stock city background photos in round gameplay with real Google Street View panoramas for the same five landmark locations.

## Scope
- In scope:
  - Round gameplay backdrop changes from `<img src={round.imageUrl}>` to Google Street View panorama.
  - Keep existing round locations and scoring logic unchanged.
  - Keep game phases unchanged: `landing | round | roundResult | finalResults`.
  - Keep minimap/result map behavior as implemented in Cycle 1.
- Out of scope:
  - New rounds, multiplayer, backend persistence, leaderboards.
  - Full server-backed round data API.

## Canonical Contract Delta (Cycle 2)
- Data schema delta for rounds:
  - Add `panoramaId?: string`
  - Add `streetViewPov?: { heading: number; pitch: number }`
  - Keep `answer` as-is for scoring.
  - Keep `imageUrl` temporarily for landing thumbnails only (legacy fallback).
- Navigation contract for Street View controls:
  - `up`: step forward in panorama
  - `down`: step backward in panorama
  - `left`: rotate heading -25 degrees
  - `right`: rotate heading +25 degrees
  - `center`: reset POV to round default

## Lane Ownership
- FE lane:
  - `src/screens/RoundScreen.tsx`
  - `src/components/StreetViewPanel.tsx` (new)
  - `src/hooks/useGameState.ts` (directional navigation action)
  - `src/components/NavControls.tsx` wiring (if needed)
- Maps lane:
  - `src/data/mockRounds.ts` panorama metadata for each round
  - `src/types/game.ts` schema update
  - `src/utils/streetView.ts` (new helper for fallback/validation)
- BE lane:
  - `electron/main.js`, `electron/preload.js` hardening for maps key and optional diagnostics

## Required Verification (all lanes)
1. `landing -> round`: Street View panorama loads for round 1.
2. Round nav controls manipulate panorama (forward/back/left/right/reset).
3. Place pin + submit guess still transitions to `roundResult`.
4. `roundResult -> round`: new round loads new panorama.
5. Final round still reaches `finalResults`.

## Lane Kickoff Requirement
Each lane must reply with:
- assumptions
- first deliverable in progress
- blockers/mismatches with exact payload/phase example
- STATUS enum: `DONE | DONE_WITH_CONCERNS | NEEDS_CONTEXT | BLOCKED`

## Kickoff Deadline
2026-06-30T20:40:00Z
