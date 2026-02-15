# Remotion Best Practices from Gemini Skills

## Overview
Project uses Remotion for city comparison videos. Key patterns observed in Root.tsx:
- Multiple compositions for different city battles
- Vertical (1080x1920) and horizontal (1920x1080) formats
- Dynamic duration calculation based on data rounds
- Top 10 ranking videos with vertical/horizontal variants

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
### Battle Videos
- Use `calculateDuration()` function for dynamic timing based on rounds
- Support both vertical (1080x1920) and horizontal (1920x1080) formats
- Image references in public/images/cities/
- **BPM-based timing system**:
  - `calculateFramesPerBeat(bpm)` converts BPM to frames at 30fps
  - `getTiming(beats, bpm)` for fixed timing (legacy)
  - `getDynamicTiming(numRounds, bpm, isLong)` for variable timing patterns
  - Dynamic timing uses patterns: standard `[4, 2, 6, 3, 5, 2, 4, 3]` beats or long `[10, 6, 12, 8, 10, 6, 14, 8, 10, 12]`
  - Intro/final durations scale with `isLong` flag
- Audio track configuration with volume control
- Use `useDynamicTiming` and `isLong` flags for extended videos
- Component structure: `BattleIntro` → multiple `BattleRound` → `BattleWinner`

### Top 10 Ranking Videos
- Separate vertical/horizontal compositions
- Dynamic duration calculation with `calculateTop10Duration()`
- Audio track configuration with BPM

### Campaign Videos
- One-vs-many format (`CampaignVideo` component)
- Dynamic total duration calculation

## File Organization
- Data files in `src/data/` (JSON imports)
- Components in `src/features/` and root
- Public images in `public/images/cities/`
- Audio tracks in `public/audio/`