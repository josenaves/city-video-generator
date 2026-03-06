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

const FONT_FAMILY = "'Outfit', Inter, sans-serif";

export const Top10Outro: React.FC<Top10OutroProps> = ({
  durationInFrames,
  title,
  theme,
  format,
  cities,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const colors = getThemeColors(theme);
  const isVertical = format === "vertical";

  // --- Motion Physics ---
  const entranceSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 1, stiffness: 80 },
  });

  const contentSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 16, mass: 1, stiffness: 100 },
  });

  // Pulse effect for CTA
  const pulse = 1 + Math.sin(frame / 15) * 0.04;

  // --- Interpolations ---
  const opacity = interpolate(entranceSpring, [0, 1], [0, 1]);
  const slideY = interpolate(contentSpring, [0, 1], [50, 0]);
  const bgScale = interpolate(frame, [0, durationInFrames], [1, 1.1]);

  // Design Tokens
  const glassBg = "rgba(10, 10, 10, 0.45)";
  const glassBorder = "1px solid rgba(255, 255, 255, 0.12)";

  const top3 = cities.slice(0, 3);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily: FONT_FAMILY,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 1. Background Layer */}
      <AbsoluteFill style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute",
          top: '50%',
          left: '50%',
          width: '150%',
          height: '150%',
          transform: `translate(-50%, -50%) scale(${bgScale})`,
          background: `radial-gradient(circle at center, ${colors.accent}11 0%, transparent 70%)`,
          filter: 'blur(100px)',
        }} />
      </AbsoluteFill>

      {/* 2. Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: isVertical ? '90%' : '80%',
        opacity: opacity,
        transform: `translateY(${slideY}px)`,
      }}>

        <h2 style={{
          fontSize: isVertical ? "32px" : "40px",
          color: colors.secondary,
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: "20px",
        }}>
          Obrigado por assistir
        </h2>

        <h1 style={{
          fontSize: isVertical ? "70px" : "100px",
          fontWeight: 900,
          color: "white",
          margin: 0,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          textShadow: "0 20px 50px rgba(0,0,0,0.5)",
          textTransform: "uppercase"
        }}>
          {title}
        </h1>

        {/* Winner Podium Recap */}
        <div style={{
          marginTop: "60px",
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          gap: "24px",
          justifyContent: "center",
          width: "100%",
        }}>
          {top3.map((city, i) => (
            <div key={city.name} style={{
              background: glassBg,
              backdropFilter: "blur(20px)",
              border: i === 0 ? `2px solid ${colors.accent}` : glassBorder,
              padding: "24px 40px",
              borderRadius: "24px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: i === 0 ? 'scale(1.1)' : 'scale(1)',
              boxShadow: i === 0 ? `0 20px 40px ${colors.accent}33` : 'none',
            }}>
              <span style={{ fontSize: "24px", fontWeight: 900, color: colors.accent, marginBottom: "8px" }}>#{i + 1}</span>
              <span style={{ fontSize: "32px", fontWeight: 800, color: "white" }}>{city.name}</span>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{
          marginTop: "80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <div style={{
            background: colors.accent,
            color: "white",
            padding: "24px 64px",
            borderRadius: "100px",
            fontSize: "42px",
            fontWeight: 900,
            letterSpacing: "0.1em",
            boxShadow: `0 20px 60px ${colors.accent}66`,
            cursor: "pointer",
            transform: `scale(${pulse})`,
          }}>
            INSCREVA-SE
          </div>

          <p style={{
            marginTop: "40px",
            fontSize: "24px",
            color: "rgba(255,255,255,0.4)",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
          }}>
            Curta • Comente • Compartilhe
          </p>
        </div>

      </div>
    </AbsoluteFill>
  );
};
