import React from "react";
import { Img, staticFile } from "remotion";

export const SplitComparison: React.FC<{
  leftLabel: string;
  rightLabel: string;
  leftImage?: string;
  rightImage?: string;
  durationInFrames: number;
}> = ({ leftLabel, rightLabel, leftImage, rightImage }) => {
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <div style={{ flex: 1, background: "#222", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRight: "4px solid #FFF200" }}>
        {leftImage && <Img src={staticFile(leftImage)} style={{ width: "100%", height: "70%", objectFit: "cover" }} />}
        <span style={{ color: "#fff", fontSize: 24, marginTop: 16 }}>{leftLabel}</span>
      </div>
      <div style={{ flex: 1, background: "#1a3a1a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {rightImage && <Img src={staticFile(rightImage)} style={{ width: "100%", height: "70%", objectFit: "cover" }} />}
        <span style={{ color: "#FFF200", fontSize: 24, marginTop: 16, fontWeight: 700 }}>{rightLabel}</span>
      </div>
    </div>
  );
};
