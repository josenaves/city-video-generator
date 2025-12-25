import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const FinalResult: React.FC<{
    winnerName: string;
    score: string; // e.g., "2 x 1"
    color: string;
    backgroundImage?: string;
}> = ({ winnerName, score, color, backgroundImage }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame,
        fps,
        config: {
            damping: 10,
        },
    });

    const opacity = spring({
        frame: frame - 10,
        fps,
        config: {
            damping: 200,
        },
    });

    return (
        <AbsoluteFill
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
            }}
        >
            {backgroundImage && (
                <AbsoluteFill style={{ zIndex: 0 }}>
                    <img
                        src={backgroundImage}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.6
                        }}
                    />
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }} />
                </AbsoluteFill>
            )}
            <AbsoluteFill
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1
                }}
            >
                <h1
                    style={{
                        fontSize: 100,
                        color: 'white',
                        fontFamily: 'sans-serif',
                        opacity,
                    }}
                >
                    Grande Campeã
                </h1>
                <div
                    style={{
                        transform: `scale(${scale})`,
                        backgroundColor: 'white',
                        padding: '40px 80px',
                        borderRadius: 30,
                        marginTop: 50,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: `10px solid ${color}`,
                        boxShadow: `0 0 50px ${color}`,
                    }}
                >
                    <h2 style={{ fontSize: 80, margin: 0, color: '#333' }}>{winnerName}</h2>
                    <div style={{ fontSize: 50, marginTop: 20, color: '#666' }}>Placar Final</div>
                    <div style={{ fontSize: 100, fontWeight: 'bold', color: color }}>{score}</div>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
