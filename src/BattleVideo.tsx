import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { BattleIntro } from './components/BattleIntro';
import { BattleRound } from './components/BattleRound';
import { BattleWinner } from './components/BattleWinner';

type BattleVideoProps = {
    battleData: any;
    image1: string;
    image2: string;
};

export const BattleVideo: React.FC<BattleVideoProps> = ({ battleData, image1, image2 }) => {
    const { cities, rounds } = battleData;
    const city1 = cities[0];
    const city2 = cities[1];

    const introDuration = 90; // 3 sec
    const roundDuration = 120; // 4 sec
    const finalDuration = 60; // 2 sec

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            <Audio src={staticFile('Beat Your Competition - Vibe Tracks.mp3')} volume={0.5} />

            <Sequence from={0} durationInFrames={introDuration}>
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
                const startTime = introDuration + (index * roundDuration);
                const city1Val = city1.data[round.field];
                const city2Val = city2.data[round.field];

                return (
                    <Sequence key={round.id} from={startTime} durationInFrames={roundDuration}>
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
                        />
                    </Sequence>
                );
            })}

            {/* Calculate Score and Show Winner */}
            {(() => {
                let wins1 = 0;
                let wins2 = 0;
                const formatValue = (val: number, format: string) => {
                    if (format === 'compact') return new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(val);
                    if (format === 'currency') return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumSignificantDigits: 3 }).format(val);
                    if (format === 'percent') return val.toFixed(1);
                    return val.toFixed(format === 'decimal3' ? 3 : 1);
                };

                rounds.forEach((round: any) => {
                    const v1 = city1.data[round.field];
                    const v2 = city2.data[round.field];

                    // Check for tie using formatted values (visual tie)
                    const f1 = formatValue(v1, round.format);
                    const f2 = formatValue(v2, round.format);

                    if (f1 === f2) {
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

                return (
                    <Sequence from={introDuration + (rounds.length * roundDuration)} durationInFrames={finalDuration}>
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
        </AbsoluteFill>
    );
};
