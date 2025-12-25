import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const formatNumber = (val: number, decimals: number) => {
    return val.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
};

export const CityCard: React.FC<{
    name: string;
    // value: string | number; // Deprecated/Removed in favor of specific props
    label: string;
    color: string;
    isWinner?: boolean;

    // New props for animation
    numericValue: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}> = ({ name, label, color, isWinner, numericValue, prefix = '', suffix = '', decimals = 0 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Animate the number from 0 to numericValue
    // Start slightly delayed so it doesn't start instantly
    const progress = spring({
        frame: frame - 15,
        fps,
        config: { damping: 100 }, // Slower, smoother approach
        durationInFrames: 60,
    });

    const animatedValue = interpolate(progress, [0, 1], [0, numericValue]);
    // Clamp to ensure we don't show weird negative vals or overshoot too much visually before settling if spring oscillates
    // But spring with high damping shouldn't oscillate much. 

    // Safety check just in case
    const displayValue = Math.max(0, animatedValue);

    // Formatting
    const formattedNumber = formatNumber(displayValue, decimals);


    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 40,
                boxShadow: isWinner ? `0 0 40px ${color}` : '0 10px 20px rgba(0,0,0,0.1)',
                borderTop: `10px solid ${color}`,
                border: isWinner ? `5px solid ${color}` : undefined,
                width: 400,
                transform: `scale(${isWinner ? 1.1 : 1})`,
                transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                zIndex: isWinner ? 1 : 0,
            }}
        >
            <h2 style={{ fontSize: 40, margin: 0, color: '#333' }}>{name}</h2>

            <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                {isWinner && (
                    <div style={{
                        fontSize: 50,
                        animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}>
                        🏆
                    </div>
                )}
            </div>

            <div style={{ fontSize: 24, color: '#666', marginTop: 0 }}>{label}</div>

            <div style={{ fontSize: 60, fontWeight: 'bold', color: '#000', marginTop: 20 }}>
                <span style={{ fontSize: 40 }}>{prefix}</span>
                {formattedNumber}
                <span style={{ fontSize: 40 }}>{suffix}</span>
            </div>

            <style>
                {`
                    @keyframes popIn {
                        0% { transform: scale(0); opacity: 0; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                `}
            </style>
        </div>
    );
};
