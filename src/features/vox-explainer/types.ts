export type VoxProjectId = string;

export interface VoxSceneMeta {
  id: string;
  duration: string; // e.g. "32s" or "28s"
  durationInFrames: number; // at 30fps
}

export interface VoxChartItem {
  label: string;
  value: number;
}

export interface VoxChart {
  type: "horizontal_bar" | "vertical_bar" | "comparison";
  items: VoxChartItem[];
  unit?: string;
}

export interface VoxMap {
  description: string;
  highlight?: string[];
  zoom?: number;
}

export interface VoxAssetRef {
  id: string;
  type: "IMAGE" | "VIDEO" | "MAP" | "CHART" | "ICON" | "TEXT" | "AUDIO";
  description: string;
  filename: string;
  source: "stock_or_generated" | "generated" | "external" | "ibge" | "local";
  ai_generated: boolean;
  required: boolean;
  prompt?: string;
}

export interface VoxExplainerProps {
  project: string;
  audioSrc?: string;
  fps?: number;
}
