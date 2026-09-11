import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { BattleIntro } from './components/BattleIntro';
import { BattleRound } from './components/BattleRound';
import { BattleWinner } from './components/BattleWinner';

type BattleVideoProps = {
    battleData: any;
    image1: string;
    image2: string;
    overrideBeatsPerTransition?: number;
    audioTrack?: string;
    bpm?: number;
    useDynamicTiming?: boolean;
    isLong?: boolean;
};

// Sincronizado com música - cada transição a cada X batidas
export const calculateFramesPerBeat = (bpm: number) => (60 / bpm) * 30;
export const framesPerBeat = calculateFramesPerBeat(128); // Default 128 BPM

/**
 * Função para calcular o timing dinâmico das seções (Rápido-Lento-Rápido)
 * Agora suporta uma versão estendida para vídeos de mais de 1 minuto.
 */
export const getDynamicTiming = (numRounds: number, bpm = 128, isLong = false) => {
    const fpb = calculateFramesPerBeat(bpm);

    // Intro: Mais épica na versão longa
    const intro = Math.round((isLong ? 12 : 4) * fpb);

    // Padrões de batidas para evitar monotonia
    const standardBeats = [4, 2, 6, 3, 5, 2, 4, 3];
    const longBeats = [10, 6, 12, 8, 10, 6, 14, 8, 10, 12]; // Batidas mais longas para contemplação

    const pattern = isLong ? longBeats : standardBeats;

    const rounds = Array.from({ length: numRounds }).map((_, i) =>
        Math.round((pattern[i % pattern.length]) * fpb)
    );

    // Final: Fechamento com mais impacto
    const final = Math.round((isLong ? 12 : 6) * fpb);
    const totalFrames = intro + rounds.reduce((a, b) => a + b, 0) + final;

    return { intro, rounds, final, totalFrames, isDynamic: true as const };
};

/**
 * Função para calcular o timing fixo tradicional (Legado)
 */
export const getTiming = (beats = 3, bpm = 128) => {
    const fpb = calculateFramesPerBeat(bpm);
    const transition = Math.round(beats * fpb);
    return {
        transition,
        intro: transition * 2,
        round: transition * 2,
        final: transition * 2,
        totalFrames: (transition * 2) + (transition * 2 * 6 /* placeholder, calculated in component */) + (transition * 2), // This totalFrames is just for type consistency
        isDynamic: false as const
    };
};

export const BattleVideo: React.FC<BattleVideoProps> = ({
    battleData,
    image1,
    image2,
    overrideBeatsPerTransition,
    audioTrack = 'audio/Beat Your Competition - Vibe Tracks.mp3',
    bpm = 128,
    useDynamicTiming = false,
    isLong = false
}) => {
    const frame = useCurrentFrame();
    const { cities, rounds } = battleData;
    const city1 = cities[0];
    const city2 = cities[1];

    // Decide qual sistema de timing usar
    const currentTiming = useDynamicTiming
        ? getDynamicTiming(rounds.length, bpm, isLong)
        : (() => {
            const t = getTiming(overrideBeatsPerTransition || battleData.timing?.beatsPerTransition || 3, bpm);
            return {
                ...t,
                rounds: Array(rounds.length).fill(t.round),
                totalFrames: t.intro + (rounds.length * t.round) + t.final
            };
        })();

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            <Audio src={staticFile(audioTrack)} volume={0.5} />

            <Sequence durationInFrames={currentTiming.intro}>
                <BattleIntro
                    city1Name={city1.name}
                    city2Name={city2.name}
                    city1Nickname={city1.nickname}
                    city2Nickname={city2.nickname}
                    image1={staticFile(image1)}
                    image2={staticFile(image2)}
                />
            </Sequence>

            {rounds.map((round: any, index: number) => {
                // Calcula o início somando as durações anteriores
                const startTime = currentTiming.intro + (currentTiming.rounds.slice(0, index).reduce((a, b) => a + b, 0));
                const duration = currentTiming.rounds[index];

                const city1Val = city1.data[round.field];
                const city2Val = city2.data[round.field];

                return (
                    <Sequence key={round.id} from={startTime} durationInFrames={duration}>
                        <BattleRound
                            title={round.title}
                            city1Name={city1.name}
                            city2Name={city2.name}
                            city1Value={city1Val}
                            city2Value={city2Val}
                            city1Color={city1.visual.primaryColor}
                            city2Color={city2.visual.primaryColor}
                            unit={round.unit}
                            format={round.format}
                            type={round.type}
                            inverse={round.inverse}
                            backgroundImage1={staticFile(image1)}
                            backgroundImage2={staticFile(image2)}
                            durationInFrames={duration}
                        />
                    </Sequence>
                );
            })}

            {/* Calculate Score and Show Winner */}
            {(() => {
                let wins1 = 0;
                let wins2 = 0;
                const isVisualTie = (a: number, b: number, format: string): boolean => {
                    if (format === 'year' || format === 'integer') return Math.round(a) === Math.round(b);
                    if (format === 'decimal3') return Math.abs(a - b) < 0.0005;
                    if (format === 'percent' || format === 'decimal' || format === 'number') return Math.abs(a - b) < 0.05;
                    // compact/currency: visual rounding matters, compare formatted compact
                    const fmt = (v: number) => {
                        if (format === 'compact') return new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(v);
                        if (format === 'currency') return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumSignificantDigits: 3 }).format(v);
                        return String(v);
                    };
                    return fmt(a) === fmt(b);
                };

                rounds.forEach((round: any) => {
                    const v1 = city1.data[round.field];
                    const v2 = city2.data[round.field];

                    if (isVisualTie(v1, v2, round.format)) {
                        wins1++;
                        wins2++;
                        return;
                    }

                    if (round.inverse) {
                        if (v1 < v2) wins1++;
                        else if (v2 < v1) wins2++;
                    } else {
                        if (v1 > v2) wins1++;
                        else if (v2 > v1) wins2++;
                    }
                });

                const isTie = wins1 === wins2;
                const result = isTie ? 'tie' : (wins1 > wins2 ? 'city1' : 'city2');

                const winnerName = isTie ? 'EMPATE' : (wins1 > wins2 ? city1.name : city2.name);
                const winnerColor = isTie ? '#FFFFFF' : (wins1 > wins2 ? city1.visual.primaryColor : city2.visual.primaryColor);

                const finalStart = currentTiming.intro + currentTiming.rounds.reduce((a, b) => a + b, 0);

                return (
                    <Sequence from={finalStart} durationInFrames={currentTiming.final}>
                        <BattleWinner
                            winnerName={winnerName}
                            winnerColor={winnerColor}
                            score={`${wins1} x ${wins2}`}
                            backgroundImage1={staticFile(image1)}
                            backgroundImage2={staticFile(image2)}
                            result={result}
                        />
                    </Sequence>
                );
            })()}
            {/* Progress Bar - Retention Hook */}
            {(() => {
                const totalDuration = currentTiming.totalFrames;
                const progress = interpolate(frame, [0, totalDuration], [0, 100], { extrapolateRight: 'clamp' });

                return (
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: `${progress}%`,
                        height: 15,
                        backgroundColor: '#FFD700', // Gold color
                        zIndex: 100,
                        boxShadow: '0 -2px 10px rgba(255, 215, 0, 0.5)'
                    }} />
                );
            })()}
        </AbsoluteFill>
    );
};
