/**
 * VoxExplainer timing — long-form documentary, NOT BPM-synced.
 * Durations are explicit per scene; sum must be 6–8 min (10800–14400f @30fps).
 */
export const fps = 30;

export const durationToFrames = (duration: string): number => {
  // "32s" | "1m12s" | "6m30s"
  const sMatch = duration.match(/^(\d+)s$/);
  if (sMatch) return parseInt(sMatch[1], 10) * fps;
  const msMatch = duration.match(/^(\d+)m(\d+)s$/);
  if (msMatch) return (parseInt(msMatch[1], 10) * 60 + parseInt(msMatch[2], 10)) * fps;
  const mMatch = duration.match(/^(\d+)m$/);
  if (mMatch) return parseInt(mMatch[1], 10) * 60 * fps;
  throw new Error(`Invalid duration: ${duration}`);
};

export const sumFrames = (durations: string[]): number =>
  durations.reduce((acc, d) => acc + durationToFrames(d), 0);

// VoxExplainer total for "cidades-mais-verdes-sp": 13 scenes = ~4m05s = 7350f
// Compactado para casar com TTS real 151.5s (2m31s) + holds visuais — opção 1 do usuário
export const VOX_CIDADES_VERDES_DURATIONS = [
  "12s", // 01 hook SP concreto — VTT 0-7.6s + hold
  "18s", // 02 curiosidade interior — VTT 7.6-23s
  "21s", // 03 ranking barras — VTT 23-43s
  "20s", // 04 mapa 3 cidades — VTT 43-56s
  "21s", // 05 por que — planejamento — VTT 56-75s
  "18s", // 06 timeline plantio→cidade — VTT 75-92s
  "20s", // 07 impacto sombra/calor — VTT 92-110s
  "16s", // 08 split rua sem×com — VTT 110-125s
  "15s", // 09 chuva/infiltração — VTT 125-136s
  "21s", // 10 e a capital — desigualdade — VTT 136-157s
  "20s", // 11 conclusão planejamento — VTT 157-179s
  "14s", // 12 pergunta final — VTT 179-192s
  "9s",  // 13 CTA comentários — VTT 192-151s + tail (ajustado)
] as const;

export const VOX_CIDADES_VERDES_TOTAL_FRAMES = sumFrames([...VOX_CIDADES_VERDES_DURATIONS]); // 6750 = 3m45s (compactado de 7m10s para casar com TTS 151s)
