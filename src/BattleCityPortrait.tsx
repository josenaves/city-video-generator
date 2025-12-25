import React from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { BattleIntro } from './components/BattleIntro';
import { BattleRound } from './components/BattleRound';
import { BattleWinner } from './components/BattleWinner';
// @ts-ignore
import battleData from './data/uberlandia-uberaba.json';

export const BattleCityPortrait: React.FC = () => {
    const { cities, rounds } = battleData;
    const city1 = cities[0];
    const city2 = cities[1];

    const introDuration = 90; // 3 sec
    const roundDuration = 150; // 5 sec
    const finalDuration = 210; // 7 sec

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            <Audio src={staticFile('Beat Your Competition - Vibe Tracks.mp3')} volume={0.5} />

            <Sequence from={0} durationInFrames={introDuration}>
                <BattleIntro city1Name={city1.name} city2Name={city2.name} />
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
                            backgroundImage1={staticFile('uberlandia.jpg')}
                            backgroundImage2={staticFile('uberaba.jpg')}
                        />
                    </Sequence>
                );
            })}

            {/* Calculate Score */}
            {(() => {
                let wins1 = 0;
                let wins2 = 0;
                rounds.forEach((round: any) => {
                    const v1 = city1.data[round.field];
                    const v2 = city2.data[round.field];
                    if (v1 > v2) wins1++;
                    else if (v2 > v1) wins2++;
                });

                return (
                    <Sequence from={introDuration + (rounds.length * roundDuration)} durationInFrames={finalDuration}>
                        <BattleWinner
                            winnerName={city1.name}
                            winnerColor={city1.visual.primaryColor}
                            score={`${wins1} x ${wins2}`}
                            backgroundImage1={staticFile('uberlandia.jpg')}
                            backgroundImage2={staticFile('uberaba.jpg')}
                        />
                    </Sequence>
                );
            })()}
        </AbsoluteFill>
    );
};
