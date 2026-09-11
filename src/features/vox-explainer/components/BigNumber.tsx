import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const BigNumber: React.FC<{ value: number; suffix?: string; label?: string; durationInFrames: number }> = ({
  value,
  suffix = "%",
  label,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, config: { damping: 200 } });
  const display = interpolate(progress, [0, 1], [0, value]);
  const opacity = interpolate(frame, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ opacity, textAlign: "center" }}>
      <div style={{ fontSize: 160, fontWeight: 800, color: "#FFF200", lineHeight: 1 }}>{display.toFixed(1)}{suffix}</div>
      {label && <div style={{ fontSize: 28, color: "#fff", marginTop: 8 }}>{label}</div>}
    </div>
  );
};
