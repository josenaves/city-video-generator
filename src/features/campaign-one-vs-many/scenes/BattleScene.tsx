import React from 'react';
import { AbsoluteFill, Sequence, staticFile } from 'remotion';
import { BattleIntro } from '../../../components/BattleIntro';
import { BattleRound } from '../../../components/BattleRound';
import { BattleWinner } from '../../../components/BattleWinner';
import { City, Round } from '../../../utils/ChampionshipManager';

type BattleSceneProps = {
    cityA: City;
    cityB: City;
    rounds: Round[];
    introDuration: number;
    roundDuration: number;
    finalDuration: number;
};

// Reusing and adapting the Battle logic for campaign
// This component orchestrates the sequence of intro -> rounds -> winner
// synced to the specific durations passed as props (which are beat-aligned)
export const BattleScene: React.FC<BattleSceneProps> = ({
    cityA,
    cityB,
    rounds,
    introDuration,
    roundDuration,
    finalDuration
}) => {
    const formatValue = (val: number, format: string) => {
        if (format === 'compact') return new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(val);
        if (format === 'currency') return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumSignificantDigits: 3 }).format(val);
        if (format === 'percent') return val.toFixed(1);
        return val.toFixed(format === 'decimal3' ? 3 : 1);
    };

    let wins1 = 0;
    let wins2 = 0;

    rounds.forEach((round: any) => {
        const v1 = cityA.data[round.field];
        const v2 = cityB.data[round.field];

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
    const winnerName = isTie ? 'EMPATE' : (wins1 > wins2 ? cityA.name : cityB.name);
    const winnerColor = isTie ? '#FFFFFF' : (wins1 > wins2 ? cityA.visual.primaryColor : cityB.visual.primaryColor);

    return (
        <AbsoluteFill>
            <Sequence from={0} durationInFrames={introDuration}>
                <BattleIntro
                    city1Name={cityA.name}
                    city2Name={cityB.name}
                    city1Nickname={cityA.nickname}
                    city2Nickname={cityB.nickname}
                    image1={staticFile(cityA.visual.image)}
                    image2={staticFile(cityB.visual.image)}
                />
            </Sequence>

            {rounds.map((round: any, index: number) => {
                const startTime = introDuration + (index * roundDuration);
                const city1Val = cityA.data[round.field];
                const city2Val = cityB.data[round.field];

                return (
                    <Sequence key={round.id} from={startTime} durationInFrames={roundDuration}>
                        <BattleRound
                            title={round.title}
                            city1Name={cityA.name}
                            city2Name={cityB.name}
                            city1Value={city1Val}
                            city2Value={city2Val}
                            city1Color={cityA.visual.primaryColor}
                            city2Color={cityB.visual.primaryColor}
                            unit={round.unit}
                            format={round.format}
                            type={round.type}
                            inverse={round.inverse}
                            backgroundImage1={staticFile(cityA.visual.image)}
                            backgroundImage2={staticFile(cityB.visual.image)}
                        />
                    </Sequence>
                );
            })}

            <Sequence from={introDuration + (rounds.length * roundDuration)} durationInFrames={finalDuration}>
                <BattleWinner
                    winnerName={winnerName}
                    winnerColor={winnerColor}
                    score={`${wins1} x ${wins2}`}
                    backgroundImage1={staticFile(cityA.visual.image)}
                    backgroundImage2={staticFile(cityB.visual.image)}
                    result={result}
                />
            </Sequence>
        </AbsoluteFill>
    );
};
