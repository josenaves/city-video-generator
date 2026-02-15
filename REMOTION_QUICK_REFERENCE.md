# Remotion Quick Reference

Based on best practices from Gemini skills and project patterns.

## Core Principles

### Animations
- **All animations MUST be driven by `useCurrentFrame()` hook**
- **CSS transitions or Tailwind animation classes are FORBIDDEN** - they won't render correctly
- Write animations in seconds and multiply by `fps` from `useVideoConfig()`

### Assets
- **Always use `staticFile()` for local assets** in `public/` folder
- Remote URLs can be used directly without `staticFile()`

### Sequencing
- **Always use `premountFor={1 * fps}`** to load components before playback

## Animation Patterns

### Linear Interpolation
```tsx
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const opacity = interpolate(frame, [0, 2 * fps], [0, 1], {
  extrapolateRight: 'clamp',
  extrapolateLeft: 'clamp',
});
```

### Spring Animations
```tsx
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const scale = spring({
  frame,
  fps,
  config: { damping: 200 }, // Smooth, no bounce (recommended)
});

// Common configurations:
const smooth = { damping: 200 };        // Smooth, no bounce (subtle reveals)
const snappy = { damping: 20, stiffness: 200 }; // Snappy, minimal bounce (UI elements)
const bouncy = { damping: 8 };          // Bouncy entrance (playful animations)
const heavy = { damping: 15, stiffness: 80, mass: 2 }; // Heavy, slow, small bounce
```

### Easing Functions
```tsx
import { interpolate, Easing } from 'remotion';

const value = interpolate(frame, [0, 100], [0, 1], {
  easing: Easing.inOut(Easing.quad), // or Easing.sin, Easing.exp, Easing.circle
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

// Cubic bezier:
const value = interpolate(frame, [0, 100], [0, 1], {
  easing: Easing.bezier(0.8, 0.22, 0.96, 0.65),
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
```

## Asset Usage

### Images
```tsx
import { Img, staticFile } from 'remotion';
<Img src={staticFile('images/photo.png')} />
```

### Videos
```tsx
import { Video } from '@remotion/media';
import { staticFile } from 'remotion';
<Video src={staticFile('videos/clip.mp4')} />
```

### Audio
```tsx
import { Audio } from '@remotion/media';
import { staticFile } from 'remotion';
<Audio src={staticFile('audio/music.mp3')} volume={0.5} />
```

### Fonts
```tsx
import { staticFile } from 'remotion';

const fontFamily = new FontFace('MyFont', `url(${staticFile('fonts/font.woff2')})`);
await fontFamily.load();
document.fonts.add(fontFamily);
```

## Sequencing

### Basic Sequence
```tsx
import { Sequence, useVideoConfig } from 'remotion';

const { fps } = useVideoConfig();

<Sequence from={1 * fps} durationInFrames={2 * fps} premountFor={1 * fps}>
  <Title />
</Sequence>
```

### Series for Sequential Scenes
```tsx
import { Series } from 'remotion';

<Series>
  <Series.Sequence durationInFrames={45}>
    <Intro />
  </Series.Sequence>
  <Series.Sequence durationInFrames={60}>
    <MainContent />
  </Series.Sequence>
  <Series.Sequence durationInFrames={30}>
    <Outro />
  </Series.Sequence>
</Series>
```

### Overlapping Sequences
```tsx
<Series>
  <Series.Sequence durationInFrames={60}>
    <SceneA />
  </Series.Sequence>
  <Series.Sequence offset={-15} durationInFrames={60}>
    {/* Starts 15 frames before SceneA ends */}
    <SceneB />
  </Series.Sequence>
</Series>
```

## Compositions (Root.tsx)

### Basic Composition
```tsx
import { Composition } from 'remotion';
import { MyComposition } from './MyComposition';

<Composition
  id="MyComposition"
  component={MyComposition}
  durationInFrames={100}
  fps={30}
  width={1080}
  height={1920}
  defaultProps={{
    title: 'Hello World',
    color: '#ff0000',
  }}
/>
```

### Dynamic Metadata
```tsx
import { Composition, CalculateMetadataFunction } from 'remotion';

const calculateMetadata: CalculateMetadataFunction<MyProps> = async ({ props }) => {
  const data = await fetch(`https://api.example.com/video/${props.videoId}`);
  const json = await data.json();

  return {
    durationInFrames: Math.ceil(json.duration * 30),
    props: {
      ...props,
      videoUrl: json.url,
    },
  };
};

<Composition
  id="DynamicComposition"
  component={MyComposition}
  durationInFrames={100} // Placeholder
  fps={30}
  width={1080}
  height={1920}
  defaultProps={{ videoId: 'abc123' }}
  calculateMetadata={calculateMetadata}
/>
```

## Project-Specific Patterns

### BPM-Based Timing (Battle Videos)
```tsx
// Calculate frames per beat at 30fps
export const calculateFramesPerBeat = (bpm: number) => (60 / bpm) * 30;

// Dynamic timing with patterns
export const getDynamicTiming = (numRounds: number, bpm = 128, isLong = false) => {
  const fpb = calculateFramesPerBeat(bpm);
  const standardBeats = [4, 2, 6, 3, 5, 2, 4, 3];
  const longBeats = [10, 6, 12, 8, 10, 6, 14, 8, 10, 12];
  const pattern = isLong ? longBeats : standardBeats;

  const rounds = Array.from({ length: numRounds }).map((_, i) =>
    Math.round((pattern[i % pattern.length]) * fpb)
  );

  const intro = Math.round((isLong ? 12 : 4) * fpb);
  const final = Math.round((isLong ? 12 : 6) * fpb);

  return { intro, rounds, final, totalFrames: intro + rounds.reduce((a, b) => a + b, 0) + final };
};
```

### Text Animations
- **Typewriter effects**: Use string slicing, NOT per-character opacity
- **Word highlighting**: Animate like highlighter pen

## Common Pitfalls

1. **Never use CSS animations/transitions** - Use Remotion's `interpolate()` or `spring()`
2. **Always premount sequences** - Use `premountFor={1 * fps}`
3. **Use `staticFile()` for local assets** - Ensures correct paths in deployment
4. **Inside Sequence, `useCurrentFrame()` is local** - Returns 0-based frame within sequence
5. **Composition props must be JSON-serializable** - Except `Date`, `Map`, `Set`, `staticFile()` which are supported

## File Organization

- **Compositions**: Defined in `src/Root.tsx`
- **Data**: JSON files in `src/data/` imported with `// @ts-ignore`
- **Components**: Organized in `src/components/` and `src/features/`
- **Assets**: `public/images/`, `public/audio/`, `public/fonts/`
- **Build output**: `out/` directory