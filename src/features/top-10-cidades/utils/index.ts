import { Top10CidadesData, Top10Cidade } from "../types";

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

export const calculateTop10Duration = (videoData: Top10CidadesData): number => {
  const fps = 30;
  const isVertical = videoData.format === "vertical";

  if (isVertical) {
    // Vertical format (42s total)
    const intro = 3 * fps; // 3s
    const regular = 7 * 3 * fps; // #10-#4: 7 cities × 3s
    const top3 = 3 * 4 * fps; // Top 3: 3 cities × 4s
    const champion = 4 * fps; // #1 special: 4s
    const outro = 2 * fps; // Outro: 2s

    return intro + regular + top3 + champion + outro;
  } else {
    // Horizontal format (65s total)
    const intro = 5 * fps; // Intro: 5s
    const first8 = 3 * 4 * fps; // #10-#8: 3 cities × 4s
    const middle = 4 * 4 * fps; // #7-#4: 4 cities × 4s
    const top3 = 3 * 6 * fps; // Top 3: 3 cities × 6s
    const champion = 8 * fps; // #1 special: 8s
    const conclusion = 6 * fps; // Conclusion: 6s

    return intro + first8 + middle + top3 + champion + conclusion;
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
