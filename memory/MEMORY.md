# Remotion Best Practices — City Video Generator (audit 2026-09-11)

## Overview
Project uses Remotion 4.0.523 + React 19 for city comparison videos. Verified 2026-09-11:
- 128 Compositions in `src/Root.tsx:1` (2082 linhas) — 102 battles, 4 championships, 8 campaigns, 21 Top10, 1 Vox, 3 Bakeoff
- Vertical (1080x1920) and horizontal (1920x1080) formats
- Dynamic duration calculation based on data rounds (`calculateDuration`, `calculateChampionshipDuration`, `calculateCampaignTotalDuration`, `calculateTop10Duration`, `VOX_CIDADES_VERDES_TOTAL_FRAMES=6750f`)
- 400 images in `public/images/cities/`, 8 audio tracks, 29 SEO files, lint 160 problemas (2026-09-11)

## Key Rules from Skills
### Compositions
- Define components in `src/Root.tsx` with `<Composition>` elements
- Use `defaultProps` for initial values (must be JSON-serializable)
- Use `calculateMetadata` for dynamic dimensions/duration based on data
- Use `<Folder>` for organization (names: letters, numbers, hyphens only)
- Use `<Still>` for single-frame images (no durationInFrames or fps needed)

### Sequencing
- Use `<Sequence>` to delay element appearance in timeline
- **Always use `premountFor={1 * fps}`** to load components before playback
- Default layout wraps component in absolute fill element
- Use `layout="none"` to avoid wrapping
- Use `<Series>` for sequential non-overlapping elements
  - `<Series.Sequence durationInFrames={60}>` for individual scenes
- Negative `offset` for overlapping sequences (e.g., `offset={-15}`)
- Inside Sequence, `useCurrentFrame()` returns local frame (0-based)
- Nested sequences supported for complex timing
- To nest compositions: `<Sequence width={W} height={H}><CompositionComponent /></Sequence>`

### Assets & Media
- **Always use `staticFile()` for local assets** in `public/` folder
- Images: `<Img src={staticFile('photo.png')} />`
- Videos: `<Video src={staticFile('clip.mp4')} />` (from `@remotion/media`)
- Audio: `<Audio src={staticFile('music.mp3')} />` (from `@remotion/media`)
- Fonts: Load via `FontFace` with `staticFile()` URL
- Remote URLs: Can be used directly without `staticFile()`
- Remotion components ensure assets are fully loaded before rendering
- Special characters in filenames are automatically encoded

### Timing & Animations
- **All animations MUST be driven by `useCurrentFrame()` hook**
- **CSS transitions or Tailwind animation classes are FORBIDDEN** - they won't render correctly
- Write animations in seconds and multiply by `fps` from `useVideoConfig()`
- Use `interpolate()` for linear interpolation with clamping options
- Spring animations: use `spring()` for natural motion
  - Default config: `mass: 1, damping: 10, stiffness: 100` (has bounce)
  - Recommended smooth config: `{ damping: 200 }` (no bounce)
  - Common configs: smooth, snappy, bouncy, heavy
  - Use `delay` parameter to delay animation start
  - Use `durationInFrames` to stretch animation to specific duration
- Easing functions: `Easing.in`, `Easing.out`, `Easing.inOut` combined with curves (quad, sin, exp, circle)
- Cubic bezier curves: `Easing.bezier(0.8, 0.22, 0.96, 0.65)`

### Text Animations
- Typewriter effects: use string slicing, NOT per-character opacity
- Word highlighting: animate like highlighter pen
- Measure text dimensions with `measuring-text` utilities

### Dynamic Metadata
- Use `calculateMetadata` to make dimensions/duration/props dynamic based on data
- Runs once before rendering begins
- Can return props, durationInFrames, width, height, fps

