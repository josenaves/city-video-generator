import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, staticFile } from 'remotion';
import { City } from '../../../utils/ChampionshipManager';

type IntroSceneProps = {
    mainCity: City;
    numOpponents: number;
    durationInFrames: number;
    title?: string;
};

export const IntroScene: React.FC<IntroSceneProps> = ({
    mainCity,
    numOpponents,
    durationInFrames,
    title
}) => {
    const frame = useCurrentFrame();

    const opacity = interpolate(
        frame,
        [0, 20, durationInFrames - 20, durationInFrames],
        [0, 1, 1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    const scale = interpolate(
        frame,
        [0, durationInFrames],
        [1, 1.15],
        { extrapolateRight: 'clamp' }
    );

    return (
        <AbsoluteFill style={{ backgroundColor: '#000', opacity }}>
            <img
                src={staticFile(mainCity.visual.image)}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: `scale(${scale})`,
                    filter: 'brightness(0.8)'
                }}
                alt={mainCity.name}
            />

            <AbsoluteFill style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
            }}>
                <h1 style={{
                    fontFamily: 'Outfit, sans-serif',
                    color: '#FFF',
                    fontSize: '100px',
                    fontWeight: '800',
                    textShadow: '0 5px 30px rgba(0,0,0,0.8)',
                    margin: '20px 0',
                    lineHeight: 1
                }}>
                    {title || `${mainCity.name} vs ${numOpponents} Cidades`}
                </h1>

                <div style={{
                    width: '300px',
                    height: '8px',
                    backgroundColor: mainCity.visual.primaryColor,
                    boxShadow: `0 0 30px ${mainCity.visual.primaryColor}`,
                    borderRadius: '4px'
                }} />
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
