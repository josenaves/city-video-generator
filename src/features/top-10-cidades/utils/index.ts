import { Top10CidadesData, Top10Cidade } from "../types";

/**
 * Utilitários para Top 10 Cidades Video
 *
 * Remotion Best Practices References:
 * - calculate-metadata.md: Cálculo de duração e metadados
 * - charts.md: Formatação de dados estatísticos
 */

/**
 * Formata números según o formato especificado
 * See: rules/charts.md para padrões de visualização de dados
 */
export const formatNumber = (
  value: number,
  format: string,
  unit: string = "",
): string => {
  switch (format) {
    case "compact":
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M${unit ? ` ${unit}` : ""}`;
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}k${unit ? ` ${unit}` : ""}`;
      }
      return `${value.toLocaleString("pt-BR")}${unit ? ` ${unit}` : ""}`;

    case "currency":
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);

    case "decimal":
      return `${value.toFixed(1).replace(".", ",")}${unit ? ` ${unit}` : ""}`;

    case "percent":
      return `${value.toFixed(1).replace(".", ",")}%`;

    case "number":
    default:
      return `${value.toLocaleString("pt-BR")}${unit ? ` ${unit}` : ""}`;
  }
};

export const sortCitiesByMetric = (
  cities: Top10Cidade[],
  metric: Top10CidadesData["metric"],
): Top10Cidade[] => {
  return [...cities].sort((a, b) => {
    const aValue = a.data[metric.field];
    const bValue = b.data[metric.field];

    if (metric.order === "desc") {
      return bValue - aValue;
    }
    return aValue - bValue;
  });
};

/**
 * Converte batidas (beats) para frames baseado no BPM e FPS
 */
export const beatsToFrames = (beats: number, bpm: number, fps: number = 30): number => {
  return Math.round((beats * 60 * fps) / bpm);
};

export const calculateTop10Duration = (
  videoData: Top10CidadesData | "vertical" | "horizontal",
  bpm: number = 128
): number => {
  const fps = 30;
  const isVertical =
    typeof videoData === "string"
      ? videoData === "vertical"
      : videoData.format === "vertical";

  if (isVertical) {
    // Vertical sync (Fast Paced - Accelerated)
    const intro = beatsToFrames(4, bpm, fps);     // ~1.8s
    const regular = 7 * beatsToFrames(2, bpm, fps); // 7 cities x 2 beats (~0.9s each) - VERY FAST
    const top2 = 2 * beatsToFrames(4, bpm, fps);    // 2 cities x 4 beats (~1.8s each)
    const champion = beatsToFrames(8, bpm, fps);    // #1: 8 beats (~3.7s)
    const outro = beatsToFrames(4, bpm, fps);       // CTA: 4 beats (~1.8s)

    return intro + regular + top2 + champion + outro;
  } else {
    // Horizontal sync (Slowed down for 80s target)
    // 80s at 128bpm is ~170 beats.
    const intro = beatsToFrames(16, bpm, fps);      // 16 beats (~7.5s)
    const first8 = 3 * beatsToFrames(12, bpm, fps); // 3 cities x 12 beats (~5.6s each)
    const middle = 4 * beatsToFrames(12, bpm, fps); // 4 cities x 12 beats (~5.6s each)
    const top2 = 2 * beatsToFrames(16, bpm, fps);   // 2 cities x 16 beats (~7.5s each)
    const champion = beatsToFrames(16, bpm, fps);   // #1: 16 beats (~7.5s)
    const conclusion = beatsToFrames(12, bpm, fps); // End: 12 beats (~5.6s)

    return intro + first8 + middle + top2 + champion + conclusion;
  }
};

export const getThemeColors = (theme: Top10CidadesData["theme"]) => {
  switch (theme) {
    case "elegant-dark":
      return {
        background: "#0a0a0a",
        primary: "#ffffff",
        secondary: "#888888",
        accent: "#ffd700",
        gradient: ["linear-gradient(135deg, #667eea 0%, #764ba2 100%)"],
      };

    case "clean-modern":
      return {
        background: "#ffffff",
        primary: "#1a1a1a",
        secondary: "#666666",
        accent: "#3b82f6",
        gradient: ["linear-gradient(135deg, #667eea 0%, #764ba2 100%)"],
      };

    case "gradient-burst":
      return {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        primary: "#ffffff",
        secondary: "#e0e0e0",
        accent: "#fbbf24",
        gradient: ["linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"],
      };

    case "data-focused":
      return {
        background: "#f8f9fa",
        primary: "#212529",
        secondary: "#6c757d",
        accent: "#0ea5e9",
        gradient: ["linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)"],
      };

    default:
      return {
        background: "#0a0a0a",
        primary: "#ffffff",
        secondary: "#888888",
        accent: "#ffd700",
        gradient: ["linear-gradient(135deg, #667eea 0%, #764ba2 100%)"],
      };
  }
};
