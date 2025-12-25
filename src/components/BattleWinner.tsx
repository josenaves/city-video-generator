import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const BattleWinner: React.FC<{
    winnerName: string;
    winnerColor: string;
    score: string;
    backgroundImage1: string;
    backgroundImage2: string;
}> = ({ winnerName, winnerColor, score, backgroundImage1 }) => {
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
                <img
                    src={backgroundImage1}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
                {/* Dark overlay for text readability */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.4)'
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
                    textShadow: '0 0 10px rgba(255,255,255,0.5)'
                }}>
                    PLACAR FINAL
                </div>

                <div style={{
                    fontSize: 150,
                    color: 'gold',
                    fontWeight: 'bold',
                    marginBottom: 50,
                    transform: `scale(${scale})`
                }}>
                    {score}
                </div>

                <div style={{
                    fontSize: 120,
                    marginBottom: 30,
                    transform: `rotate(${rotate}deg)`
                }}>
                    🏆
                </div>

                <h1 style={{
                    fontSize: 120,
                    color: winnerColor,
                    textAlign: 'center',
                    textShadow: '0 0 30px currentColor',
                    margin: 0
                }}>
                    {winnerName}
                </h1>
                <h2 style={{ color: 'white', fontSize: 60, marginTop: 20 }}>GRANDE CAMPEÃ!</h2>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
