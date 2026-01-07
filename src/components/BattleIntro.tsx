import React from 'react';
import { AbsoluteFill, useVideoConfig, spring, useCurrentFrame, interpolate, Img, random, staticFile } from 'remotion';

export const BattleIntro: React.FC<{
    city1Name: string;
    city2Name: string;
    city1Nickname?: string;
    city2Nickname?: string;
    image1: string;
    image2: string;
}> = ({ city1Name, city2Name, city1Nickname, city2Nickname, image1, image2 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const backgroundImages = [
        'intro/earth.png',
        'intro/water.png',
        'intro/fire.png',
        'intro/wind.png'
    ];

    // Deterministic random selection based on city names
    const seed = city1Name + city2Name;
    const randomIndex = Math.floor(random(seed) * backgroundImages.length);
    const selectedBackground = backgroundImages[randomIndex];

    const entrance = spring({
        frame,
        fps,
        config: {
            damping: 15, // Faster settle
            stiffness: 200
        },
    });

    const scale = interpolate(entrance, [0, 1], [3, 1]);
    const opacity = interpolate(frame, [0, 10], [0, 1]); // Faster fade in

    const slideLeft = interpolate(frame, [0, 15], [-100, 0], { extrapolateRight: 'clamp' }); // Faster slide
    const slideRight = interpolate(frame, [0, 15], [100, 0], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill>
            {/* Dynamic Background */}
            <Img
                src={staticFile(selectedBackground)}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    zIndex: 0
                }}
            />
            {/* Overlay for contrast */}
            <AbsoluteFill style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1 }} />

            <AbsoluteFill style={{ flexDirection: 'row', zIndex: 2 }}>
                <div style={{ flex: 1, transform: `translateX(${slideLeft}%)`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Img src={image1} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                    <div style={{
                        position: 'absolute',
                        width: '85%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'translateY(-40px)'
                    }}>
                        <h1 style={{
                            margin: 0,
                            fontSize: 70, // Increased from 55
                            fontWeight: 900,
                            color: 'white',
                            letterSpacing: '-0.02em',
                            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                            textAlign: 'center',
                            wordWrap: 'break-word',
                            lineHeight: 1
                        }}>{city1Name.toUpperCase()}</h1>
                        {city1Nickname && (
                            <h2 style={{
                                margin: '5px 0 0 0',
                                fontSize: 38, // Increased from 22
                                fontWeight: 500,
                                color: '#FFD700',
                                letterSpacing: '0.04em',
                                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                                textAlign: 'center',
                                textTransform: 'uppercase',
                            }}>{city1Nickname}</h2>
                        )}
                    </div>
                </div>
                <div style={{ flex: 1, transform: `translateX(${slideRight}%)`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Img src={image2} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                    <div style={{
                        position: 'absolute',
                        width: '85%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'translateY(40px)'
                    }}>
                        <h1 style={{
                            margin: 0,
                            fontSize: 70, // Increased from 55
                            fontWeight: 900,
                            color: 'white',
                            letterSpacing: '-0.02em',
                            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                            textAlign: 'center',
                            wordWrap: 'break-word',
                            lineHeight: 1
                        }}>{city2Name.toUpperCase()}</h1>
                        {city2Nickname && (
                            <h2 style={{
                                margin: '5px 0 0 0',
                                fontSize: 38, // Increased from 22
                                fontWeight: 500,
                                color: '#FFD700',
                                letterSpacing: '0.04em',
                                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                                textAlign: 'center',
                                textTransform: 'uppercase',
                            }}>{city2Nickname}</h2>
                        )}
                    </div>
                </div>
            </AbsoluteFill>
            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', zIndex: 3 }}>
                <div style={{
                    position: 'absolute',
                    top: 100,
                    width: '100%',
                    textAlign: 'center',
                    zIndex: 10
                }}>
                    <h3 style={{
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: 32, // Increased from 24
                        fontWeight: 600,
                        margin: '0 0 10px 0',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase'
                    }}>
                        CIDADES BRASILEIRAS
                    </h3>
                    <h2 style={{
                        color: 'white',
                        fontSize: 110, // Increased from 80
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
                        fontSize: 60, // Increased from 50
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
                    width: 180, // Increased from 140
                    height: 180, // Increased from 140
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                }}>
                    <h1 style={{
                        color: 'black',
                        fontSize: 80, // Increased from 60
                        margin: 0,
                        fontWeight: 900,
                        letterSpacing: '-0.05em'
                    }}>VS</h1>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
