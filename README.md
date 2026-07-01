# GeoQuest

Desktop geography guessing game prototype built with Electron, React, and Tailwind.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Screens

- **Landing** — title, round previews, Play button
- **Round** — street photo, timer, hint, nav controls, mini-map pin placement
- **Round Result** — map with answer/guess markers, distance, score
- **Final Results** — total score and round breakdown

All location data is in `src/data/mockRounds.ts`.

## Scoring

Score is based on the great-circle distance between the guess and the actual location, using the Haversine formula (`src/utils/distance.ts`).

```
score = round(maxPointsPerRound × max(0, 1 - distanceKm / maxDistanceKm))
```

Config values live in `src/data/gameConfig.ts`:

| Constant | Value |
|---|---|
| `maxPointsPerRound` | 5000 |
| `maxDistanceKm` | 20000 |
| `totalRounds` | 5 |
| `roundDurationSec` | 120 |

Decay is linear, not exponential — every km off costs the same amount of score no matter how close or far you already are. Since `maxDistanceKm` (20,000 km) is close to the antipodal distance on Earth, most guesses land well above zero:

| Distance | Score |
|---|---|
| 0 km (exact) | 5000 |
| 100 km | ~4975 |
| 1,000 km | ~4750 |
| 5,000 km | ~3750 |
| 10,000 km | ~2500 |
| 20,000 km+ | 0 |

Ratings (`ratingFromScore` in `src/utils/scoring.ts`) are flat thresholds against the 5000 max:

- **Excellent** — 4000+
- **Great** — 2500+
- **Good** — 1000+
- **Keep trying** — below 1000

> **Note:** Because decay is linear over such a large max distance, guesses within the right continent score close to max. For sharper separation between near-misses and far-misses, consider a smaller `maxDistanceKm` or switching to exponential decay.
