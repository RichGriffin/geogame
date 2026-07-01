# Agent Brief — Maps Lane (Cycle 5 Urban Dataset)

Owner: Maps lane

## Mission
Produce and validate the 300-entry urban location dataset used by random Street View rounds.

## Files (owned)
- `src/data/urbanLocationPool.json`
- `src/data/mockRounds.ts` (dataset consumption only)

## Tasks
1. Expand `urbanLocationPool.json` to 300 entries with global urban coverage.
2. Keep schema strict for every row:
   - `city`, `country`, `lat`, `lng`.
3. Verify data hygiene:
   - no coordinate outliers,
   - no exact duplicate coordinate pairs,
   - broad regional spread.
4. Keep runtime compatibility:
   - random rounds continue using dataset-only selection.
   - preserve fallback compatibility in `StreetViewPanel`.

## Verification
- `npm run build`
- Manual smoke test:
  - start app in random mode,
  - run at least 5 full games and record fallback frequency,
  - report sample entries used during run.

## Closeout format
STATUS + files changed + verification result + blockers.
