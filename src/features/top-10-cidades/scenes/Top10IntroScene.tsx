import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { Top10IntroProps } from "../types";
import { getThemeColors } from "../utils";
import { getToneConfig } from "../utils/tones";
import { FloatingParticles } from "../components/FloatingParticles";

const FONT_FAMILY = "'Outfit', Inter, sans-serif";

export const Top10Intro: React.FC<Top10IntroProps> = ({
  durationInFrames,
  title,
  subtitle,
  theme,
  format,
  backgroundTone,
  introAudio,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const colors = getThemeColors(theme);
  const isVertical = format === "vertical";
  const toneConfig = getToneConfig(backgroundTone);
  const accent = backgroundTone ? toneConfig.accentColor : colors.accent;

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
        backgroundColor: toneConfig.baseBg,
        fontFamily: FONT_FAMILY,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Narração da intro — "Canal Cidades Brasileiras apresenta..." (pt-BR-AntonioNeural) */}
      {introAudio && <Audio src={staticFile(introAudio)} volume={1} />}

      {/* 1. Atmospheric Background with Floating Particles */}
      <AbsoluteFill style={{ zIndex: 0, backgroundColor: toneConfig.baseBg }}>
        {/* Cinematic Gradient Flow */}
        <div style={{
          position: "absolute",
          top: '-20%',
          left: '-20%',
          width: '140%',
          height: '140%',
          background: `radial-gradient(circle at 50% 50%, ${toneConfig.accentColor}20 0%, transparent 60%)`,
          transform: `scale(${bgScale}) rotate(${frame / 200}rad)`,
          filter: 'blur(100px)',
        }} />

        {/* Dynamic Glowing Orb */}
        <div style={{
          position: "absolute",
          top: '10%',
          right: '5%',
          width: '700px',
          height: '700px',
          background: toneConfig.orbColor,
          borderRadius: "50%",
          filter: "blur(160px)",
          opacity: interpolate(entranceSpring, [0, 1], [0, 0.25])
        }} />

        {/* Partículas Voando Animadas */}
        <FloatingParticles
          count={isVertical ? 65 : 85}
          colors={toneConfig.particleColors}
          direction="up"
          speedMultiplier={1.1}
        />
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
                  <span style={{ color: accent, display: 'block', marginTop: '10px' }}>{part2}</span>
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
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
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
