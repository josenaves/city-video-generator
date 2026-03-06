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

const FONT_FAMILY = "'Outfit', Inter, sans-serif";

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

  // --- Interpolations ---
  const opacity = interpolate(entranceSpring, [0, 1], [0, 1]);
  const scale = interpolate(entranceSpring, [0, 1], [0.8, 1]);
  const slideY = interpolate(contentSpring, [0, 1], [100, 0]);

  const bgScale = interpolate(frame, [0, durationInFrames], [1, 1.15]);

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
      {/* 1. Atmospheric Background */}
      <AbsoluteFill style={{ zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: colors.background,
          }}
        />
        {/* Cinematic Gradient Flow */}
        <div style={{
          position: "absolute",
          top: '-20%',
          left: '-20%',
          width: '140%',
          height: '140%',
          background: `radial-gradient(circle at 50% 50%, ${colors.accent}11 0%, transparent 60%)`,
          transform: `scale(${bgScale}) rotate(${frame / 200}rad)`,
          filter: 'blur(100px)',
        }} />

        {/* Dynamic Orbs */}
        <div style={{
          position: "absolute",
          top: '10%',
          right: '5%',
          width: '600px',
          height: '600px',
          background: colors.accent,
          borderRadius: "50%",
          filter: "blur(150px)",
          opacity: interpolate(entranceSpring, [0, 1], [0, 0.1])
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
        transform: `scale(${scale})`,
      }}>

        <h1 style={{
          fontSize: isVertical ? "100px" : "130px",
          fontWeight: 900,
          color: "white",
          margin: 0,
          lineHeight: 0.9,
          letterSpacing: "-0.05em",
          textShadow: "0 20px 60px rgba(0,0,0,0.6)",
          textTransform: "uppercase",
          transform: `translateY(${slideY}px)`,
        }}>
          {(() => {
            const splitMatch = title.match(/^(.*?)\s+(do|da|de|em)\s+(.*)$/i);
            if (splitMatch) {
              const [_, part1, prep, part2] = splitMatch;
              return (
                <>
                  <span style={{ fontSize: isVertical ? '60px' : '80px', display: 'block', opacity: 0.8 }}>{part1} {prep}</span>
                  <span style={{ color: colors.accent, display: 'block', marginTop: '10px' }}>{part2}</span>
                </>
              );
            }
            return title;
          })()}
        </h1>

        <div style={{
          marginTop: '60px',
          height: '4px',
          width: '200px',
          background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
        }} />

        <p style={{
          fontSize: isVertical ? "32px" : "40px",
          color: colors.secondary,
          fontWeight: 500,
          marginTop: "40px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: interpolate(contentSpring, [0, 1], [0, 1]),
        }}>
          {subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};
