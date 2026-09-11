import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const CityLabel: React.FC<{ name: string; value: string; delay?: number; durationInFrames: number }> = ({
  name,
  value,
  delay = 0,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  const y = interpolate(p, [0, 1], [16, 0]);
  const opacity = interpolate(p, [0, 1], [0, 1]);
  return (
    <div style={{ opacity, transform: `translateY(${y}px)`, display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 12, height: 12, borderRadius: 999, background: "#FFF200", boxShadow: "0 0 12px rgba(255,242,0,0.6)" }} />
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 700, color: "#FFFFFF" }}>{name}</span>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 22, fontWeight: 400, color: "#FFF200" }}>{value}</span>
    </div>
  );
};
