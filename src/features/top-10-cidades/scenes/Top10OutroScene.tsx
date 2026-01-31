import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { Top10OutroProps } from "../types";
import { getThemeColors } from "../utils";

/**
 * Top10Outro - Cena de encerramento do vídeo
 *
 * Remotion Best Practices References:
 * - text-animations.md: Animações de CTA e textos finais
 * - animations.md: Fade in/out animations
 * - timing.md: Smooth interpolation curves
 */

export const Top10Outro: React.FC<Top10OutroProps> = ({
  durationInFrames,
  title,
  theme,
  format,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const colors = getThemeColors(theme);

  const fadeIn = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  const isVertical = format === "vertical";
  const opacity = interpolate(fadeIn, [0, 1], [0, 1]);
  const scale = interpolate(fadeIn, [0, 1], [0.9, 1]);

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

      {/* Thank you message */}
      <div
        style={{
          fontSize: isVertical ? "32px" : "48px",
          fontWeight: "bold",
          color: colors.primary,
          textAlign: "center",
          marginBottom: isVertical ? "20px" : "30px",
          opacity,
          transform: `scale(${scale})`,
          lineHeight: 1.2,
        }}
      >
        Obrigado por assistir!
      </div>

      {/* Title reminder */}
      <div
        style={{
          fontSize: isVertical ? "20px" : "28px",
          color: colors.secondary,
          textAlign: "center",
          opacity,
          maxWidth: isVertical ? "90%" : "80%",
          lineHeight: 1.4,
          marginBottom: isVertical ? "30px" : "40px",
        }}
      >
        {title}
      </div>

      {/* Call to action */}
      <div
        style={{
          fontSize: isVertical ? "18px" : "24px",
          color: colors.accent,
          textAlign: "center",
          opacity,
          fontWeight: "bold",
          marginBottom: isVertical ? "20px" : "30px",
        }}
      >
        Curta, comente e compartilhe!
      </div>

      {/* Subscribe button */}
      <div
        style={{
          background: colors.accent,
          color: colors.background,
          padding: isVertical ? "15px 30px" : "20px 40px",
          borderRadius: "50px",
          fontSize: isVertical ? "18px" : "22px",
          fontWeight: "bold",
          opacity,
          transform: `scale(${scale})`,
          boxShadow: `0 4px 20px ${colors.accent}40`,
        }}
      >
        INSCREVA-SE
      </div>

      {/* Social media icons hint */}
      <div
        style={{
          position: "absolute",
          bottom: isVertical ? "40px" : "60px",
          display: "flex",
          gap: "20px",
          opacity: 0.6,
        }}
      >
        <div
          style={{
            width: isVertical ? "30px" : "40px",
            height: isVertical ? "30px" : "40px",
            borderRadius: "50%",
            background: colors.primary,
          }}
        />
        <div
          style={{
            width: isVertical ? "30px" : "40px",
            height: isVertical ? "30px" : "40px",
            borderRadius: "50%",
            background: colors.secondary,
          }}
        />
        <div
          style={{
            width: isVertical ? "30px" : "40px",
            height: isVertical ? "30px" : "40px",
            borderRadius: "50%",
            background: colors.accent,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
