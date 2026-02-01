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
 * Top10Outro - High-Conversion End Screen
 *
 * Implements:
 * - .agent/skills/ui_ux_master: Advanced UI/UX Design Engine
 * - Magnetic Spring Animations
 * - Glassmorphism & Elevation
 * - Gradient Typography
 */

const FONT_FAMILY = "Inter, Roboto, sans-serif";

export const Top10Outro: React.FC<Top10OutroProps> = ({
  durationInFrames,
  title,
  theme,
  format,
  cities,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const colors = getThemeColors(theme);
  const isVertical = format === "vertical";

  // --- Motion Physics (Magnetic Entrance) ---
  const entranceSpring = spring({ frame, fps, config: { damping: 12, mass: 0.8, stiffness: 100 } });
  const contentDelay = spring({ frame: frame - 10, fps, config: { damping: 15 } });
  const listDelay = spring({ frame: frame - 20, fps, config: { damping: 15 } });

  // Pulse effect for CTA
  const pulse = Math.sin(frame / 5) * 0.05 + 1;

  // --- Interpolations ---
  const scale = interpolate(entranceSpring, [0, 1], [0.8, 1]);
  const opacity = interpolate(entranceSpring, [0, 1], [0, 1]);
  const slideUp = interpolate(contentDelay, [0, 1], [50, 0]);
  const listOpacity = interpolate(listDelay, [0, 1], [0, 1]);

  // --- Design Tokens ---
  const titleSize = isVertical ? 72 : 82; // MASSIVE for visibility
  const subtitleSize = isVertical ? 32 : 36;
  const ctaSize = isVertical ? 48 : 42;
  const glassBackground = "rgba(255, 255, 255, 0.05)";
  const glassBorder = "1px solid rgba(255, 255, 255, 0.1)";

  // Recap List Logic
  // Show only Top 3 (Winners Podium) for maximum visibility in both formats
  const recapList = cities.slice(0, 3);

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
      {/* 1. Animated Gradient Background */}
      <AbsoluteFill style={{ zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at center, ${colors.gradient[0]} 0%, transparent 80%)`,
            opacity: 0.3,
            transform: `scale(${interpolate(frame, [0, durationInFrames], [1, 1.2])})`,
          }}
        />
        {/* Abstract Shapes */}
        <div style={{
          position: "absolute",
          top: isVertical ? "20%" : "10%",
          left: isVertical ? "-10%" : "20%",
          width: width * 0.6,
          height: width * 0.6,
          background: colors.secondary,
          borderRadius: "50%",
          filter: "blur(100px)",
          opacity: 0.1
        }} />
      </AbsoluteFill>

      {/* 2. Layout Container (Adaptive: Full Screen Mobile vs Card Desktop) */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: isVertical ? '100%' : '85%',
          height: isVertical ? '100%' : 'auto', // Full screen on mobile
          padding: isVertical ? '80px 24px' : '60px', // Slightly less side padding for BIG text
          background: isVertical ? 'transparent' : glassBackground, // Cleaner mobile look
          backdropFilter: isVertical ? 'none' : 'blur(16px)',
          borderRadius: isVertical ? '0' : '32px',
          border: isVertical ? 'none' : glassBorder,
          boxShadow: isVertical ? 'none' : '0 24px 48px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: isVertical ? 'space-between' : 'center', // Spread content on mobile
          textAlign: 'center',
          opacity,
          transform: isVertical ? 'none' : `scale(${scale}) translateY(${slideUp}px)` // Disable container scale on mobile
        }}
      >
        {/* Header Section */}
        <div>
          <h1 style={{
            margin: 0,
            fontSize: `${titleSize}px`,
            fontWeight: 900,
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accent})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
            lineHeight: 1.1
          }}>
            Obrigado por assistir!
          </h1>

          <p style={{
            margin: "0 auto",
            fontSize: `${subtitleSize}px`,
            color: "rgba(255,255,255,0.7)",
            fontWeight: 500,
            maxWidth: "90%"
          }}>
            {title}
          </p>
        </div>

        {/* Quick Recap (Top 3 for Mobile, Top 5 for Desktop) */}
        <div style={{
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          flexWrap: isVertical ? 'nowrap' : 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isVertical ? '24px' : '16px',
          margin: isVertical ? '40px 0' : '32px 0 32px',
          opacity: listOpacity,
          width: '100%'
        }}>
          {recapList.map((city, index) => {
            const isWinner = index === 0;
            return (
              <div key={city.name} style={{
                background: isVertical && isWinner
                  ? `linear-gradient(90deg, ${colors.accent}20, transparent)`
                  : 'rgba(255,255,255,0.05)',
                padding: isVertical ? '12px 24px' : '16px 24px',
                borderRadius: '16px',
                border: isVertical && isWinner
                  ? `1px solid ${colors.accent}`
                  : '1px solid rgba(255,255,255,0.1)',
                fontSize: isVertical ? (isWinner ? '64px' : '48px') : (isWinner ? '34px' : '28px'), // MASSIVE TYPOGRAPHY
                color: isWinner ? colors.accent : colors.primary,
                fontWeight: isWinner ? 900 : 700,
                display: 'flex',
                alignItems: 'center',
                width: isVertical ? '100%' : 'auto',
                gap: '16px',
                transform: isVertical && isWinner ? 'scale(1.05)' : 'none',
                boxShadow: isVertical && isWinner ? `0 10px 40px ${colors.accent}30` : 'none'
              }}>
                <span style={{
                  color: colors.accent,
                  fontWeight: 900,
                  fontSize: isVertical ? '1em' : '1em',
                  minWidth: isVertical ? '60px' : 'auto', // Wider for big numbers
                  textAlign: 'left'
                }}>
                  #{index + 1}
                </span>
                <span style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {city.name}
                </span>
                {isWinner && isVertical && (
                  <span style={{ marginLeft: 'auto', fontSize: '0.6em', opacity: 0.8 }}>👑</span>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div style={{
          background: colors.accent,
          padding: isVertical ? "32px 48px" : "20px 48px",
          borderRadius: "100px",
          color: colors.primary === "#ffffff" ? "#000" : "#fff",
          fontSize: `${ctaSize}px`,
          fontWeight: 800,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          boxShadow: `0 8px 30px ${colors.accent}60`,
          transform: `scale(${pulse})`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          width: isVertical ? '100%' : 'auto'
        }}>
          INSCREVA-SE
        </div>

        {/* Engagement Hint */}
        <div style={{
          marginTop: "40px",
          fontSize: isVertical ? "16px" : "24px",
          color: "rgba(255,255,255,0.5)",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.2em"
        }}>
          Curta • Comente • Compartilhe
        </div>
      </div>
    </AbsoluteFill>
  );
};
