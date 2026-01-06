import React from 'react';
import { AbsoluteFill, useVideoConfig, spring, useCurrentFrame, interpolate, Img } from 'remotion';

export const BattleIntro: React.FC<{
    city1Name: string;
    city2Name: string;
    image1: string;
    image2: string;
}> = ({ city1Name, city2Name, image1, image2 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame,
        fps,
        config: {
            damping: 200,
        },
    });

    const scale = interpolate(entrance, [0, 1], [3, 1]);
    const opacity = interpolate(frame, [0, 20], [0, 1]);

    const slideLeft = interpolate(frame, [0, 30], [-100, 0], { extrapolateRight: 'clamp' });
    const slideRight = interpolate(frame, [0, 30], [100, 0], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            <AbsoluteFill style={{ flexDirection: 'row' }}>
                <div style={{ flex: 1, backgroundColor: '#111', transform: `translateX(${slideLeft}%)`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Img src={image1} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                    <h1 style={{
                        position: 'absolute',
                        fontSize: 55, // Reduced from 90 to fit better
                        fontWeight: 900,
                        color: 'white',
                        letterSpacing: '-0.02em',
                        textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        width: '85%', // Prevent touching edges
                        textAlign: 'center',
                        wordWrap: 'break-word',
                        transform: 'translateY(-40px)' // Move up slightly
                    }}>{city1Name.toUpperCase()}</h1>
                </div>
                <div style={{ flex: 1, backgroundColor: '#111', transform: `translateX(${slideRight}%)`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Img src={image2} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                    <h1 style={{
                        position: 'absolute',
                        fontSize: 55, // Reduced from 90
                        fontWeight: 900,
                        color: 'white',
                        letterSpacing: '-0.02em',
                        textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                        width: '85%',
                        textAlign: 'center',
                        wordWrap: 'break-word',
                        transform: 'translateY(40px)' // Move down slightly
                    }}>{city2Name.toUpperCase()}</h1>
                </div>
            </AbsoluteFill>
            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                    position: 'absolute',
                    top: 100,
                    width: '100%',
                    textAlign: 'center',
                    zIndex: 10
                }}>
                    <h3 style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: 24,
                        fontWeight: 600,
                        margin: '0 0 10px 0',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase'
                    }}>
                        CIDADES BRASILEIRAS
                    </h3>
                    <h2 style={{
                        color: 'white',
                        fontSize: 80,
                        fontWeight: 900,
                        margin: 0,
                        lineHeight: 0.9,
                        letterSpacing: '-0.02em',
                        textShadow: '0 4px 10px rgba(0,0,0,0.5)'
                    }}>
                        BATALHA
                    </h2>
                    <h2 style={{
                        color: '#FFD700', // Gold accent for "DE CIDADES"
                        fontSize: 50,
                        fontWeight: 700,
                        margin: '5px 0 0 0',
                        letterSpacing: '0.05em',
                        textShadow: '0 4px 10px rgba(0,0,0,0.5)'
                    }}>
                        DE CIDADES
                    </h2>
                </div>
                <div style={{
                    transform: `scale(${scale})`,
                    opacity,
                    // Minimalist VS badge
                    backgroundColor: 'white',
                    width: 140,
                    height: 140,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                }}>
                    <h1 style={{
                        color: 'black',
                        fontSize: 60,
                        margin: 0,
                        fontWeight: 900,
                        letterSpacing: '-0.05em'
                    }}>VS</h1>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
