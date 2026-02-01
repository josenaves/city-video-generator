export interface Top10CidadesData {
  videoId: string;
  title: string;
  subtitle: string;
  theme: "elegant-dark" | "clean-modern" | "gradient-burst" | "data-focused";
  format: "vertical" | "horizontal";
  metric: {
    field: string;
    title: string;
    unit: string;
    format: "compact" | "currency" | "number" | "decimal" | "percent";
    order: "asc" | "desc";
  };
  cities: Top10Cidade[];
}

export interface Top10Cidade {
  name: string;
  state: string;
  nickname?: string;
  data: Record<string, any>;
  visual: {
    primaryColor: string;
    secondaryColor: string;
    image: string;
  };
}

export interface Top10VideoInput {
  videoData?: Top10CidadesData;
  overrideBeatsPerTransition?: number;
  audioTrack?: string;
  bpm?: number;
}

export interface Top10SceneProps {
  durationInFrames: number;
  cidade: Top10Cidade;
  position: number;
  metric: Top10CidadesData["metric"];
  theme: Top10CidadesData["theme"];
  format: Top10CidadesData["format"];
}

export interface Top10IntroProps {
  durationInFrames: number;
  title: string;
  subtitle: string;
  theme: Top10CidadesData["theme"];
  format: Top10CidadesData["format"];
}

export interface Top10OutroProps {
  durationInFrames: number;
  title: string;
  theme: Top10CidadesData["theme"];
  format: Top10CidadesData["format"];
  cities: Top10Cidade[];
}
