import React, { useMemo } from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { Top10VideoInput } from "./types";
import { sortCitiesByMetric } from "./utils";
import { Top10Intro } from "./scenes/Top10IntroScene";
import { Top10RankingItem } from "./scenes/Top10RankingScene";
import { Top10Outro } from "./scenes/Top10OutroScene";

/**
 * Top10CidadesVideo - Componente principal para vídeos de ranking Top 10
 *
 * Referências do Remotion Best Practices:
 * - compositions.md: Definição de composições
 * - calculate-metadata.md: Cálculo dinâmico de duração
 * - sequencing.md: Padrões de sequenciamento
 * - audio.md: Uso de áudio
 */

// Helper para calcular duração total baseado no formato
// See: rules/calculate-metadata.md
// Exported for use in Root.tsx when registering compositions
export const calculateTop10Duration = (
  format: "vertical" | "horizontal",
): number => {
  const fps = 30;
  if (format === "vertical") {
    return 3 * fps + 7 * 3 * fps + 3 * 4 * fps + 4 * fps + 2 * fps; // 42s total
  }
  return 5 * fps + 3 * 4 * fps + 4 * 4 * fps + 3 * 6 * fps + 8 * fps + 6 * fps; // 65s total
};

export const Top10CidadesVideo: React.FC<Top10VideoInput> = ({
  videoData,
  audioTrack = "audio/Beat Your Competition - Vibe Tracks.mp3",
  bpm = 128,
}) => {
  // Sort cities by the specified metric
  const sortedCities = useMemo(() => {
    return sortCitiesByMetric(videoData.cities, videoData.metric);
  }, [videoData.cities, videoData.metric]);

  // Calculate timeline based on format
  const timeline = useMemo(() => {
    const fps = 30;
    const isVertical = videoData.format === "vertical";

    if (isVertical) {
      // Vertical format timing
      return {
        intro: { from: 0, duration: 3 * fps }, // 3s
        regular: Array.from({ length: 7 }, (_, i) => ({
          from: (3 + i * 3) * fps,
          duration: 3 * fps,
          city: sortedCities[9 - i], // #10 to #4
        })),
        top3: Array.from({ length: 3 }, (_, i) => ({
          from: (24 + i * 4) * fps,
          duration: 4 * fps,
          city: sortedCities[2 - i], // #3 to #1
        })),
        champion: { from: 36 * fps, duration: 4 * fps, city: sortedCities[0] }, // #1 special
        outro: { from: 40 * fps, duration: 2 * fps },
      };
    } else {
      // Horizontal format timing
      return {
        intro: { from: 0, duration: 5 * fps }, // 5s
        first8: Array.from({ length: 3 }, (_, i) => ({
          from: (5 + i * 4) * fps,
          duration: 4 * fps,
          city: sortedCities[9 - i], // #10 to #8
        })),
        middle: Array.from({ length: 4 }, (_, i) => ({
          from: (17 + i * 4) * fps,
          duration: 4 * fps,
          city: sortedCities[6 - i], // #7 to #4
        })),
        top3: Array.from({ length: 3 }, (_, i) => ({
          from: (33 + i * 6) * fps,
          duration: 6 * fps,
          city: sortedCities[2 - i], // #3 to #1
        })),
        champion: { from: 51 * fps, duration: 8 * fps, city: sortedCities[0] }, // #1 special
        conclusion: { from: 59 * fps, duration: 6 * fps },
      };
    }
  }, [videoData.format, sortedCities]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Background Audio */}
      <Audio src={staticFile(audioTrack)} volume={0.8} />

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
        />
      </Sequence>
    </AbsoluteFill>
  );
};
