import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

interface ParticleDef {
  id: number;
  initialX: number;     // 0 to 100%
  initialY: number;     // 0 to 100%
  speed: number;        // upward speed factor
  swayFreq: number;     // horizontal oscillation frequency
  swayPhase: number;    // phase offset
  swayAmp: number;      // amplitude in %
  size: number;         // px
  baseOpacity: number;  // 0.2 to 0.9
  colorIndex: number;
  isBokeh: boolean;     // larger blurred background/foreground orb
}

interface FloatingParticlesProps {
  count?: number;
  colors?: string[];
  direction?: "up" | "down";
  speedMultiplier?: number;
}

// Deterministic pseudo-random generator
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 9999 + 1) * 10000;
  return x - Math.floor(x);
};

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 60,
  colors = ["#00f2fe", "#4facfe", "#ffffff", "#38bdf8"],
  direction = "up",
  speedMultiplier = 1,
}) => {
  const frame = useCurrentFrame();

  const particles: ParticleDef[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const r1 = pseudoRandom(i * 13 + 1);
      const r2 = pseudoRandom(i * 17 + 2);
      const r3 = pseudoRandom(i * 23 + 3);
      const r4 = pseudoRandom(i * 29 + 4);
      const r5 = pseudoRandom(i * 31 + 5);
      const isBokeh = i % 8 === 0;

      return {
        id: i,
        initialX: r1 * 100,
        initialY: r2 * 100,
        speed: (0.4 + r3 * 0.8) * speedMultiplier,
        swayFreq: 0.02 + r4 * 0.04,
        swayPhase: r5 * Math.PI * 2,
        swayAmp: 1.5 + r2 * 3.5, // 1.5% to 5% horizontal sway
        size: isBokeh ? 10 + r3 * 12 : 2.5 + r4 * 3.5, // 2.5px-6px for particles, 10-22px for bokeh
        baseOpacity: isBokeh ? 0.12 + r1 * 0.15 : 0.35 + r5 * 0.45,
        colorIndex: Math.floor(r3 * colors.length) % colors.length,
        isBokeh,
      };
    });
  }, [count, colors.length, speedMultiplier]);

  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 2,
      }}
    >
      {particles.map((p) => {
        // Vertical upward drift with seamless looping wrap
        const yDelta = frame * p.speed * 0.6;
        const currentY =
          direction === "up"
            ? ((p.initialY - yDelta) % 100 + 100) % 100
            : (p.initialY + yDelta) % 100;

        // Horizontal sinusoidal sway
        const currentX =
          p.initialX + Math.sin(frame * p.swayFreq + p.swayPhase) * p.swayAmp;

        // Subtle pulsing twinkle
        const pulse = Math.sin(frame * 0.07 + p.swayPhase);
        const opacity = Math.max(0.1, Math.min(1, p.baseOpacity * (0.75 + 0.25 * pulse)));

        const color = colors[p.colorIndex] || colors[0];

        return (
          <div
            key={`p-${p.id}`}
            style={{
              position: "absolute",
              left: `${currentX}%`,
              top: `${currentY}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: "50%",
              backgroundColor: color,
              opacity,
              boxShadow: p.isBokeh
                ? undefined
                : `0 0 ${p.size * 2}px ${color}, 0 0 ${p.size * 4}px ${color}80`,
              filter: p.isBokeh ? `blur(${p.size * 0.35}px)` : undefined,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
