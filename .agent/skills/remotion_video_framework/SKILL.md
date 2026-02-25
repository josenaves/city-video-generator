---
name: remotion-video-framework
description: Master skill for creating and maintaining Remotion videos across all projects.
---

# Remotion Video Framework

This skill provides a unified workflow for creating high-quality data-driven videos using Remotion.

## Sub-Skills & Specialized Knowledge

- **Best Practices**: Refer to `.agent/skills/remotion-best-practices/SKILL.md` for coding patterns, animations, and audio handling.
- **Top 10 Rankings**: Refer to `.agent/skills/top-10-cidades/SKILL.md` for city ranking videos.
- **City Battles**: Refer to `.agent/skills/city_battle_spec/SKILL.md` for standard city vs city comparisons.
- **SEO Generation**: 
  - For Cities (BR): `.agent/skills/youtube_seo/SKILL.md`
  - For Stocks/FIIs: `.agent/skills/youtube_seo_stocks/SKILL.md`
  - For US Cities: `.agent/skills/youtube_seo_us/SKILL.md` (if applicable)

## Common Tasks

### 1. Adding a New Video
- Create a JSON data file in `src/data/`.
- Register the composition in `src/Root.tsx`.
- Use the appropriate component (e.g., `BattleVideo`, `Top10CidadesVideo`).

### 2. Duration & BPM
- Always calculate duration based on BPM to ensure synchronization.
- Use `beatsToFrames(beats, bpm, fps)` utility if available.

### 3. Assets
- Images should be stored in `public/images/`.
- Audio files in `public/audio/`.
