import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { Top10SceneProps } from "../types";
import { getThemeColors, formatNumber } from "../utils";

/**
 * Top10RankingItem - High-Conversion UI/UX Redesign
 *
 * Implements:
 * - .agent/skills/ui_ux_master: Advanced UI/UX Design Engine
 * - 60-30-10 Color Logic
 * - Spatial Persistence Motion
 * - Glassmorphism & Elevation
 * - Fluid Typography
 */

const FONT_FAMILY = "Inter, Roboto, sans-serif";

export const Top10RankingItem: React.FC<Top10SceneProps> = ({
  durationInFrames,
  cidade,
  position,
  metric,
  theme,
  format,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const colors = getThemeColors(theme);
  const [backgroundError, setBackgroundError] = React.useState(false);
  const [cardError, setCardError] = React.useState(false);

  // Auto-detect vertical mode from canvas dimensions if prop is mismatching
  const isVertical = format === "vertical" || height > width;

  // --- Motion Physics (Optimized for Shorts if Vertical) ---
  const isShortDuration = isVertical && durationInFrames < 60; // Logic for fast-paced vertical video

  // Clean entrance spring (Spatial Persistence)
  const entranceSpring = spring({
    frame,
    fps,
    config: isShortDuration
      ? { damping: 12, mass: 0.5, stiffness: 180 } // Snappy for Shorts
      : { damping: 15, mass: 0.8, stiffness: 100 },
  });

  // Staggered delay for content
  const contentSpring = spring({
    frame: frame - (isShortDuration ? 3 : 10), // Much shorter delay for Shorts
    fps,
    config: isShortDuration
      ? { damping: 12, mass: 0.5, stiffness: 150 }
      : { damping: 18, mass: 1 },
  });

  // Metric value animation
  const valueProgress = spring({
    frame: frame - (isShortDuration ? 5 : 15),
    fps,
    config: { damping: 20 },
  });

  // --- Interpolations ---

  // Background Blur Entrance
  const blurRadius = interpolate(entranceSpring, [0, 1], [0, 20]);
  const bgScale = interpolate(entranceSpring, [0, 1], [1.1, 1]);

  // Content Slides
  const slideFromLeft = interpolate(entranceSpring, [0, 1], [-100, 0]);
  const slideFromRight = interpolate(contentSpring, [0, 1], [100, 0]);
  const slideFromBottom = interpolate(contentSpring, [0, 1], [50, 0]);

  // Opacity
  const opacity = interpolate(entranceSpring, [0, 1], [0, 1]);
  const contentOpacity = interpolate(contentSpring, [0, 1], [0, 1]);

  // --- Design Tokens (Atomic) ---

  const SPACER = 16; // 8pt Grid x 2
  const isChampion = position === 1;

  // Typography Scales
  const titleSize = isVertical ? 64 : 96;
  const subtitleSize = isVertical ? 32 : 40;
  const metricLabelSize = isVertical ? 24 : 32;
  const metricValueSize = isVertical ? 56 : 80;

  // Colors & Surface
  const overlayColor = "rgba(0, 0, 0, 0.65)"; // 60% dominant background
  const glassBackground = "rgba(255, 255, 255, 0.1)"; // Glassmorphism
  const glassBorder = "1px solid rgba(255, 255, 255, 0.15)";
  const shadowElevation = "0 8px 32px 0 rgba(0, 0, 0, 0.37)";

  const metricValue = cidade.data[metric.field];
  const formattedValue = formatNumber(metricValue, metric.format, metric.unit);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background,
        fontFamily: FONT_FAMILY,
        overflow: "hidden",
      }}
    >
      {/* 1. Immersive Background Layer */}
      <AbsoluteFill style={{ zIndex: 0 }}>
        {backgroundError ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: cidade.visual.primaryColor,
              transform: `scale(${bgScale})`,
              filter: `blur(${blurRadius}px) brightness(0.5)`,
            }}
          />
        ) : (
          <Img
            src={staticFile(cidade.visual.image)}
            onError={() => setBackgroundError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${bgScale})`,
              filter: `blur(${blurRadius}px) brightness(0.5)`, // Dimmed for readability
            }}
          />
        )}
        <AbsoluteFill style={{ background: overlayColor }} />
      </AbsoluteFill>

      {/* 2. Abstract Geometric Accents (Motion Background) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: isVertical ? "10%" : "-10%",
            right: isVertical ? "-20%" : "-5%",
            width: isVertical ? width * 0.8 : height * 0.6,
            height: isVertical ? width * 0.8 : height * 0.6,
            background: `radial-gradient(circle, ${cidade.visual.primaryColor}40 0%, transparent 70%)`,
            borderRadius: "50%",
            filter: "blur(60px)",
            opacity: 0.6,
          }}
        />
      </div>

      {/* 3. Layout Grid */}
      <AbsoluteFill
        style={{
          zIndex: 10,
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          // Removed top/bottom padding for vertical to use full height split
          padding: isVertical ? "0" : `${SPACER * 6}px`,
          gap: isVertical ? "0" : `${SPACER * 2}px`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* === Visual Component (Image Card) - Top 50% === */}
        <div
          style={{
            flex: isVertical ? "0 0 50%" : 1, // Strictly Top Half
            width: "100%", // Full Width
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end", // Align image to bottom of its container (closer to text)
            paddingBottom: 0,
            opacity: opacity,
            transform: `translateX(${slideFromLeft}px)`,
            position: "relative",
            overflow: "hidden", // Ensure no spill
          }}
        >
          <div
            style={{
              width: isVertical ? "100%" : "100%", // Full width for vertical now
              height: isVertical ? "100%" : "100%",
              // In vertical, we want the image to fill the top half fully.
              // We remove aspect ratio constraint on container and let object-fit cover handle it.
              maxWidth: isVertical ? "100%" : "800px",
              borderRadius: isVertical ? "0 0 32px 32px" : "24px", // Rounded only at bottom for vertical
              overflow: "hidden",
              boxShadow: shadowElevation,
              borderBottom: glassBorder, // Only border bottom/sides relevant
              position: "relative",
              transform: `perspective(1000px) rotateY(${interpolate(entranceSpring, [0, 1], [15, 0])}deg)`,
            }}
          >
            {cardError ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: cidade.visual.primaryColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {cidade.name}
              </div>
            ) : (
              <Img
                src={staticFile(cidade.visual.image)}
                onError={() => setCardError(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Crucial for filling the 50% height fully
                  transform: "scale(1.02)",
                }}
              />
            )}

            {/* Ranking Badge Applied to Image */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                backgroundColor: colors.accent, // High contrast background
                padding: isVertical
                  ? `${SPACER * 1.5}px ${SPACER * 3}px`
                  : `${SPACER}px ${SPACER * 3}px`,
                borderTopRightRadius: "24px",
                boxShadow: "4px -4px 20px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  color: colors.primary, // Often black on yellow/accent
                  fontSize: isVertical ? "64px" : "82px",
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                }}
              >
                #{position}
              </span>
            </div>
          </div>
        </div>

        {/* === Information Component (Typography & Data) - Bottom 50% === */}
        <div
          style={{
            flex: isVertical ? "0 0 50%" : 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Vertically Center content in the bottom half
            paddingTop: 0,
            alignItems: isVertical ? "center" : "flex-start",
            textAlign: isVertical ? "center" : "left",
            zIndex: 20,
            opacity: contentOpacity,
            transform: `translate(${isVertical ? `0, ${slideFromBottom}px` : `${slideFromRight}px, 0`})`,
          }}
        >
          {/* City & State */}
          <div
            style={{
              marginBottom: `${SPACER * 3}px`,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: isVertical ? "center" : "flex-start", // Strong Center
              textAlign: isVertical ? "center" : "left",
            }}
          >
            <h1
              style={{
                width: "100%", // Type container full width
                margin: 0,
                color: colors.primary,
                // Larger font size for readability
                fontSize: isVertical ? "80px" : `${titleSize}px`, // BIGGER
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                textAlign: isVertical ? "center" : "left",
              }}
            >
              {cidade.name}
            </h1>
            <h2
              style={{
                margin: `${SPACER}px 0 0 0`,
                color: colors.secondary,
                fontSize: isVertical ? "42px" : `${subtitleSize}px`, // BIGGER
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                display: "flex",
                alignItems: "center",
                justifyContent: isVertical ? "center" : "flex-start",
                gap: "12px",
                width: "100%",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "60px", // Longer Lines
                  height: "3px", // Thicker Lines
                  backgroundColor: colors.accent,
                }}
              />
              {cidade.state}
              <span
                style={{
                  display: isVertical ? "inline-block" : "none",
                  width: "60px",
                  height: "3px",
                  backgroundColor: colors.accent,
                }}
              />
            </h2>
          </div>

          {/* Metric Card */}
          <div
            style={{
              background: glassBackground,
              backdropFilter: "blur(12px)",
              border: glassBorder,
              borderRadius: "20px",
              padding: `${SPACER * 2}px ${SPACER * 3}px`,
              minWidth: isVertical ? "90%" : "400px", // Wider card on mobile
              width: isVertical ? "90%" : "auto", // Explicit width
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: isVertical ? "center" : "flex-start",
              transform: isChampion
                ? `scale(${interpolate(valueProgress, [0, 1], [0.95, 1.05])})`
                : "none",
            }}
          >
            <div
              style={{
                fontSize: isVertical ? "32px" : `${metricLabelSize}px`,
                textAlign: isVertical ? "center" : "left",
                color: "rgba(255, 255, 255, 0.9)", // Higher contrast
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: `${SPACER}px`,
                width: "100%",
              }}
            >
              {metric.title}
            </div>

            <div
              style={{
                fontSize: isVertical ? "110px" : `${metricValueSize}px`, // HUGE
                color: colors.accent,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                display: "flex",
                alignItems: "baseline",
                justifyContent: isVertical ? "center" : "flex-start",
                gap: "8px",
                textShadow: "0 4px 30px rgba(0,0,0,0.3)",
                width: "100%",
                flexWrap: "wrap", // Allow wrapping if number is massive
              }}
            >
              {formattedValue}
            </div>

            {cidade.nickname && (
              <div
                style={{
                  marginTop: `${SPACER}px`,
                  fontSize: isVertical ? "32px" : "16px", // Much larger nickname
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.7)", // Higher contrast
                  textAlign: isVertical ? "center" : "left",
                  width: "100%",
                }}
              >
                "{cidade.nickname}"
              </div>
            )}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
