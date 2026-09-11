import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const BarChart: React.FC<{
  items: { label: string; value: number }[];
  unit?: string;
  durationInFrames: number;
}> = ({ items, unit = "%", durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const max = Math.max(...items.map((i) => i.value));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", padding: 40 }}>
      {items.map((item, idx) => {
        const delay = idx * 8;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 200 } });
        const width = interpolate(progress, [0, 1], [0, (item.value / max) * 100]);
        return (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ width: 220, textAlign: "right", color: "#fff", fontSize: 22 }}>{item.label}</span>
            <div style={{ flex: 1, height: 48, background: "#222", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ width: `${width}%`, height: "100%", background: idx === 0 ? "#FFF200" : "#2D7D46", borderRadius: 8 }} />
            </div>
            <span style={{ width: 100, color: idx === 0 ? "#FFF200" : "#fff", fontSize: 28, fontWeight: 700 }}>
              {item.value.toFixed(1)}{unit}
            </span>
          </div>
        );
      })}
    </div>
  );
};
