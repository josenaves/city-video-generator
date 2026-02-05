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
 * Top10Intro - High-Retention Hook Scene
 *
 * Implements:
 * - .agent/skills/ui_ux_master: Advanced UI/UX Design Engine
 * - Kinetic Typography (Motion hooks)
 * - Visual Anchor (Badge)
 * - Spatial Persistence
 */

const FONT_FAMILY = "Inter, Roboto, sans-serif";

export const Top10Intro: React.FC<Top10IntroProps> = ({
  durationInFrames,
  title,
  subtitle,
  theme,
  format,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const colors = getThemeColors(theme);
  // Robust Vertical Detection
  const isVertical = format === "vertical" || height > width;

  // --- Motion Physics ---

  // Badge drops from above (Spatial Persistence)
  const badgeSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 100 },
  });

  // Title slides up
  const textSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 15 },
  });

  // Subtitle fades in
  const subSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 20 },
  });

  // --- Interpolations ---
  const badgeY = interpolate(badgeSpring, [0, 1], [-200, 0]);
  const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1]);
  const titleY = interpolate(textSpring, [0, 1], [100, 0]);
  const titleOpacity = interpolate(textSpring, [0, 1], [0, 1]);
  const subOpacity = interpolate(subSpring, [0, 1], [0, 1]);

  const bgScale = interpolate(frame, [0, durationInFrames], [1, 1.1]);

  // --- Design Tokens ---
  const badgeSize = isVertical ? 140 : 160; // Larger Badge
  const titleSize = isVertical ? 90 : 96;   // Massive Title
  const subSize = isVertical ? 48 : 32;     // Readable Subtitle
  const glassBackground = "rgba(255, 255, 255, 0.05)";
  const glassBorder = "1px solid rgba(255, 255, 255, 0.1)";

  return (
    <AbsoluteFill
      style={{
        background: colors.background,
        fontFamily: FONT_FAMILY,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 1. Dynamic Background */}
      <AbsoluteFill style={{ zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at center, ${colors.gradient[0]} 0%, transparent 60%)`,
            opacity: 0.4,
            transform: `scale(${bgScale})`,
          }}
        />
        {/* Animated Orbs */}
        <div style={{
          position: "absolute",
          top: isVertical ? "-10%" : "-20%",
          right: isVertical ? "-20%" : "-10%",
          width: width * 0.7,
          height: width * 0.7,
          background: colors.accent,
          borderRadius: "50%",
          filter: "blur(120px)",
          opacity: 0.15
        }} />
        <div style={{
          position: "absolute",
          bottom: isVertical ? "-10%" : "-20%",
          left: isVertical ? "-20%" : "-10%",
          width: width * 0.6,
          height: width * 0.6,
          background: colors.secondary,
          borderRadius: "50%",
          filter: "blur(100px)",
          opacity: 0.1
        }} />
      </AbsoluteFill>

      {/* 2. Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: isVertical ? '90%' : '70%',
        gap: isVertical ? '32px' : '48px'
      }}>

        {/* VISUAL ANCHOR: TOP 10 BADGE */}
        <div style={{
          transform: `translateY(${badgeY}px) scale(${badgeScale})`,
        }}>
          <div style={{
            background: colors.accent,
            color: colors.background, // High contrast
            fontSize: `${badgeSize / 3}px`,
            fontWeight: 900,
            padding: "16px 40px",
            borderRadius: "100px",
            boxShadow: `0 20px 50px ${colors.accent}40`,
            letterSpacing: "0.1em",
            display: "inline-block",
            lineHeight: 1
          }}>
            TOP 10
          </div>
        </div>

        {/* MAIN TITLE (Kinetic) */}
        <h1 style={{
          margin: 0,
          color: colors.primary,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          textTransform: "uppercase",
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          textShadow: "0 10px 30px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "center"
        }}>
          {(() => {
            // Smart Split for "Topic" vs "Location"
            // Look for " do ", " da ", " de ", " em " (case insensitive)
            const splitMatch = title.match(/^(.*?)\s+(do|da|de|em)\s+(.*)$/i);

            if (splitMatch) {
              // [full, Part1, preposition, Part2]
              const [_, part1, preposition, part2] = splitMatch;
              return (
                <>
                  <span style={{ fontSize: `${titleSize * 0.7}px` }}>{part1}</span>
                  <span style={{
                    fontSize: `${titleSize}px`,
                    color: colors.accent,
                    marginTop: "8px"
                  }}>
                    {part2}
                  </span>
                </>
              );
            }
            return <span style={{ fontSize: `${titleSize}px` }}>{title}</span>;
          })()}
        </h1>

        {/* SUBTITLE */}
        <div style={{
          fontSize: `${subSize}px`,
          color: colors.secondary,
          fontWeight: 500,
          letterSpacing: "0.05em",
          opacity: subOpacity,
          background: glassBackground,
          padding: "16px 32px",
          borderRadius: "16px",
          border: glassBorder,
          backdropFilter: "blur(8px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px"
        }}>
          {subtitle.includes(" - ") ? (
            subtitle.split(" - ").map((part, i) => (
              <span key={i} style={{
                fontWeight: i === 1 ? 800 : 500, // Emphasize the second line (Ranking Year)
                color: i === 1 ? colors.accent : "inherit" // Highlight the year
              }}>
                {part}
              </span>
            ))
          ) : (
            subtitle
          )}
        </div>

      </div>

      {/* 3. Decoration Line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '8px',
        background: `linear-gradient(90deg, ${colors.accent}, ${colors.secondary})`,
        opacity: subOpacity
      }} />

    </AbsoluteFill>
  );
};
