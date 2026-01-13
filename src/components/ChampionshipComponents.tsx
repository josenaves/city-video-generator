import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, Img, interpolate, staticFile, random } from 'remotion';
import { Standing, Match } from '../utils/ChampionshipManager';

// Opening Scene
export const ChampionshipOpening: React.FC<{ name: string; cities: string[] }> = ({ name, cities }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const titleEntrance = spring({ frame, fps, config: { damping: 10 } });
    const listEntrance = spring({ frame: frame - 20, fps, config: { damping: 12 } });

    return (
        <AbsoluteFill style={{ backgroundColor: '#000', color: 'white', padding: 60, justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', marginBottom: 60, transform: `scale(${titleEntrance})` }}>
                <h3 style={{ color: '#FFD700', fontSize: 40, letterSpacing: 8, margin: 0 }}>CAMPEONATO</h3>
                <h1 style={{ fontSize: 100, fontWeight: 900, margin: 0, lineHeight: 0.9 }}>⚔️ {name.toUpperCase()}</h1>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, transform: `translateY(${interpolate(listEntrance, [0, 1], [100, 0])}px)`, opacity: listEntrance }}>
                <h2 style={{ fontSize: 32, opacity: 0.7, textAlign: 'center', marginBottom: 20 }}>CIDADES PARTICIPANTES</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
                    {cities.map((city, i) => (
                        <div key={city} style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '15px 30px', borderRadius: 40, fontSize: 32, fontWeight: 700 }}>
                            {city}
                        </div>
                    ))}
                </div>
            </div>
        </AbsoluteFill>
    );
};

// Leaderboard Scene
export const ChampionshipLeaderboard: React.FC<{ standings: Standing[]; title?: string }> = ({ standings, title = "CLASSIFICAÇÃO" }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: '#000', color: 'white', padding: 40 }}>
            <h1 style={{ textAlign: 'center', fontSize: 60, fontWeight: 900, marginBottom: 40, color: '#FFD700' }}>{title}</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <div style={{ display: 'flex', padding: '0 20px', opacity: 0.5, fontSize: 24, fontWeight: 700 }}>
                    <div style={{ width: 60 }}>#</div>
                    <div style={{ flex: 1 }}>CIDADE</div>
                    <div style={{ width: 80, textAlign: 'center' }}>P</div>
                    <div style={{ width: 80, textAlign: 'center' }}>V</div>
                    <div style={{ width: 80, textAlign: 'center' }}>S</div>
                </div>

                {standings.map((s, i) => {
                    const entrance = spring({ frame: frame - (i * 5), fps, config: { damping: 12 } });
                    return (
                        <div key={s.city.name} style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: i === 0 ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255,255,255,0.05)',
                            padding: '20px',
                            borderRadius: 15,
                            transform: `translateX(${interpolate(entrance, [0, 1], [-50, 0])}px)`,
                            opacity: entrance,
                            border: i === 0 ? '2px solid #FFD700' : 'none'
                        }}>
                            <div style={{ width: 60, fontSize: 40, fontWeight: 900, color: i === 0 ? '#FFD700' : 'white' }}>{i + 1}</div>
                            <div style={{ flex: 1, fontSize: 40, fontWeight: 800 }}>{s.city.name}</div>
                            <div style={{ width: 80, textAlign: 'center', fontSize: 40, fontWeight: 900 }}>{s.points}</div>
                            <div style={{ width: 80, textAlign: 'center', fontSize: 32, opacity: 0.8 }}>{s.wins}</div>
                            <div style={{ width: 80, textAlign: 'center', fontSize: 32, opacity: 0.8 }}>{s.roundBalance > 0 ? `+${s.roundBalance}` : s.roundBalance}</div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

// Confetti Component
const Confetti: React.FC<{ count: number }> = ({ count }) => {
    const frame = useCurrentFrame();
    const { width, height } = useVideoConfig();

    return (
        <AbsoluteFill style={{ pointerEvents: 'none' }}>
            {new Array(count).fill(0).map((_, i) => {
                const seed = i * 1.5;
                const startTime = random(`start-${seed}`) * 100;
                const duration = 120 + random(`dur-${seed}`) * 60;
                const opacity = interpolate(frame, [startTime, startTime + 10], [0, 1], { extrapolateRight: 'clamp' });
                const x = random(`x-${seed}`) * width;
                const drop = interpolate(frame, [startTime, startTime + duration], [-50, height + 50]);
                const rotation = interpolate(frame, [startTime, startTime + duration], [0, random(`rot-${seed}`) * 1000]);
                const size = 10 + random(`size-${seed}`) * 15;
                const colors = ['#FFD700', '#FFFFFF', '#FF4D4D', '#4D4DFF', '#4DFF4D'];
                const color = colors[Math.floor(random(`col-${seed}`) * colors.length)];

                if (frame < startTime) return null;

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            width: size,
                            height: size,
                            backgroundColor: color,
                            left: x,
                            top: drop,
                            transform: `rotate(${rotation}deg)`,
                            opacity,
                            borderRadius: i % 3 === 0 ? '50%' : '0'
                        }}
                    />
                );
            })}
        </AbsoluteFill>
    );
};

