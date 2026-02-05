import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Sequence,
  Audio,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { Top10VideoInput } from "./types";
import { sortCitiesByMetric, beatsToFrames } from "./utils";
import { Top10Intro } from "./scenes/Top10IntroScene";
import { Top10RankingItem } from "./scenes/Top10RankingScene";
import { Top10Outro } from "./scenes/Top10OutroScene";

export const Top10CidadesVideo: React.FC<Top10VideoInput> = ({
  videoData,
  audioTrack = "audio/Beat Your Competition - Vibe Tracks.mp3",
  bpm = 128,
}) => {
  const frame = useCurrentFrame();

  // Sort cities by the specified metric
  const sortedCities = useMemo(() => {
    if (!videoData) return [];
    return sortCitiesByMetric(videoData.cities, videoData.metric);
  }, [videoData]);

  // Calculate timeline based on format and BPM
  const timeline = useMemo(() => {
    if (!videoData) return null;
    const fps = 30;
    const isVertical = videoData.format === "vertical";

    if (isVertical) {
      // Vertical timeline based on beats (128 BPM default)
      const introDk = beatsToFrames(6, bpm, fps);
      const regDk = beatsToFrames(3, bpm, fps);
      const top2Dk = beatsToFrames(4, bpm, fps);
      const champDk = beatsToFrames(8, bpm, fps);
      const outroDk = beatsToFrames(8, bpm, fps);

      return {
        intro: { from: 0, duration: introDk },
        regular: Array.from({ length: 7 }, (_, i) => ({
          from: introDk + i * regDk,
          duration: regDk,
          city: sortedCities[9 - i],
        })),
        top3: Array.from({ length: 2 }, (_, i) => ({
          from: introDk + 7 * regDk + i * top2Dk,
          duration: top2Dk,
          city: sortedCities[2 - i],
        })),
        champion: {
          from: introDk + 7 * regDk + 2 * top2Dk,
          duration: champDk,
          city: sortedCities[0],
        },
        outro: {
          from: introDk + 7 * regDk + 2 * top2Dk + champDk,
          duration: outroDk,
        },
      };
    } else {
      // Horizontal timeline based on beats
      const introDk = beatsToFrames(16, bpm, fps);
      const regDk = beatsToFrames(12, bpm, fps);
      const top2Dk = beatsToFrames(16, bpm, fps);
      const champDk = beatsToFrames(16, bpm, fps);
      const concDk = beatsToFrames(12, bpm, fps);

      return {
        intro: { from: 0, duration: introDk },
        first8: Array.from({ length: 3 }, (_, i) => ({
          from: introDk + i * regDk,
          duration: regDk,
          city: sortedCities[9 - i],
        })),
        middle: Array.from({ length: 4 }, (_, i) => ({
          from: introDk + 3 * regDk + i * regDk,
          duration: regDk,
          city: sortedCities[6 - i],
        })),
        top3: Array.from({ length: 2 }, (_, i) => ({
          from: introDk + 7 * regDk + i * top2Dk,
          duration: top2Dk,
          city: sortedCities[2 - i],
        })),
        champion: {
          from: introDk + 7 * regDk + 2 * top2Dk,
          duration: champDk,
          city: sortedCities[0],
        },
        conclusion: {
          from: introDk + 7 * regDk + 2 * top2Dk + champDk,
          duration: concDk,
        },
      };
    }
  }, [videoData, sortedCities, bpm]);

  if (!videoData || !timeline) return null;

  const isVertical = videoData.format === "vertical";

  // Calculate total duration from timeline for accurate audio
  const totalDuration = isVertical
    ? (timeline.outro?.from || 0) + (timeline.outro?.duration || 0)
    : (timeline.conclusion?.from || 0) + (timeline.conclusion?.duration || 0);

  // Audio Fade Out Logic
  const audioVolume = interpolate(
    frame,
    [totalDuration - 60, totalDuration - 15],
    [0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Background Audio with Fade Out */}
      <Sequence from={0} durationInFrames={totalDuration}>
        <Audio src={staticFile(audioTrack)} volume={audioVolume} />
      </Sequence>

      {/* Intro Scene */}
      <Sequence
        from={timeline.intro.from}
        durationInFrames={timeline.intro.duration}
      >
        <Top10Intro
          durationInFrames={timeline.intro.duration}
          title={videoData.title}
          subtitle={videoData.subtitle}
          theme={videoData.theme}
          format={videoData.format}
        />
      </Sequence>

      {/* Regular Rankings */}
      {videoData.format === "vertical" &&
        timeline.regular &&
        timeline.regular.map((step, index) => (
          <Sequence
            key={`regular-${index}`}
            from={step.from}
            durationInFrames={step.duration}
          >
            <Top10RankingItem
              durationInFrames={step.duration}
              cidade={step.city}
              position={10 - index}
              metric={videoData.metric}
              theme={videoData.theme}
              format={videoData.format}
            />
          </Sequence>
        ))}

      {/* Horizontal format groups */}
      {videoData.format === "horizontal" && (
        <>
          {/* First group: #10-#8 */}
          {timeline.first8 &&
            timeline.first8.map((step, index) => (
              <Sequence
                key={`first8-${index}`}
                from={step.from}
                durationInFrames={step.duration}
              >
                <Top10RankingItem
                  durationInFrames={step.duration}
                  cidade={step.city}
                  position={10 - index}
                  metric={videoData.metric}
                  theme={videoData.theme}
                  format={videoData.format}
                />
              </Sequence>
            ))}

          {/* Middle group: #7-#4 */}
          {timeline.middle &&
            timeline.middle.map((step, index) => (
              <Sequence
                key={`middle-${index}`}
                from={step.from}
                durationInFrames={step.duration}
              >
                <Top10RankingItem
                  durationInFrames={step.duration}
                  cidade={step.city}
                  position={7 - index}
                  metric={videoData.metric}
                  theme={videoData.theme}
                  format={videoData.format}
                />
              </Sequence>
            ))}
        </>
      )}

      {/* Top 3 */}
      {timeline.top3 &&
        timeline.top3.map((step, index) => (
          <Sequence
            key={`top3-${index}`}
            from={step.from}
            durationInFrames={step.duration}
          >
            <Top10RankingItem
              durationInFrames={step.duration}
              cidade={step.city}
              position={3 - index}
              metric={videoData.metric}
              theme={videoData.theme}
              format={videoData.format}
            />
          </Sequence>
        ))}

      {/* Champion Special */}
      <Sequence
        from={timeline.champion.from}
        durationInFrames={timeline.champion.duration}
      >
        <Top10RankingItem
          durationInFrames={timeline.champion.duration}
          cidade={timeline.champion.city}
          position={1}
          metric={videoData.metric}
          theme={videoData.theme}
          format={videoData.format}
        />
      </Sequence>

      {/* Outro/Conclusion */}
      <Sequence
        from={
          videoData.format === "vertical"
            ? timeline.outro?.from || 0
            : timeline.conclusion?.from || 0
        }
        durationInFrames={
          videoData.format === "vertical"
            ? timeline.outro?.duration || 0
            : timeline.conclusion?.duration || 0
        }
      >
        <Top10Outro
          durationInFrames={
            videoData.format === "vertical"
              ? timeline.outro?.duration || 0
              : timeline.conclusion?.duration || 0
          }
          title={videoData.title}
          theme={videoData.theme}
          format={videoData.format}
          cities={sortedCities}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
