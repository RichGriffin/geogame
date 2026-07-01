# Geogame Work Pack — Wave 1 Cycle 3 (Map Recovery)

Issued: 2026-06-30T20:22:00Z
Coordinator: Wave-1 Coordinator

## Goal
Fix the currently broken round map experience by making Street View resilient:
- reliable panorama load,
- clear failure diagnostics,
- graceful fallback so gameplay is never blocked.

## Current Problem Statement
- Round backdrop can fail to render usable Street View.
- Failure state currently degrades into a dark/blocked panel with poor recoverability.
- Navigation and round flow should continue even if Street View data is unavailable for a location.

## Scope
- In scope:
  - Street View load/error handling and fallback path.
  - Round data hygiene for panorama metadata.
  - Main/preload diagnostics for key/status checks.
  - End-to-end verification of round flow with and without successful Street View.
- Out of scope:
  - New game modes, new rounds, backend persistence, scoring changes.

## Canonical Contract (Cycle 3)
- Game phases remain unchanged: `landing | round | roundResult | finalResults`.
- Round schema remains compatible with Cycle 2:
  - `panoramaId?: string`
  - `streetViewPov?: { heading: number; pitch: number }`
- Fallback contract for round backdrop:
  1. Try panorama by `panoramaId` if provided.
  2. If unavailable, try Street View by `answer` coordinates.
  3. If Street View still unavailable, fallback to `imageUrl` stock image.
  4. User must still be able to place pin and submit guess in all cases.

## Team and Lane Ownership
- FE lane:
  - `src/components/StreetViewPanel.tsx`
  - `src/screens/RoundScreen.tsx`
  - UI fallback handling and navigation resilience
- Maps lane:
  - `src/data/mockRounds.ts`
  - `src/utils/streetView.ts`
  - panorama metadata cleanup and fallback policy
- BE lane:
  - `electron/main.js`
  - `electron/preload.js`
  - non-secret diagnostics hardening for maps status
- QA lane:
  - validation matrix and evidence capture across all four core flows

## Required Verification Matrix
1. **Happy path**: Street View loads, nav works, pin/submit works.
2. **Panorama ID failure**: coordinate fallback works.
3. **Street View unavailable**: stock image fallback works and round remains playable.
4. **Round transitions**:
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
2026-06-30T21:10:00Z