// Champion Reveal
export const ChampionshipChampion: React.FC<{ city: any }> = ({ city }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({ frame, fps, config: { damping: 10 } });

    return (
        <AbsoluteFill style={{ backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
            <Img src={staticFile(city.visual.image)} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
            <AbsoluteFill style={{ background: `radial-gradient(circle, transparent 0%, rgba(0,0,0,0.8) 100%)` }} />

            <div style={{ textAlign: 'center', zIndex: 10, transform: `scale(${scale})` }}>
                <div style={{ fontSize: 120, marginBottom: 20 }}>🏆</div>
                <h3 style={{ color: '#FFD700', fontSize: 50, letterSpacing: 10, margin: 0 }}>GRANDE CAMPEÃ</h3>
                <h1 style={{ fontSize: 130, fontWeight: 900, color: 'white', margin: 0, textShadow: `0 0 40px ${city.visual.primaryColor}` }}>
                    {city.name.toUpperCase()}
                </h1>
            </div>

            <Confetti count={150} />
        </AbsoluteFill>
    );
};

// Champion Campaign Summary
export const ChampionshipCampaign: React.FC<{ city: any, matches: Match[] }> = ({ city, matches }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: '#000', color: 'white', padding: 60 }}>
            <h1 style={{ fontSize: 60, fontWeight: 900, textAlign: 'center', marginBottom: 50, color: '#FFD700' }}>
                CAMPANHA DA CAMPEÃ
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
                {matches.map((m, i) => {
                    const entrance = spring({ frame: frame - (i * 10), fps, config: { damping: 15 } });
                    const isA = m.cityA.name === city.name;
                    const opponent = isA ? m.cityB.name : m.cityA.name;
                    const score = isA ? `${m.scoreA} x ${m.scoreB}` : `${m.scoreB} x ${m.scoreA}`;
                    const result = (isA && m.winner === 'cityA') || (!isA && m.winner === 'cityB') ? 'V' : (m.winner === 'tie' ? 'E' : 'D');

                    return (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: 30,
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderRadius: 20,
                            transform: `translateX(${interpolate(entrance, [0, 1], [50, 0])}px)`,
                            opacity: entrance
                        }}>
                            <div style={{
                                width: 70,
                                height: 70,
                                borderRadius: '50%',
                                backgroundColor: result === 'V' ? '#4CAF50' : (result === 'E' ? '#FFC107' : '#F44336'),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 36,
                                fontWeight: 900,
                                marginRight: 40
                            }}>
                                {result}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 24, opacity: 0.6 }}>vs {opponent}</div>
                                <div style={{ fontSize: 44, fontWeight: 800 }}>{score}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};
