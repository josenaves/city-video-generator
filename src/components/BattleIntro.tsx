import React from 'react';
import { AbsoluteFill, useVideoConfig, spring, useCurrentFrame, interpolate, Img, staticFile } from 'remotion';

export const BattleIntro: React.FC<{
    city1Name: string;
    city2Name: string;
}> = ({ city1Name, city2Name }) => {
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
                <div style={{ flex: 1, backgroundColor: '#003300', transform: `translateX(${slideLeft}%)`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Img src={staticFile('uberlandia.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                    <h1 style={{ position: 'absolute', fontSize: 80, color: 'white', textShadow: '0 0 10px black' }}>{city1Name}</h1>
                </div>
                <div style={{ flex: 1, backgroundColor: '#330000', transform: `translateX(${slideRight}%)`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Img src={staticFile('uberaba.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                    <h1 style={{ position: 'absolute', fontSize: 80, color: 'white', textShadow: '0 0 10px black' }}>{city2Name}</h1>
                </div>
            </AbsoluteFill>
            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                    position: 'absolute',
                    top: 50,
                    width: '100%',
                    textAlign: 'center',
                    zIndex: 10
                }}>
                    <h3 style={{ color: 'white', fontSize: 40, margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Cidades Brasileiras apresenta</h3>
                    <h2 style={{ color: 'gold', fontSize: 60, margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>BATALHA DE CIDADES</h2>
                </div>
                <div style={{
                    transform: `scale(${scale})`,
                    opacity,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    padding: '20px 60px',
                    border: '5px solid gold',
                    borderRadius: 20
                }}>
                    <h1 style={{ color: 'gold', fontSize: 100, margin: 0 }}>VS</h1>
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
