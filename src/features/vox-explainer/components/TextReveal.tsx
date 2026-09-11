import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const TextReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  durationInFrames: number;
}> = ({ children, delay = 0, style, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200, stiffness: 90, mass: 0.8 }, // Vox puro: suave, sem bounce
  });

  const y = interpolate(progress, [0, 1], [24, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateRight: "clamp" });

  const outOpacity = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity: opacity * outOpacity,
        transform: `translateY(${y}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const BigTitle: React.FC<{ children: string; durationInFrames: number; color?: string }> = ({
  children,
  durationInFrames,
  color = "#FFFFFF",
}) => (
  <TextReveal durationInFrames={durationInFrames} style={{ textAlign: "center" }}>
    <div
      style={{
        fontFamily: "Inter, IBM Plex Sans, sans-serif",
        fontSize: 112,
        fontWeight: 800,
        letterSpacing: "-3px",
        lineHeight: 0.9,
        color,
      }}
    >
      {children}
    </div>
  </TextReveal>
);

export const YellowHighlight: React.FC<{ children: string; durationInFrames: number; delay?: number }> = ({
  children,
  durationInFrames,
  delay = 8,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const w = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const width = interpolate(w, [0, 1], [0, 100]);
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          fontFamily: "Inter, IBM Plex Sans, sans-serif",
          fontSize: 56,
          fontWeight: 700,
          color: "#FFFFFF",
          position: "relative",
          zIndex: 2,
        }}
      >
        {children}
      </span>
      <div
        style={{
          position: "absolute",
          bottom: 6,
          left: 0,
          width: `${width}%`,
          height: 18,
          background: "#FFF200",
          zIndex: 1,
          opacity: 0.95,
        }}
      />
    </div>
  );
};
