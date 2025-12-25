import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const ComparisonBar: React.FC<{
    value1: number;
    value2: number;
    color1: string;
    color2: string;
    max?: number;
}> = ({ value1, value2, color1, color2, max }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const total = max || Math.max(value1, value2) * 1.2; // Add some headroom

    const progress1 = spring({
        frame,
        fps,
        config: {
            damping: 200,
        },
        durationInFrames: 60,
    });

    const progress2 = spring({
        frame: frame - 15, // Stagger effect
        fps,
        config: {
            damping: 200,
        },
        durationInFrames: 60,
    });

    const width1 = (value1 / total) * 100 * progress1;
    const width2 = (value2 / total) * 100 * progress2;

    return (
        <div style={{ width: '100%', marginTop: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <div
                    style={{
                        height: 40,
                        width: `${width1}%`,
                        backgroundColor: color1,
                        borderRadius: '0 20px 20px 0',
                        transition: 'width 0.1s',
                    }}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                    style={{
                        height: 40,
                        width: `${width2}%`,
                        backgroundColor: color2,
                        borderRadius: '0 20px 20px 0',
                        transition: 'width 0.1s',
                    }}
                />
            </div>
        </div>
    );
};
