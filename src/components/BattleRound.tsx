import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

type BattleRoundProps = {
    title: string;
    city1Value: number;
    city2Value: number;
    city1Name: string;
    city2Name: string;
    unit: string;
    format: string;
    type: string;
    city1Color: string;
    city2Color: string;
    inverse?: boolean;
    backgroundImage1: string;
    backgroundImage2: string;
};

export const BattleRound: React.FC<BattleRoundProps> = ({
    title,
    city1Value,
    city2Value,
    city1Name,
    city2Name,
    unit,
    format,
    type,
    city1Color,
    city2Color,
    inverse = false,
    backgroundImage1,
    backgroundImage2
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const progress = spring({
        frame: frame - 10,
        fps,
        config: { damping: 200 }
    });

    const val1 = interpolate(progress, [0, 1], [0, city1Value]);
    const val2 = interpolate(progress, [0, 1], [0, city2Value]);

    const maxVal = Math.max(city1Value, city2Value) * 1.2;

    const bar1Width = `${(val1 / maxVal) * 100}%`;
    const bar2Width = `${(val2 / maxVal) * 100}%`;

    const isWinner1 = inverse ? city1Value < city2Value : city1Value > city2Value;

    const showWinner = frame > 60;

    const formatValue = (val: number) => {
        if (format === 'compact') return new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(val);
        if (format === 'currency') return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumSignificantDigits: 3 }).format(val);
        if (format === 'percent') return val.toFixed(1);
        return val.toFixed(format === 'decimal3' ? 3 : 1);
    };

    // Background animation
    const scale = interpolate(frame, [0, 300], [1, 1.2]);
    const winnerImageWithFade = interpolate(frame, [60, 70], [0, 1], { extrapolateRight: 'clamp' });
    const currentBackgroundImage = isWinner1 ? backgroundImage1 : backgroundImage2;

    return (
        <AbsoluteFill>
            {/* Background Layer - FIRST in DOM with zIndex: 0 */}
            <AbsoluteFill style={{ zIndex: 0, flexDirection: 'row' }}>
                <div style={{ flex: 1, backgroundColor: '#003300', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        src={backgroundImage1}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.6,
                        }}
                    />
                </div>
                <div style={{ flex: 1, backgroundColor: '#330000', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                        src={backgroundImage2}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.6,
                        }}
                    />
                </div>

                {/* Winner Reveal Background Overlay */}
                <AbsoluteFill style={{ opacity: winnerImageWithFade }}>
                    <img
                        src={currentBackgroundImage}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 1,
                            transform: `scale(${scale})`,
                        }}
                    />
                </AbsoluteFill>
            </AbsoluteFill>

            {/* Content Layer - SECOND in DOM with zIndex: 1 */}
            <AbsoluteFill style={{ zIndex: 1, justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                <h1 style={{ fontSize: 80, color: 'gold', marginBottom: 60, textTransform: 'uppercase', textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>{title}</h1>

                <div style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: 40 }}>
                    {/* City 1 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 70, textShadow: '0 2px 5px rgba(0,0,0,0.8)' }}>
                            <span style={{ color: '#FFD700', fontWeight: 'bold' }}>{city1Name}</span>
                            <span>{formatValue(val1)} {format !== 'currency' && <span style={{ fontSize: 30 }}>{unit}</span>}</span>
                        </div>
                        <div style={{ width: '100%', height: 60, backgroundColor: 'rgba(50,50,50,0.8)', borderRadius: 10, overflow: 'hidden' }}>
                            <div style={{ width: bar1Width, height: '100%', backgroundColor: city1Color }} />
                        </div>
                    </div>

                    {/* City 2 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 70, textShadow: '0 2px 5px rgba(0,0,0,0.8)' }}>
                            <span style={{ color: '#FFFFFF', fontWeight: 'bold' }}>{city2Name}</span>
                            <span>{formatValue(val2)} {format !== 'currency' && <span style={{ fontSize: 30 }}>{unit}</span>}</span>
                        </div>
                        <div style={{ width: '100%', height: 60, backgroundColor: 'rgba(50,50,50,0.8)', borderRadius: 10, overflow: 'hidden' }}>
                            <div style={{ width: bar2Width, height: '100%', backgroundColor: city2Color }} />
                        </div>
                    </div>
                </div>

                {showWinner && (
                    <div style={{
                        position: 'absolute',
                        bottom: 200,
                        transform: `scale(${spring({ frame: frame - 60, fps, config: { stiffness: 200 } })})`
                    }}>
                        <h2 style={{
                            fontSize: 80,
                            color: isWinner1 ? city1Color : city2Color,
                            textShadow: '2px 2px 4px rgba(0,0,0,1)',
                            textAlign: 'center',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            padding: '10px 30px',
                            borderRadius: 20
                        }}>
                            {isWinner1 ? city1Name : city2Name}<br />VENCE!
                        </h2>
                    </div>
                )}
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
