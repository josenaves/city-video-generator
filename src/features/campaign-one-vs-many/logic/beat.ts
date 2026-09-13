export const FPS = 30;

export function calculateFramesPerBeat(bpm: number): number {
    return (60 / bpm) * FPS;
}

export function beatsToFrames(beats: number, bpm: number): number {
    const fpb = calculateFramesPerBeat(bpm);
    return Math.round(beats * fpb);
}

export function snapToBeat(targetFrames: number, bpm: number): number {
    const fpb = calculateFramesPerBeat(bpm);
    const beats = Math.round(targetFrames / fpb);
    return Math.round(beats * fpb);
}

// Arredonda para BAIXO até o beat anterior (nunca estoura o orçamento de frames).
// Usado na divisão por batalha/status para que a soma nunca exceda maxTotalFrames.
export function snapDownToBeat(targetFrames: number, bpm: number): number {
    const fpb = calculateFramesPerBeat(bpm);
    const beats = Math.max(1, Math.floor(targetFrames / fpb));
    return Math.round(beats * fpb);
}
