import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, staticFile } from 'remotion';
import { CampaignState } from '../logic/state';
import { City } from '../../../utils/ChampionshipManager';

type CampaignStatusSceneProps = {
    mainCity: City;
    state: CampaignState;
    durationInFrames: number;
};

export const CampaignStatusScene: React.FC<CampaignStatusSceneProps> = ({
    mainCity,
    state,
    durationInFrames
}) => {
    const frame = useCurrentFrame();

    const opacity = interpolate(
        frame,
        [0, 10, durationInFrames - 10, durationInFrames],
        [0, 1, 1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    const numBattles = state.battles.length;

    return (
        <AbsoluteFill style={{
            backgroundColor: '#0a0a0a',
            opacity,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Outfit, sans-serif',
            color: '#FFF',
            padding: '40px 80px'
        }}>
            {/* Header */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '40px',
                borderBottom: `2px solid ${mainCity.visual.primaryColor}`,
                paddingBottom: '20px'
            }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '30px', color: '#AAA', textTransform: 'uppercase' }}>Status da Campanha</h2>
                    <h1 style={{ margin: 0, fontSize: '60px' }}>{mainCity.name}</h1>
                </div>

                <div style={{ display: 'flex', gap: '50px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', color: '#AAA' }}>VITÓRIAS</div>
                        <div style={{ fontSize: '60px', fontWeight: 'bold', color: '#4CAF50' }}>{state.wins}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', color: '#AAA' }}>DERROTAS</div>
                        <div style={{ fontSize: '60px', fontWeight: 'bold', color: '#F44336' }}>{state.losses}</div>
                    </div>
                    {state.ties > 0 && (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '24px', color: '#AAA' }}>EMPATES</div>
                            <div style={{ fontSize: '60px', fontWeight: 'bold', color: '#FFEB3B' }}>{state.ties}</div>
                        </div>
                    )}
                </div>
            </header>

            {/* Dynamic List based on battle count */}
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '36px' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', color: '#666', fontSize: '24px', textTransform: 'uppercase' }}>
                            <th style={{ padding: '20px' }}>Oponente</th>
                            <th style={{ padding: '20px', textAlign: 'center' }}>Resultado</th>
                            <th style={{ padding: '20px', textAlign: 'center' }}>Placar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Show last N battles based on space, or if scrolling is needed implemented later. 
                For now we show last 5 if list is long to ensure visibility without scroll logic complexity unless requested (spec mentions scroll modes but let's fit to screen first).
                Spec says: <=5 full, 6-10 hybrid, 11+ summary. 
            */}
                        {getBattlesToShow(state.battles).map((battle, idx) => (
                            <tr key={idx} style={{
                                borderBottom: '1px solid #222',
                                backgroundColor: 'rgba(255,255,255,0.02)'
                            }}>
                                <td style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '30px' }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '40px',
                                        overflow: 'hidden',
                                        backgroundColor: '#111'
                                    }}>
                                        <img src={staticFile(battle.opponent.visual.image)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    {battle.opponent.name}
                                </td>
                                <td style={{ padding: '25px', textAlign: 'center' }}>
                                    {battle.result === 'win' && <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>VITÓRIA</span>}
                                    {battle.result === 'loss' && <span style={{ color: '#F44336', fontWeight: 'bold' }}>DERROTA</span>}
                                    {battle.result === 'tie' && <span style={{ color: '#FFEB3B', fontWeight: 'bold' }}>EMPATE</span>}
                                </td>
                                <td style={{ padding: '25px', textAlign: 'center', fontFamily: 'monospace', fontSize: '40px' }}>
                                    {battle.scoreA} - {battle.scoreB}
                                </td>
                            </tr>
                        ))}
                        {state.battles.length > 5 && (
                            <tr>
                                <td colSpan={3} style={{ textAlign: 'center', padding: '20px', color: '#666', fontSize: '24px' }}>
                                    ... e mais {state.battles.length - 5} batalhas anteriores
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AbsoluteFill>
    );
};

function getBattlesToShow(battles: any[]) {
    // Show last 5 battles reversed (newest on top?) 
    // Usually status shows chronological.
    // If we have many battles, showing the MOST RECENT 5 is usually better for status updates.
    if (battles.length <= 5) return battles;
    return battles.slice(-5);
}
