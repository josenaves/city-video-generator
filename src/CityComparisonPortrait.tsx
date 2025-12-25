import React from 'react';
import { AbsoluteFill, Sequence, Img, staticFile, useCurrentFrame, interpolate, useVideoConfig, Audio as RemotionAudio } from 'remotion';
import { CityCard } from './components/CityCard';
import { ComparisonBar } from './components/ComparisonBar';
import { FinalResult } from './components/FinalResult';
// @ts-ignore
import cityData from './data/cities.json';

const getValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const comparisons = [
    { prop: 'scores.economyScore', label: 'Economia', decimals: 0 },
    { prop: 'scores.educationScore', label: 'Educação', decimals: 0 },
    { prop: 'scores.healthScore', label: 'Saúde', decimals: 0 },
    { prop: 'scores.qualityOfLifeScore', label: 'Qualidade de Vida', decimals: 0 },
    { prop: 'geo.areaKm2', label: 'Área', suffix: ' km²', decimals: 0 },
    { prop: 'geo.altitudeM', label: 'Altitude', suffix: ' m', decimals: 0 },
    { prop: 'development.lifeExpectancy', label: 'Expectativa de Vida', suffix: ' anos', decimals: 1 },
    { prop: 'healthAndInfra.hospitalBedsPerThousand', label: 'Leitos por Mil', decimals: 1 },
    { prop: 'businessAndServices.companiesTotal', label: 'Total de Empresas', decimals: 0 },
];

const CityStats: React.FC<{
    city1: any;
    city2: any;
    prop: string;
    label: string;
    color1: string;
    color2: string;
    customSuffix?: string;
    decimals?: number;
    isCurrency?: boolean;
}> = ({ city1, city2, prop, label, color1, color2, customSuffix, decimals: customDecimals, isCurrency }) => {
    const frame = useCurrentFrame();

    const val1 = getValue(city1, prop);
    const val2 = getValue(city2, prop);

    const revealed = frame > 90;
    const winnerId = val1 > val2 ? city1.ibgeId : city2.ibgeId;

    const parseData = (val: number) => {
        let prefix = '';
        let suffix = customSuffix || '';
        let numeric = val;
        let decimals = customDecimals !== undefined ? customDecimals : 0;

        if (isCurrency) {
            prefix = 'R$ ';
            if (val >= 1_000_000_000) {
                numeric = val / 1_000_000_000;
                suffix = ' Bi';
                decimals = 1;
            } else if (val >= 1_000_000) {
                numeric = val / 1_000_000;
                suffix = ' Mi';
                decimals = 1;
            }
        }

        return { prefix, suffix, numeric, numericPoints: val, decimals };
    };

    const data1 = parseData(val1);
    const data2 = parseData(val2);

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ fontSize: 100, marginBottom: 50, fontFamily: 'sans-serif', color: 'white', textShadow: '0 4px 10px rgba(0,0,0,0.5)', textAlign: 'center' }}>{label}</h1>
            <div style={{ display: 'flex', gap: 50, flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 400 }}>
                    <CityCard
                        name={city1.name}
                        label={label}
                        color={color1}
                        isWinner={revealed && winnerId === city1.ibgeId}

                        numericValue={data1.numeric}
                        prefix={data1.prefix}
                        suffix={data1.suffix}
                        decimals={data1.decimals}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 400 }}>
                    <CityCard
                        name={city2.name}
                        label={label}
                        color={color2}
                        isWinner={revealed && winnerId === city2.ibgeId}

                        numericValue={data2.numeric}
                        prefix={data2.prefix}
                        suffix={data2.suffix}
                        decimals={data2.decimals}
                    />
                </div>
            </div>
            <div style={{ width: 800, marginTop: 50 }}>
                <ComparisonBar
                    value1={data1.numericPoints}
                    value2={data2.numericPoints}
                    color1={color1}
                    color2={color2}
                />
            </div>
        </AbsoluteFill>
    );
};

export const CityComparisonPortrait: React.FC = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    const cities = cityData.cities;
    const city1 = cities[0];
    const city2 = cities[1];

    const colorCity1 = cityData.visual.primaryColorCity1;
    const colorCity2 = cityData.visual.primaryColorCity2;

    let wins1 = 0;
    let wins2 = 0;

    comparisons.forEach(comp => {
        const v1 = getValue(city1, comp.prop);
        const v2 = getValue(city2, comp.prop);
        if (v1 > v2) wins1++;
        else if (v2 > v1) wins2++;
    });

    const scoreCity1 = wins1;
    const scoreCity2 = wins2;

    const winnerName = scoreCity1 > scoreCity2 ? city1.name :
        scoreCity2 > scoreCity1 ? city2.name : "Empate";
    const winnerColor = scoreCity1 > scoreCity2 ? colorCity1 :
        scoreCity2 > scoreCity1 ? colorCity2 : "#999";

    const scale = interpolate(frame, [0, durationInFrames], [1, 1.4]);

    return (
        <AbsoluteFill style={{ backgroundColor: '#111' }}>
            <AbsoluteFill style={{ overflow: 'hidden' }}>
                <Img
                    src={staticFile('catedral.jpg')}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.4,
                        transform: `scale(${scale})`
                    }}
                />
            </AbsoluteFill>

            {comparisons.map((comp, index) => (
                <Sequence key={comp.prop} from={index * 150} durationInFrames={150}>
                    <CityStats
                        city1={city1}
                        city2={city2}
                        prop={comp.prop}
                        label={comp.label}
                        customSuffix={comp.suffix}
                        decimals={comp.decimals}
                        color1={colorCity1}
                        color2={colorCity2}
                    />
                </Sequence>
            ))}

            <RemotionAudio src={staticFile("Beat Your Competition - Vibe Tracks.mp3")} />

            <Sequence from={comparisons.length * 150} durationInFrames={150}>
                <FinalResult
                    winnerName={winnerName}
                    score={`${scoreCity1} x ${scoreCity2}`}
                    color={winnerColor}
                />
            </Sequence>
        </AbsoluteFill>
    );
};
