# AI Developer Guide: City Battle Video Generator

This project is a high-performance video generator built with **Remotion**, designed to create engaging "Battle of Cities" videos for social media (Shorts, Reels, TikTok).

## Tech Stack
- **Framework**: [Remotion](https://www.remotion.dev/) (React + TypeScript)
- **Styling**: Tailwind CSS 4.0
- **Runtime**: Node.js

## Project Structure
- `src/Root.tsx`: The orchestrator and entry point. All video compositions (Battles and Championships) are registered here.
- `src/BattleVideo.tsx`: The main video logic for 1v1 city battles.
- `src/ChampionshipVideo.tsx`: The engine for multi-city championships, including leaderboards and champion reveal.
- `src/components/`: Modular UI components.
    - `BattleIntro.tsx`, `BattleRound.tsx`, `BattleWinner.tsx`: 1v1 battle UI.
    - `ChampionshipComponents.tsx`: Specialized UI for championships (Opening, Leaderboard, Confetti).
- `src/data/`: JSON files containing battle-specific data.
- `src/data/championships/`: JSON files configuring multi-city championships.
- `src/utils/ChampionshipManager.ts`: Logic for calculating matches, scores, and standings.
- `public/`: Static assets (city photos, background music).

## Data Schema (`src/data/*.json`)
When creating a new battle (e.g., for US cities), follow this JSON structure:

```json
{
  "matchId": "unique-id",
  "title": "City A vs City B",
  "theme": "Urban Showdown",
  "cities": [
    {
      "name": "New York",
      "state": "NY",
      "nickname": "The Big Apple",
      "data": {
        "population": 8336000,
        "areaKm2": 783.8,
        "gdpPerCapita": 120000,
        "hospitalBedsPerThousand": 3.2,
        "idh": 0.950,
        "higherEducationPct": 45.0
      },
      "visual": {
        "primaryColor": "#1a1a1a",
        "secondaryColor": "#ffffff",
        "image": "new-york.jpg"
      }
    },
    ...
  ],
  "rounds": [
    {
      "id": "population",
      "title": "POPULATION",
      "type": "bar",
      "unit": "hab",
      "field": "population",
      "format": "compact"
    }
    ...
  ]
}
```

### Supported Formats
- `compact`: Shortens large numbers (e.g., 1M, 500k).
- `number`: Standard integer formatting.
- `currency`: Localized currency symbol.
- `decimal`: 1 decimal place.
- `decimal3`: 3 decimal places (common for IDH).
- `percent`: Adds % symbol.

### Championship Configuration (`src/data/championships/*.json`)
For multi-city tournaments, use the championship schema:
- `name`: Championship title.
- `cities`: Array of city objects (including visual and data properties).
- `rounds`: Array of comparison indicators.

## How to Add a New Content (Step-by-Step for AI)

### Adding a 1v1 Battle
1.  **Gather Data**: Research statistical data for the two cities.
2.  **Add Images**: Place landscape images in `public/`.
3.  **Create JSON**: Save to `src/data/cityA-cityB.json`.
4.  **Register**: In `src/Root.tsx`, import JSON and add `<Composition>` with `width: 1080, height: 1920` (Vertical).

### Adding a Championship
1.  **Create Championship JSON**: Save to `src/data/championships/name.json`.
2.  **Register**: In `src/Root.tsx`, add the JSON to the `championships` array in `RemotionRoot`. It will be automatically registered with `width: 1920, height: 1080` (Horizontal).

## Changing to US Cities (Forking Instructions)
If you are evolving this for the US market:
1.  **Metric to Imperial**: Consider updating `unit` labels in JSON from `km²` to `mi²`.
2.  **Currency**: Update `unit` from `R$` to `$`.
3.  **Data Indicators**: You might want to include "Median Household Income" or "Crime Rate" instead of IDH if more relevant to the US audience.
4.  **Labels**: Translate any hardcoded Portuguese strings in components (e.g., in `BattleWinner.tsx`).

## Hardcoded Localizations (Forking Checklist)

If you are evolving this for the US market, you MUST update the following:

### `src/components/BattleRound.tsx`
1.  **Number Formatting**: Change `'pt-BR'` to `'en-US'` in `Intl.NumberFormat`.
2.  **Currency**: Change `BRL` to `USD`.
3.  **Victory Labels**: Translate UI strings:
    - `EMPATE` -> `TIE`
    - `VENCE` -> `WINS`
4.  **Emoji Logic**: The `getEmoji` function uses `.includes()` on Portuguese keywords. Update these to English (e.g., `POPULAÇÃO` -> `POPULATION`).

### `src/components/BattleIntro.tsx`
1.  **Banner Text**: Change `CIDADES BRASILEIRAS` to `AMERICAN CITIES`.
2.  **Theme Text**: Change `DE CIDADES` to `OF CITIES` or `URBAN`.

### `src/components/BattleWinner.tsx`
1.  **Winner Title**: Change `VENCEDOR` to `WINNER`.
2.  **Scoreboard Text**: Change `PLACAR FINAL` to `FINAL SCORE`.

## Design & Animation
- **Timing (1v1 Battles)**:
  - Intro: 2s (60 frames)
  - Rounds: 3s each (90 frames)
  - Winner: 3s (90 frames)
- **Timing (Championships)**:
  - Synced to **128 BPM** music.
  - Battle Rounds: 6 beats (~2.8s) for better readability in long videos.
  - Total duration limited to **2:47** (music length).
- **Physics**: Snappy spring animations. Added **Confetti** effect for championship winners.
- **Aspect Ratio**: 
  - **Vertical (1080x1920)**: Default for 1v1 Battles (Shorts/Reels).
  - **Horizontal (1920x1080)**: Default for Championships (YouTube Wide).

## Commands
- `npm run dev`: Start Remotion Studio to preview videos.
- `npx remotion render BattleID out/video.mp4`: Render a specific battle to a file.
