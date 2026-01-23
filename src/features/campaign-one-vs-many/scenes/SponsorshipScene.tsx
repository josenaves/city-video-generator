import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, staticFile } from 'remotion';

type SponsorshipSceneProps = {
    sponsorship: {
        enabled: boolean;
        title?: string;
        items: {
            type: "logo" | "qrcode";
            src: string;
            label?: string;
        }[];
    };
    durationInFrames: number;
};

export const SponsorshipScene: React.FC<SponsorshipSceneProps> = ({
    sponsorship,
    durationInFrames
}) => {
    const frame = useCurrentFrame();

    const opacity = interpolate(
        frame,
        [0, 15, durationInFrames - 15, durationInFrames],
        [0, 1, 1, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );

    return (
        <AbsoluteFill style={{
            backgroundColor: '#111',
            opacity,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Outfit, sans-serif'
        }}>
            <h2 style={{
                color: '#AAA',
                fontSize: '40px',
                marginBottom: '60px',
                fontWeight: '300',
                letterSpacing: '4px',
                textTransform: 'uppercase'
            }}>
                {sponsorship.title || "Um oferecimento"}
            </h2>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '100px',
                width: '100%',
                padding: '0 50px'
            }}>
                {sponsorship.items.map((item, idx) => (
                    <div key={idx} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '30px'
                    }}>
                        <div style={{
                            backgroundColor: '#FFF',
                            padding: '30px',
                            borderRadius: '20px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            transform: 'scale(1.1)'
                        }}>
                            <img
                                src={staticFile(item.src)}
                                style={{
                                    height: item.type === 'qrcode' ? '250px' : '150px',
                                    width: 'auto',
                                    display: 'block'
                                }}
                            />
                        </div>
                        {item.label && (
                            <span style={{
                                color: '#FFF',
                                fontSize: '30px',
                                fontWeight: '500',
                                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                            }}>
                                {item.label}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </AbsoluteFill>
    );
};
