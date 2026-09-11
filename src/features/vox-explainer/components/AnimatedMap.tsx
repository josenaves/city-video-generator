import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * AnimatedMap — mapa flat estilo Vox com zoom + highlight.
 * Implementação real deve usar SVG/Canvas ou Mapbox static image + interpolate para zoom.
 */
export const AnimatedMap: React.FC<{
  description: string;
  highlight?: string[];
  durationInFrames: number;
}> = ({ description, highlight, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.15], {
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 0.3 * fps, durationInFrames - 0.3 * fps, durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity, transform: `scale(${zoom})`, width: "100%", height: "100%", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#666", fontSize: 24 }}>{description} {highlight?.join(", ")}</span>
    </div>
  );
};
