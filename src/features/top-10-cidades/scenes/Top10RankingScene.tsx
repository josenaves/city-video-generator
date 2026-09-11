import React from "react";
import {
  AbsoluteFill,
  Audio,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Img,
  staticFile,
} from "remotion";
import { Top10SceneProps } from "../types";
import { getThemeColors, formatNumber } from "../utils";
import { noise2D } from "@remotion/noise";

/**
 * Top10RankingItem - High-Conversion UI/UX Redesign
 * 
 * DESIGN SYSTEM: Obsidian Documentary
 * - Obsidian Depth & Cinematic Lighting
 * - Outfit Typography (Negative Tracking)
 * - Glassmorphism Layering
 */

const FONT_FAMILY = "'Outfit', Inter, sans-serif";

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

  // Auto-detect orientation
  const isVertical = format === "vertical" || height > width;

  // --- Animation Hooks ---
  const entranceSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 1, stiffness: 80 },
  });

  const contentSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 16, mass: 1.2, stiffness: 100 },
  });

  // Floating & Ken Burns
  const floatingY = Math.sin(frame / 20) * 10;
  const kenBurns = interpolate(frame, [0, durationInFrames], [1, 1.15]);

  // Interpolations
  const opacity = interpolate(entranceSpring, [0, 1], [0, 1]);
  const slideY = interpolate(contentSpring, [0, 1], [100, 0]);
  const rotationY = interpolate(entranceSpring, [0, 1], [15, 0]);

  // Design Tokens — duotone: vidro mais leve para mostrar fundo colorido
  const accentColor = cidade.visual.primaryColor || colors.accent;
  const glassBg = "rgba(10, 10, 11, 0.45)";
  const glassBorder = `1px solid ${accentColor}30`;

  const metricValue = cidade.data[metric.field];
  const formattedValue = formatNumber(metricValue, metric.format, metric.unit);

  const citySlug = cidade.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const ttsSrc = `audio/cities/${cidade.state.toLowerCase()}/${citySlug}.mp3`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070708", // Deep obsidian
        fontFamily: FONT_FAMILY,
        overflow: "hidden",
      }}
    >
      {/* Narração TTS — nome da cidade (voz homem sério pt-BR-AntonioNeural) */}
      {cidade.state === "RJ" && <Audio src={staticFile(ttsSrc)} volume={1} />}
      {/* 1. Cinematic Duotone Background Layer — opção 4 */}
      <AbsoluteFill style={{ zIndex: 0, backgroundColor: "#0F0F0F" }}>
        {!backgroundError && (
          <Img
            src={staticFile(cidade.visual.image)}
            onError={() => setBackgroundError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${kenBurns})`,
              filter: `grayscale(1) contrast(1.25) brightness(0.65) blur(40px)`,
              opacity: 0.85,
            }}
          />
        )}
        {/* Duotone wash — accentColor com mixBlendMode color */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: accentColor,
            mixBlendMode: "color",
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.55) 100%)`,
          }}
        />

        {/* Cinematic Parallax Glows */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '5%',
          width: '800px',
          height: '800px',
          background: `radial-gradient(circle, ${accentColor}11 0%, transparent 70%)`,
          transform: `translate(${Math.sin(frame / 40) * 40}px, ${Math.cos(frame / 40) * 40}px)`,
          filter: 'blur(100px)',
        }} />
        {/* Dust sutil — 40 partículas com noise */}
        {Array.from({ length: 40 }).map((_, i) => {
          const nx = noise2D(`x-${cidade.name}-${i}`, frame / 80, i * 0.7) * 0.5 + 0.5;
          const ny = noise2D(`y-${cidade.name}-${i}`, frame / 80, i * 0.7) * 0.5 + 0.5;
          const size = 1 + (i % 3);
          const opacityDust = 0.08 + (i % 4) * 0.03;
          return (
            <div
              key={`dust-${i}`}
              style={{
                position: "absolute",
                left: `${nx * 100}%`,
                top: `${ny * 100}%`,
                width: size,
                height: size,
                background: accentColor,
                opacity: opacityDust,
                borderRadius: 999,
                filter: "blur(0.5px)",
                transform: `translate(-50%, -50%)`,
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* 2. Content Layout */}
      <AbsoluteFill
        style={{
          zIndex: 10,
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
          padding: isVertical ? "0" : `0 120px`,
          alignItems: "center",
          justifyContent: "center",
          gap: isVertical ? "0" : "100px",
        }}
      >
        {/* Cinematic Portrait Card */}
        <div
          style={{
            flex: isVertical ? "0 0 55%" : "0 0 480px",
            width: isVertical ? "100%" : "480px",
            height: isVertical ? "auto" : "700px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: opacity,
            transform: `perspective(1200px) rotateY(${rotationY}deg) translateY(${floatingY}px)`,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: isVertical ? "0 0 48px 48px" : "32px",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 60px 120px -20px rgba(0,0,0,0.95)",
              border: glassBorder,
            }}
          >
            <Img
              src={staticFile(cidade.visual.image)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: `scale(${kenBurns})`,
              }}
            />

            {/* Split Gradient Overlay */}
            <AbsoluteFill
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 40%, rgba(0,0,0,0.4) 100%)'
              }}
            />

            {/* Floating Rank Plate */}
            <div
              style={{
                position: "absolute",
                top: isVertical ? 60 : 40,
                left: isVertical ? 60 : 40,
                background: `linear-gradient(135deg, ${accentColor}, ${cidade.visual.secondaryColor || '#666'})`,
                padding: "14px 32px",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <span style={{
                color: "white",
                fontSize: "52px",
                fontWeight: 900,
                textShadow: "0 4px 12px rgba(0,0,0,0.5)",
              }}>
                #{position}
              </span>
            </div>
          </div>
        </div>

        {/* Cinematic Typography Panel */}
        <div
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: isVertical ? "center" : "flex-start",
            textAlign: isVertical ? "center" : "left",
            padding: isVertical ? "40px" : "0",
            opacity: interpolate(contentSpring, [0, 1], [0, 1]),
            transform: `translateY(${slideY}px)`,
          }}
        >
          <div style={{ position: 'relative', width: '100%' }}>
            <h1
              style={{
                fontSize: isVertical ? "95px" : "120px",
                fontWeight: 900,
                color: "white",
                margin: 0,
                lineHeight: 0.85,
                letterSpacing: "-0.06em", // Tight punchy tracking
                textShadow: "0 20px 60px rgba(0,0,0,0.6)",
                textTransform: "uppercase"
              }}
            >
              {cidade.name}
            </h1>

            <p style={{
              fontSize: "42px",
              color: colors.secondary,
              fontWeight: 600,
              margin: "12px 0 0 0",
              letterSpacing: "0.25em",
              opacity: 0.8,
              textTransform: "uppercase"
            }}>
              {cidade.state}
            </p>
          </div>

          {/* Obsidian Data Panel — com accent left */}
          <div
            style={{
              marginTop: "50px",
              background: glassBg,
              backdropFilter: "blur(24px)",
              border: glassBorder,
              borderRadius: "40px",
              padding: "48px 60px",
              width: "100%",
              maxWidth: isVertical ? "none" : "620px",
              position: "relative",
              boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
              borderLeft: `6px solid ${accentColor}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(90deg, ${accentColor}14, transparent 60%)`,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                fontSize: "20px",
                color: "rgba(255,255,255,0.4)",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                marginBottom: "8px",
              }}
            >
              {metric.title}
            </div>

            <div
              style={{
                fontSize: isVertical ? "84px" : "96px",
                color: "white",
                fontWeight: 900,
                lineHeight: 0.85,
                letterSpacing: "-0.05em",
                filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.1))",
              }}
            >
              {formattedValue}
            </div>

            {/* Metadata Badges */}
            <div style={{
              display: 'flex',
              gap: '20px',
              marginTop: '40px',
              flexWrap: 'wrap',
              justifyContent: isVertical ? 'center' : 'flex-start'
            }}>
              {cidade.data.dateLabel && (
                <div
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    padding: "12px 28px",
                    borderRadius: "100px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: colors.secondary,
                    fontSize: "22px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                  }}
                >
                  {cidade.data.dateLabel}
                </div>
              )}

              {cidade.nickname && (
                <div style={{
                  padding: "12px 0",
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "24px",
                  fontStyle: "italic",
                  fontWeight: 500,
                  maxWidth: '300px'
                }}>
                  "{cidade.nickname}"
                </div>
              )}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
