import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Img } from 'remotion';

export const BattleWinner: React.FC<{
    winnerName: string;
    winnerColor: string;
    score: string;
    backgroundImage1: string;
    backgroundImage2: string;
    result: 'city1' | 'city2' | 'tie';
}> = ({ winnerName, winnerColor, score, backgroundImage1, backgroundImage2, result }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame,
        fps,
        config: { damping: 10 }
    });

    return (
        <AbsoluteFill>
            {/* Background Layer */}
            <AbsoluteFill style={{ zIndex: 0 }}>
                {result === 'tie' ? (
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                            <Img src={backgroundImage1} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }} />
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                            <Img src={backgroundImage2} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }} />
                        </div>
                    </div>
                ) : (
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <Img
                            src={result === 'city1' ? backgroundImage1 : backgroundImage2}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)' }} />
                    </div>
                )}
            </AbsoluteFill>

            {/* Content Layer */}
            <AbsoluteFill style={{
                zIndex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    fontSize: 40,
                    color: 'rgba(255,255,255,0.8)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: 20,
                }}>
                    Placar Final
                </div>

                <div style={{
                    fontSize: 200,
                    color: 'white',
                    fontWeight: 900,
                    letterSpacing: '-0.05em',
                    marginBottom: 50,
                    transform: `scale(${scale})`,
                    textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}>
                    {score}
                </div>

                {result !== 'tie' && (
                    <div style={{
                        marginBottom: 40,
                        filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.5))'
                    }}>
                        <span style={{ fontSize: 100 }}>🏆</span>
                    </div>
                )}

                <h1 style={{
                    fontSize: 100,
                    fontWeight: 900,
                    color: 'white',
                    textAlign: 'center',
                    margin: 0,
                    textShadow: `0 4px 20px ${winnerColor}`, // Colored glow instead of colored text for better contrast
                    lineHeight: 1.1
                }}>
                    {winnerName.toUpperCase()}
                </h1>

                {result !== 'tie' && (
                    <h2 style={{
                        color: 'rgba(255,255,255,0.9)',
                        fontSize: 40,
                        marginTop: 20,
                        fontWeight: 500,
                        letterSpacing: '0.05em'
                    }}>
                        GRANDE CAMPEÃ
                    </h2>
                )}
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
