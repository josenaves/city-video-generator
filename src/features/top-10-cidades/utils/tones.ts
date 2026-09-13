export type Top10BackgroundTone =
  | "cyber-cyan"       // Electric Cyan / Neon Blue (tech, futuristic, elegant)
  | "obsidian-gold"    // Obsidian / Warm Amber & Gold (luxury, documentary)
  | "neon-purple"      // Cosmic Violet / Neon Purple (vibrant, modern)
  | "emerald-teal"     // Deep Emerald / Aurora Teal (fresh, premium nature)
  | "slate-monochrome" // Dark Slate / Silver Smoke (clean, minimalist)
  | "crimson-dark"     // Dark Crimson (the red tone, but refined with glowing embers)
  | "dynamic-rank";    // Transitions color dynamically from #10 to #1 champion

export interface ToneConfig {
  id: string;
  name: string;
  baseBg: string;
  accentColor: string;
  secondaryColor: string;
  washColor: string;
  washOpacity: number;
  particleColors: string[];
  orbColor: string;
}

export const TONE_PRESETS: Record<Exclude<Top10BackgroundTone, "dynamic-rank">, ToneConfig> = {
  "cyber-cyan": {
    id: "cyber-cyan",
    name: "Cyber Cyan & Electric Blue",
    baseBg: "#050a14",
    accentColor: "#00f2fe",
    secondaryColor: "#4facfe",
    washColor: "#0052d4",
    washOpacity: 0.35,
    particleColors: ["#00f2fe", "#4facfe", "#a0e9ff", "#ffffff", "#38bdf8"],
    orbColor: "#0072ff",
  },
  "obsidian-gold": {
    id: "obsidian-gold",
    name: "Obsidian Gold & Amber",
    baseBg: "#080704",
    accentColor: "#ffd700",
    secondaryColor: "#f59e0b",
    washColor: "#78350f",
    washOpacity: 0.3,
    particleColors: ["#ffd700", "#f59e0b", "#fbbf24", "#ffffff", "#f97316"],
    orbColor: "#d97706",
  },
  "neon-purple": {
    id: "neon-purple",
    name: "Cosmic Violet & Neon Purple",
    baseBg: "#090414",
    accentColor: "#c084fc",
    secondaryColor: "#9333ea",
    washColor: "#4c1d95",
    washOpacity: 0.35,
    particleColors: ["#c084fc", "#e879f9", "#f43f5e", "#ffffff", "#a855f7"],
    orbColor: "#7e22ce",
  },
  "emerald-teal": {
    id: "emerald-teal",
    name: "Deep Emerald & Aurora Teal",
    baseBg: "#030e09",
    accentColor: "#10b981",
    secondaryColor: "#06b6d4",
    washColor: "#064e3b",
    washOpacity: 0.35,
    particleColors: ["#34d399", "#2dd4bf", "#6ee7b7", "#ffffff", "#059669"],
    orbColor: "#059669",
  },
  "slate-monochrome": {
    id: "slate-monochrome",
    name: "Slate Monolith & Silver",
    baseBg: "#090b10",
    accentColor: "#38bdf8",
    secondaryColor: "#94a3b8",
    washColor: "#1e293b",
    washOpacity: 0.38,
    particleColors: ["#e2e8f0", "#94a3b8", "#38bdf8", "#ffffff", "#cbd5e1"],
    orbColor: "#334155",
  },
  "crimson-dark": {
    id: "crimson-dark",
    name: "Dark Crimson Embers",
    baseBg: "#0d0406",
    accentColor: "#ef4444",
    secondaryColor: "#f43f5e",
    washColor: "#881337",
    washOpacity: 0.35,
    particleColors: ["#f87171", "#fb7185", "#fca5a5", "#ffffff", "#ef4444"],
    orbColor: "#991b1b",
  },
};

export const getToneConfig = (
  tone: Top10BackgroundTone = "cyber-cyan",
  position?: number
): ToneConfig => {
  if (tone === "dynamic-rank" && position !== undefined) {
    if (position === 1) {
      return TONE_PRESETS["obsidian-gold"];
    } else if (position <= 3) {
      return TONE_PRESETS["neon-purple"];
    } else if (position <= 7) {
      return TONE_PRESETS["cyber-cyan"];
    } else {
      return TONE_PRESETS["slate-monochrome"];
    }
  }

  if (tone in TONE_PRESETS) {
    return TONE_PRESETS[tone as Exclude<Top10BackgroundTone, "dynamic-rank">];
  }

  return TONE_PRESETS["cyber-cyan"];
};
