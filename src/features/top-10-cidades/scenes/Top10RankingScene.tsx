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
 * Top10RankingItem - Apresentação de cada cidade no ranking
 *
 * Remotion Best Practices References:
 * - images.md: Carregamento de imagens (Img component)
 * - animations.md: Animações de entrada (spring)
 * - timing.md: Interpolação de valores
 * - sequencing.md: Sequenciamento de elementos
 */

export const Top10RankingItem: React.FC<Top10SceneProps> = ({
  durationInFrames,
  cidade,
  position,
  metric,
  theme,
  format,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const colors = getThemeColors(theme);

  const slideIn = spring({
    frame,
    fps,
    config: { damping: 20 },
  });

  const valueAnimation = spring({
    frame: Math.max(0, frame - fps / 3),
    fps,
    config: { damping: 25 },
  });

  const isVertical = format === "vertical";
  const isTop3 = position <= 3;
  const isChampion = position === 1;

  const translateX = interpolate(slideIn, [0, 1], [isVertical ? 100 : 200, 0]);
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);
  const scale = isChampion
    ? interpolate(valueAnimation, [0, 1], [0.9, 1.1])
    : 1;

  const metricValue = cidade.data[metric.field];
  const formattedValue = formatNumber(metricValue, metric.format, metric.unit);

  const backgroundColor = isTop3 ? colors.accent + "20" : colors.background;
  const borderColor = isTop3 ? colors.accent : colors.primary + "30";
  const positionColor = isChampion ? colors.accent : colors.primary;

  const positionStyle: React.CSSProperties = {
    position: "absolute",
    fontSize: isTop3
      ? isVertical
        ? "48px"
        : "64px"
      : isVertical
        ? "36px"
        : "48px",
    fontWeight: "bold",
    color: positionColor,
    opacity,
    transform: `translateX(${translateX}px) scale(${scale})`,
    textShadow: isChampion ? "0 0 20px rgba(255, 215, 0, 0.5)" : "none",
  };

  if (isVertical) {
    positionStyle.top = "20px";
    positionStyle.left = "20px";
  } else {
    positionStyle.left = "40px";
    positionStyle.top = "50%";
    positionStyle.transform = `translateY(-50%) translateX(${translateX}px) scale(${scale})`;
  }

  return (
    <AbsoluteFill
      style={{
        background: colors.background,
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
        padding: isVertical ? "30px 20px" : "40px",
      }}
    >
      <div style={positionStyle}>#{position}</div>

      <div
        style={{
          width: isVertical ? "100%" : "200px",
          height: isVertical ? "200px" : "150px",
          marginBottom: isVertical ? "20px" : 0,
          marginRight: isVertical ? 0 : "30px",
          borderRadius: "12px",
          overflow: "hidden",
          border: `3px solid ${borderColor}`,
          opacity,
          transform: `translateX(${translateX}px)`,
          background: `linear-gradient(135deg, ${cidade.visual.primaryColor}80, ${cidade.visual.secondaryColor}80)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Img
          src={staticFile(cidade.visual.image)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: isVertical ? "28px" : "24px",
              fontWeight: "bold",
              color: colors.primary,
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              textAlign: "center",
            }}
          >
            {cidade.state}
          </div>
          <div
            style={{
              fontSize: isVertical ? "12px" : "10px",
              color: colors.secondary,
              textAlign: "center",
              marginTop: "5px",
            }}
          >
            {cidade.name}
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          textAlign: isVertical ? "center" : "left",
          opacity,
          transform: `translateX(${translateX}px)`,
        }}
      >
        <div
          style={{
            fontSize: isVertical ? "28px" : "36px",
            fontWeight: "bold",
            color: colors.primary,
            marginBottom: isVertical ? "8px" : "10px",
          }}
        >
          {cidade.name}
        </div>

        {cidade.nickname && (
          <div
            style={{
              fontSize: isVertical ? "18px" : "20px",
              color: colors.secondary,
              marginBottom: isVertical ? "12px" : "15px",
              fontStyle: "italic",
            }}
          >
            "{cidade.nickname}"
          </div>
        )}

        <div
          style={{
            fontSize: isVertical ? "14px" : "16px",
            color: colors.secondary,
            marginBottom: isVertical ? "15px" : "20px",
          }}
        >
          {cidade.state}
        </div>

        <div
          style={{
            background: backgroundColor,
            border: `2px solid ${borderColor}`,
            borderRadius: "8px",
            padding: isVertical ? "15px" : "20px",
            transform: `scale(${valueAnimation})`,
          }}
        >
          <div
            style={{
              fontSize: isVertical ? "16px" : "18px",
              color: colors.secondary,
              marginBottom: "5px",
            }}
          >
            {metric.title}
          </div>
          <div
            style={{
              fontSize: isChampion
                ? isVertical
                  ? "32px"
                  : "40px"
                : isVertical
                  ? "24px"
                  : "30px",
              fontWeight: "bold",
              color: isChampion ? colors.accent : colors.primary,
            }}
          >
            {formattedValue}
          </div>
        </div>
      </div>

      {isChampion && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle, ${colors.accent}20 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
