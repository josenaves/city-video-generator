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

    const rotate = interpolate(frame, [0, 100], [0, 360]);

    return (
        <AbsoluteFill>
            {/* Background Layer - FIRST in DOM for natural stacking */}
            <AbsoluteFill style={{ zIndex: 0 }}>
                {result === 'tie' ? (
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
                        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Img
                                src={backgroundImage1}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Img
                                src={backgroundImage2}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <Img
                        src={result === 'city1' ? backgroundImage1 : backgroundImage2}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                )}
                {/* Dark overlay for text readability */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)'
                }} />
            </AbsoluteFill>

            {/* Content Layer - SECOND in DOM, on top of background */}
            <AbsoluteFill style={{
                zIndex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    fontSize: 100,
                    color: 'white',
                    marginBottom: 20,
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                }}>
                    PLACAR FINAL
                </div>

                <div style={{
                    fontSize: 150,
                    color: 'gold',
                    fontWeight: 'bold',
                    marginBottom: 50,
                    transform: `scale(${scale})`,
                    textShadow: '0 5px 15px rgba(0,0,0,0.8)'
                }}>
                    {score}
                </div>

                {result !== 'tie' && (
                    <div style={{
                        fontSize: 120,
                        marginBottom: 30,
                        transform: `rotate(${rotate}deg)`
                    }}>
                        🏆
                    </div>
                )}

                <h1 style={{
                    fontSize: 150,
                    fontWeight: '900',
                    color: winnerColor,
                    textAlign: 'center',
                    textShadow: '3px 3px 0 #000, -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 0 10px 20px rgba(0,0,0,0.5)',
                    margin: 0
                }}>
                    {winnerName}
                </h1>
                {result !== 'tie' && (
                    <h2 style={{ color: 'white', fontSize: 60, marginTop: 20 }}>GRANDE CAMPEÃ!</h2>
                )}
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
