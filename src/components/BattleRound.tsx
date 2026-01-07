import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img } from 'remotion';

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
        frame: frame - 5,
        fps,
        config: { stiffness: 200, damping: 20 } // Snappier for Shorts
    });

    const val1 = interpolate(progress, [0, 1], [0, city1Value]);
    const val2 = interpolate(progress, [0, 1], [0, city2Value]);

    const maxVal = Math.max(city1Value, city2Value) * 1.2;

    const bar1Width = `${(val1 / maxVal) * 100}%`;
    const bar2Width = `${(val2 / maxVal) * 100}%`;

    const isWinner1 = inverse ? city1Value < city2Value : city1Value > city2Value;

    const showWinner = frame > 45;

    const formatValue = (val: number) => {
        if (format === 'compact') return new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(val);
        if (format === 'currency') return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumSignificantDigits: 3 }).format(val);
        if (format === 'percent') return val.toFixed(1);
        return val.toFixed(format === 'decimal3' ? 3 : 1);
    };

    // Background animation
    const scale = interpolate(frame, [0, 300], [1, 1.2]);
    const winnerImageWithFade = interpolate(frame, [60, 70], [0, 1], { extrapolateRight: 'clamp' });

    // Improved tie detection to match the scoreboard logic
    const formattedVal1 = formatValue(city1Value);
    const formattedVal2 = formatValue(city2Value);
    const isTie = formattedVal1 === formattedVal2;

    const currentBackgroundImage = isWinner1 ? backgroundImage1 : backgroundImage2;

    return (
        <AbsoluteFill>
            {/* Background Layer */}
            <AbsoluteFill style={{ zIndex: 0, flexDirection: 'row' }}>
                <div style={{ flex: 1, backgroundColor: '#111', overflow: 'hidden', position: 'relative' }}>
                    <Img
                        src={backgroundImage1}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} // Increased opacity for better visibility
                    />
                </div>
                <div style={{ flex: 1, backgroundColor: '#111', overflow: 'hidden', position: 'relative' }}>
                    <Img
                        src={backgroundImage2}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                    />
                </div>

                {/* Winner Reveal Background Overlay */}
                <AbsoluteFill style={{ opacity: winnerImageWithFade }}>
                    {isTie ? (
                        <div style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'row', transform: `scale(${scale})` }}>
                            <div style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
                                <Img src={backgroundImage1} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
                                <Img src={backgroundImage2} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            {/* Overlay for tie */}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))' }} />
                        </div>
                    ) : (
                        <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                            <Img
                                src={currentBackgroundImage}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 1, transform: `scale(${scale})` }}
                            />
                            {/* Gradient Overlay for Readability */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))'
                            }} />
                        </div>
                    )}
                </AbsoluteFill>
            </AbsoluteFill>

            {/* Content Layer */}
            <AbsoluteFill style={{ zIndex: 1, justifyContent: 'center', alignItems: 'center', padding: '0 40px' }}>
                <h1 style={{
                    fontSize: 70,
                    fontWeight: 700,
                    color: 'white',
                    marginBottom: 80,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    textShadow: '0 4px 20px rgba(0,0,0,0.8)' // Increased shadow opacity
                }}>{title}</h1>

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 60 }}>
                    {/* City 1 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <span style={{ color: 'white', fontSize: 60, fontWeight: 800, letterSpacing: '-0.02em', textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>
                                {city1Name}
                            </span>
                            <span style={{ color: 'white', fontSize: 70, fontWeight: 300, fontVariantNumeric: 'tabular-nums', textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>
                                {formatValue(val1)} {format !== 'currency' && <span style={{ fontSize: 30, opacity: 0.8 }}>{unit}</span>}
                            </span>
                        </div>
                        <div style={{ width: '100%', height: 50, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 25, overflow: 'hidden' }}>
                            <div style={{ width: bar1Width, height: '100%', backgroundColor: city1Color }} />
                        </div>
                    </div>

                    {/* City 2 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <span style={{ color: 'white', fontSize: 60, fontWeight: 800, letterSpacing: '-0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                {city2Name}
                            </span>
                            <span style={{ color: 'white', fontSize: 70, fontWeight: 300, fontVariantNumeric: 'tabular-nums' }}>
                                {formatValue(val2)} {format !== 'currency' && <span style={{ fontSize: 30, opacity: 0.8 }}>{unit}</span>}
                            </span>
                        </div>
                        <div style={{ width: '100%', height: 50, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 25, overflow: 'hidden' }}>
                            <div style={{ width: bar2Width, height: '100%', backgroundColor: city2Color }} />
                        </div>
                    </div>
                </div>

                {showWinner && (
                    <div style={{
                        position: 'absolute',
                        bottom: 250,
                        transform: `scale(${spring({ frame: frame - 45, fps, config: { stiffness: 300, damping: 15 } })})`
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '15px 40px',
                            borderRadius: 40,
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}>
                            <h2 style={{
                                fontSize: 50,
                                margin: 0,
                                fontWeight: 800,
                                color: 'black',
                                letterSpacing: '-0.03em',
                                textTransform: 'uppercase'
                            }}>
                                {isTie ? 'EMPATE' : (isWinner1 ? `${city1Name} VENCE` : `${city2Name} VENCE`)}
                            </h2>
                        </div>
                    </div>
                )}
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
