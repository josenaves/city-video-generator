import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { Top10IntroProps } from "../types";
import { getThemeColors } from "../utils";

/**
 * Top10Intro - Cena de introdução do vídeo Top 10
 *
 * Remotion Best Practices References:
 * - text-animations.md: Animações de texto e títulos
 * - timing.md: Curvas de interpolação (spring, interpolate)
 * - animations.md: Animações fundamentais
 */

export const Top10Intro: React.FC<Top10IntroProps> = ({
  durationInFrames,
  title,
  subtitle,
  theme,
  format,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const colors = getThemeColors(theme);

  const titleAnimation = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  const subtitleAnimation = spring({
    frame: Math.max(0, frame - fps / 2),
    fps,
    config: { damping: 20 },
  });

  const isVertical = format === "vertical";
  const titleScale = interpolate(titleAnimation, [0, 1], [0.8, 1]);
  const titleOpacity = interpolate(titleAnimation, [0, 1], [0, 1]);
  const subtitleOpacity = interpolate(subtitleAnimation, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.background,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: isVertical ? "40px 20px" : "60px 40px",
      }}
    >
      {/* Background gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: colors.gradient[0],
          opacity: 0.1,
        }}
      />

      {/* Main Title */}
      <div
        style={{
          fontSize: isVertical ? "42px" : "64px",
          fontWeight: "bold",
          color: colors.primary,
          textAlign: "center",
          marginBottom: isVertical ? "20px" : "30px",
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          lineHeight: 1.2,
          textShadow:
            theme === "gradient-burst" ? "2px 2px 8px rgba(0,0,0,0.3)" : "none",
        }}
      >
        {title}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: isVertical ? "24px" : "32px",
          color: colors.secondary,
          textAlign: "center",
          opacity: subtitleOpacity,
          maxWidth: isVertical ? "90%" : "80%",
          lineHeight: 1.4,
        }}
      >
        {subtitle}
      </div>

      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          bottom: isVertical ? "60px" : "80px",
          width: "80%",
          height: "2px",
          background: colors.gradient[0],
          opacity: 0.6,
        }}
      />

      {/* Ranking numbers hint */}
      <div
        style={{
          position: "absolute",
          bottom: isVertical ? "40px" : "50px",
          display: "flex",
          gap: "20px",
          opacity: 0.3,
        }}
      >
        {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((num) => (
          <div
            key={num}
            style={{
              fontSize: isVertical ? "16px" : "20px",
              color: colors.accent,
              fontWeight: "bold",
            }}
          >
            #{num}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
