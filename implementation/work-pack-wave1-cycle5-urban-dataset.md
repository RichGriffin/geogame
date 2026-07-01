# Geogame Work Pack — Wave 1 Cycle 5 (300 Urban Location Dataset)

Issued: 2026-07-01T20:00:00Z
Coordinator: Wave-1 Coordinator

## Goal
Build and validate a curated dataset of 300 urban locations (towns/cities only) for random Street View rounds.

## Problem Statement
- Random worldwide coordinate generation causes frequent Street View misses.
- We need a controlled source of urban coordinates with broad global coverage.
- Dataset quality now directly controls gameplay quality.

## Scope
- In scope:
  - Create `src/data/urbanLocationPool.json` with 300 validated urban entries.
  - Ensure each entry includes: `city`, `country`, `lat`, `lng`.
  - Wire random round selection to this dataset only.
  - Define validation checks (duplicates, coordinate bounds, regional spread).
- Out of scope:
  - Multiplayer, persistence, leaderboards, new game modes.
  - Scoring algorithm changes.

## Dataset Contract
- File: `src/data/urbanLocationPool.json`
- Entry schema:
  - `city: string`
  - `country: string`
  - `lat: number`
  - `lng: number`
- Quality bars:
  1. 300 entries total.
  2. Coordinates are in populated urban zones.
  3. Global spread across Americas, Europe, Africa, Middle East, Asia, Oceania.
  4. No malformed coordinates or duplicate exact coordinate pairs.

## Team and Lane Ownership (strict)
- Maps lane:
  - `src/data/urbanLocationPool.json`
  - `src/data/mockRounds.ts` randomization policy
  - validation notes for coverage and quality.
- FE lane:
  - no dataset editing; consumes randomized rounds only.
- BE lane:
  - no dataset editing; optional diagnostics if needed.

## Required Verification
1. `npm run build` succeeds.
2. Random mode ON (`VITE_RANDOM_STREET_VIEW !== '0'`):
   - rounds pick locations from dataset entries.
   - Street View unavailable fallback rate is materially reduced.
3. Spot-check at least 20 random entries for Street View availability evidence.
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
2026-07-02T18:00:00Z