## Project-Specific Patterns
### Battle Videos (`src/BattleVideo.tsx:65`)
- Use `calculateDuration(data, beatsOverride?, bpm?, useDynamicTiming?, isLong?)` `src/Root.tsx:282` for dynamic timing
- Support both vertical (1080x1920) and horizontal (1920x1080) formats — horizontais em `Root.tsx:493` etc.
- Image references in `public/images/cities/` via `staticFile()`; fallback `blumenau.jpg` → `images/cities/sc/b/blumenau.jpg`
- **BPM-based timing system** (`src/BattleVideo.tsx:19`):
  - `calculateFramesPerBeat(bpm) = (60/bpm)*30` → 14.0625f @128 BPM
  - `getTiming(beats, bpm)` for fixed timing (legacy) — `intro=round=final=beats*2`
  - `getDynamicTiming(numRounds, bpm, isLong)` `src/BattleVideo.tsx:26` — `standardBeats [4,2,6,3,5,2,4,3]`, `longBeats [10,6,12,8,10,6,14,8,10,12]`, intro 4→12, final 6→12
- Audio track configuration with volume 0.5 default; `BattleVideo.tsx:94` `<Audio src={staticFile(audioTrack)} />`
- Component structure: `BattleIntro` → N×`BattleRound` → `BattleWinner` + ProgressBar `BattleVideo.tsx:196`

### Championship (`src/ChampionshipVideo.tsx:28`)
- Fixed 128 BPM: `CHAMP_INTRO 4b`, `CHAMP_ROUND 6b`, `CHAMP_FINAL 4b`, `CHAMP_OPENING 12b`, `CHAMP_LEADERBOARD 8b`, `CHAMP_CHAMPION 14b`, `CHAMP_CAMPAIGN 18b`
- `calculateChampionshipDuration(nCities, nRounds)` `src/Root.tsx:300` — round-robin `n*(n-1)/2`; total ~5006f = 2:46

### Campaign Videos (`src/features/campaign-one-vs-many/CampaignVideo.tsx:11`)
- One-vs-many format — scheduler `calculateCampaignSchedule()` `logic/scheduler.ts`
- Scenes: Intro → Sponsorship → Battle loop → Status → Result; `calculateCampaignTotalDuration()`

### Top 10 Ranking Videos (`src/features/top-10-cidades/Top10CidadesVideo.tsx:16`)
- Vertical: intro 4b | 10-4 2b×7 | top2 4b×2 | champ 8b | outro 4b; Horizontal: intro16 | 10-4 12b | top2 16b | champ16 | conc12
- `calculateTop10Duration(format, bpm?)` via `beatsToFrames(beats,bpm,fps)`; overrides 140 BPM for crime/poverty
- 14 JSONs, 21 compositions; themes `elegant-dark` etc.; `sortCitiesByMetric()`

### VoxExplainer (`src/features/vox-explainer/VoxExplainerVideo.tsx:1`)
- Long-form 6750f = 3m45s (`VOX_CIDADES_VERDES_TOTAL_FRAMES` `utils/timing.ts:39`), NOT BPM — `durationToFrames("12s")=360f`
- 13 scenes `Scene01…Scene13` + bakeoff 3×630f; components `BarChart`, `BigNumber`, `CityLabel`, `SplitComparison`, `TextReveal` with `damping:200`
- Assets: `public/images/vox/cidades-verdes/`, `public/audio/vox-cidades-verdes-ptbr.mp3` (151.5s) + `.vtt`; 30 manifest items

## File Organization
- Data: `src/data/*.json` (102) + `championships/` (4) + `top-10/` (14) — imports com `// @ts-ignore`
- Components: `src/components/` (4) + `src/features/` (campaign, top-10, vox-explainer)
- Public: `public/images/cities/{uf}/{letra}/` (400 files), `public/audio/` (8 mp3), `public/intro/` (4 png)
- SEO: `src/seo/*.seo.md` (29)
- Scripts: `scripts/` (12 scripts — migrate, download, generate-top10, fetch-ibge)
- Root: `src/Root.tsx` 2082 linhas, 128 Compositions
- Lint 2026-09-11: 160 problemas (158 errors, 2 warnings) — `no-explicit-any`, `from-0`, `require-imports`