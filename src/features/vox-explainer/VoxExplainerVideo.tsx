import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, Img } from "remotion";
import { halftone } from "@remotion/effects/halftone";
import { VOX_CIDADES_VERDES_DURATIONS, durationToFrames } from "./utils/timing";
import { BarChart } from "./components/BarChart";
import { BigTitle, TextReveal } from "./components/TextReveal";
import { CityLabel } from "./components/CityLabel";

// Vox puro: Inter + IBM Plex, fundo #0A0A0A, amarelo #FFF200, verde #2D7D46, damping 200

const Scene01: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const bgScale = interpolate(frame, [0, durationInFrames], [1.06, 1.02], { extrapolateRight: "clamp" });
  const fgScale = interpolate(frame, [0, durationInFrames], [1.02, 1], { extrapolateRight: "clamp" });
  const overlay = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center" }}>
      {/* Layer 1: background mesh + parallax */}
      <Img
        src={staticFile("images/vox/cidades-verdes/sp_aerial_concreto.jpg")}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.34, transform: `scale(${bgScale})` }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.88) 100%)" }} />
      {/* Layer 2: foreground actor — halftone newspaper print, zIndex 10, parallax mais lento */}
      <Img
        src={staticFile("images/vox/cidades-verdes/ator_foreground.jpg")}
        effects={[halftone({ dotSize: 3, dotColor: "#0A0A0A", colorMode: "solid", shape: "circle" }) as unknown as never]}
        style={{
          position: "absolute",
          left: "58%",
          top: "8%",
          width: "42%",
          height: "84%",
          objectFit: "cover",
          objectPosition: "top center",
          opacity: 0.92,
          zIndex: 10,
          transform: `scale(${fgScale})`,
          filter: "grayscale(1) contrast(1.15)",
          borderLeft: "4px solid #FFF200",
        }}
      />
      {/* Layer 3: grid + titles */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.07 * overlay,
          backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          zIndex: 12,
        }}
      />
      <div style={{ zIndex: 15, display: "flex", flexDirection: "column", alignItems: "center", marginRight: "22%" }}>
        <BigTitle durationInFrames={durationInFrames}>SÃO PAULO</BigTitle>
        <div style={{ height: 18 }} />
        <TextReveal durationInFrames={durationInFrames} delay={10}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 28, fontWeight: 400, color: "#FFFFFF", letterSpacing: "4px", textTransform: "uppercase", textShadow: "0 2px 16px rgba(0,0,0,0.8)" }}>
            A cidade do concreto
          </div>
        </TextReveal>
        <TextReveal durationInFrames={durationInFrames} delay={18}>
          <div style={{ marginTop: 32, width: 120, height: 4, background: "#FFF200" }} />
        </TextReveal>
      </div>
      {/* Layer 5: grain + vignette (Vox puro) */}
      <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 62%, rgba(0,0,0,0.55) 100%)" }} />
    </AbsoluteFill>
  );
};

const Scene02: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], [1.04, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center", padding: 80 }}>
      <Img
        src={staticFile("images/vox/cidades-verdes/rua_arborizada_interior.jpg")}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.28, transform: `scale(${scale})` }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.88) 100%)" }} />
      <TextReveal durationInFrames={durationInFrames}>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 38, fontWeight: 300, color: "#FFFFFF", textAlign: "center", lineHeight: 1.3 }}>
          Mas existe um detalhe <span style={{ color: "#FFF200", fontWeight: 700 }}>curioso.</span>
        </div>
      </TextReveal>
      <TextReveal durationInFrames={durationInFrames} delay={14}>
        <div
          style={{
            marginTop: 24,
            fontFamily: "Inter, sans-serif",
            fontSize: 22,
            color: "#AAAAAA",
            textAlign: "center",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Interior de São Paulo — quase 100% das ruas com árvores
        </div>
      </TextReveal>
      <TextReveal durationInFrames={durationInFrames} delay={22}>
        <div style={{ marginTop: 36, display: "flex", gap: 12, justifyContent: "center" }}>
          <div style={{ width: 80, height: 2, background: "#2D7D46" }} />
          <div style={{ width: 80, height: 2, background: "#FFF200" }} />
        </div>
      </TextReveal>
    </AbsoluteFill>
  );
};

const Scene03: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  // American-retro v4 collage — approved in bakeoff
  const tornClip = "polygon(0% 2%, 3% 0%, 7% 3%, 12% 0%, 18% 2%, 24% 0%, 30% 3%, 36% 1%, 44% 4%, 52% 0%, 60% 2%, 68% 0%, 76% 3%, 84% 1%, 92% 4%, 100% 2%, 100% 98%, 92% 100%, 84% 97%, 76% 100%, 68% 98%, 60% 100%, 52% 97%, 44% 100%, 36% 98%, 24% 100%, 18% 97%, 12% 100%, 7% 98%, 3% 100%, 0% 98%)";
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFD23F", justifyContent: "center", alignItems: "center", padding: 36 }}>
      <div style={{ position: "absolute", inset: 0, background: "#FFD23F" }} />
      <TextReveal durationInFrames={durationInFrames}>
        <div style={{ position: "absolute", top: "6%", left: "50%", transform: "translateX(-50%)", background: "#0A0A0A", color: "#FFD23F", padding: "14px 24px", fontFamily: "Inter, sans-serif", fontSize: 28, fontWeight: 900, letterSpacing: "-1px", clipPath: tornClip, boxShadow: "0 8px 20px rgba(0,0,0,0.22)" }}>
          KING OF GREEN — 98,4%
        </div>
      </TextReveal>
      <TextReveal durationInFrames={durationInFrames} delay={10}>
        <div style={{ position: "absolute", left: "7%", top: "22%", width: "46%", height: "56%", background: "#fff", padding: 10, transform: "rotate(-1.4deg)", boxShadow: "0 10px 26px rgba(0,0,0,0.22)", clipPath: tornClip, border: "3px solid #0A0A0A" }}>
          <Img src={staticFile("images/vox/cidades-verdes/aerial_birigui.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", bottom: 12, left: 12, background: "#C41E3A", color: "#fff", padding: "8px 14px", fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 900, letterSpacing: "0.5px", transform: "rotate(-2deg)", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>BIRIGUI • TOP 1</div>
        </div>
      </TextReveal>
      <TextReveal durationInFrames={durationInFrames} delay={16}>
        <div style={{ position: "absolute", right: "8%", top: "26%", width: "38%", background: "#FFFFFF", padding: 20, transform: "rotate(1.2deg)", boxShadow: "0 8px 20px rgba(0,0,0,0.18)", clipPath: tornClip, borderLeft: "6px solid #C41E3A" }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 800, color: "#C41E3A", letterSpacing: "2px" }}>IBGE 2022 • CENSO</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 44, fontWeight: 900, color: "#0A0A0A", marginTop: 6 }}>Sertãozinho 97,5%</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 44, fontWeight: 900, color: "#0A0A0A" }}>SJRP 97,3%</div>
          <div style={{ marginTop: 12, fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700, color: "#0A0A0A", letterSpacing: "0.5px" }}>Interior de SP domina o topo</div>
        </div>
      </TextReveal>
      <TextReveal durationInFrames={durationInFrames} delay={22}>
        <div style={{ position: "absolute", right: "8%", bottom: "8%", width: 124, height: 124, borderRadius: 999, background: "#0A0A0A", color: "#FFD23F", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 18, textAlign: "center", lineHeight: 1.05, transform: "rotate(9deg)", border: "4px solid #fff", boxShadow: "0 8px 22px rgba(0,0,0,0.28)" }}>
          BRASIL<br />#1
        </div>
      </TextReveal>
      <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)", backgroundSize: "12px 12px", pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};

const Scene04: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => (
  <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center" }}>
    {/* Mapa ilustrativo: contorno SP + dots */}
    <div
      style={{
        width: 520,
        height: 320,
        border: "1.5px solid #333",
        borderRadius: 16,
        position: "relative",
        background: "#111111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#555", letterSpacing: "2px" }}>MAPA — ESTADO DE SÃO PAULO</div>
      {/* dots pulsantes */}
      <div style={{ position: "absolute", top: "28%", left: "18%", width: 14, height: 14, borderRadius: 999, background: "#FFF200", boxShadow: "0 0 16px rgba(255,242,0,0.7)" }} />
      <div style={{ position: "absolute", top: "52%", left: "42%", width: 14, height: 14, borderRadius: 999, background: "#2D7D46", border: "2px solid #FFF200" }} />
      <div style={{ position: "absolute", top: "22%", left: "62%", width: 14, height: 14, borderRadius: 999, background: "#2D7D46", border: "2px solid #FFF200" }} />
    </div>
    <div style={{ height: 28 }} />
    <CityLabel name="Birigui" value="98,4%" durationInFrames={durationInFrames} delay={6} />
    <div style={{ height: 8 }} />
    <CityLabel name="Sertãozinho" value="97,5%" durationInFrames={durationInFrames} delay={14} />
    <div style={{ height: 8 }} />
    <CityLabel name="São José do Rio Preto" value="97,3%" durationInFrames={durationInFrames} delay={22} />
  </AbsoluteFill>
);

const Scene05: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const fgScale = interpolate(frame, [0, durationInFrames], [1.03, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", opacity: 0.22 }}>
        <Img src={staticFile("images/vox/cidades-verdes/viveiro_mudas.jpg")} style={{ flex: 1, objectFit: "cover" }} />
        <Img src={staticFile("images/vox/cidades-verdes/equipe_manutencao.jpg")} style={{ flex: 1, objectFit: "cover" }} />
        <Img src={staticFile("images/vox/cidades-verdes/broll_rua_generica.jpg")} style={{ flex: 1, objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.82)" }} />
      {/* Foreground actor halftone — 30% width, zIndex 10 */}
      <Img
        src={staticFile("images/vox/cidades-verdes/ator_halftone_2.jpg")}
        effects={[halftone({ dotSize: 2.8, dotColor: "#111111", colorMode: "solid", shape: "circle" }) as unknown as never]}
        style={{
          position: "absolute",
          right: "6%",
          bottom: "10%",
          width: "28%",
          height: "68%",
          objectFit: "cover",
          objectPosition: "top center",
          opacity: 0.88,
          zIndex: 10,
          transform: `scale(${fgScale})`,
          filter: "grayscale(1) contrast(1.2)",
          border: "2px solid #FFF200",
          borderRadius: 12,
        }}
      />
      <div style={{ zIndex: 12, display: "flex", flexDirection: "column", alignItems: "center", marginRight: "12%" }}>
        <TextReveal durationInFrames={durationInFrames}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 42, fontWeight: 700, color: "#FFFFFF", textAlign: "center", lineHeight: 1.2, textShadow: "0 2px 20px rgba(0,0,0,0.7)" }}>
            Arborização não acontece <span style={{ color: "#FFF200" }}>por acaso.</span>
          </div>
        </TextReveal>
        <TextReveal durationInFrames={durationInFrames} delay={12}>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: 24,
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#AAAAAA",
            }}
          >
            <span>planejamento</span>
            <span style={{ color: "#333" }}>·</span>
            <span>plantio</span>
            <span style={{ color: "#333" }}>·</span>
            <span>regras</span>
            <span style={{ color: "#333" }}>·</span>
            <span>manutenção</span>
          </div>
        </TextReveal>
        <TextReveal durationInFrames={durationInFrames} delay={20}>
          <div style={{ marginTop: 18, width: 200, height: 2, background: "#FFF200" }} />
        </TextReveal>
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 65%, rgba(0,0,0,0.5) 100%)" }} />
    </AbsoluteFill>
  );
};

const Scene06: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => (
  <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {["plantio", "crescimento", "manutenção", "cidade arborizada"].map((label, i) => (
        <React.Fragment key={label}>
          <TextReveal durationInFrames={durationInFrames} delay={i * 8}>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 15,
                fontWeight: i === 3 ? 700 : 400,
                color: i === 3 ? "#FFF200" : "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: "1px",
                padding: "10px 14px",
                border: `1.5px solid ${i === 3 ? "#FFF200" : "#333"}`,
                borderRadius: 999,
                background: i === 3 ? "rgba(255,242,0,0.08)" : "transparent",
              }}
            >
              {label}
            </div>
          </TextReveal>
          {i < 3 && (
            <TextReveal durationInFrames={durationInFrames} delay={i * 8 + 4}>
              <div style={{ color: "#333", fontSize: 18 }}>→</div>
            </TextReveal>
          )}
        </React.Fragment>
      ))}
    </div>
    <TextReveal durationInFrames={durationInFrames} delay={28}>
      <div style={{ marginTop: 24, fontFamily: "Inter, sans-serif", fontSize: 15, color: "#888", textAlign: "center" }}>
        É um processo de <span style={{ color: "#FFF200", fontWeight: 700 }}>anos</span>, não de meses.
      </div>
    </TextReveal>
  </AbsoluteFill>
);

const Scene07: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], [1.04, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center" }}>
      <Img
        src={staticFile("images/vox/cidades-verdes/rua_sombra_densa.jpg")}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.34, transform: `scale(${scale})` }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.8) 100%)" }} />
      <TextReveal durationInFrames={durationInFrames}>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 64, fontWeight: 800, color: "#FFF200", letterSpacing: "-2px" }}>SOMBRA</div>
      </TextReveal>
      <TextReveal durationInFrames={durationInFrames} delay={10}>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: "#AAAAAA", letterSpacing: "3px", textTransform: "uppercase" }}>
          conforto · ambiente · calor menor
        </div>
      </TextReveal>
      <TextReveal durationInFrames={durationInFrames} delay={18}>
        <div style={{ marginTop: 20, fontFamily: "Inter, sans-serif", fontSize: 16, color: "#FFFFFF", textAlign: "center", maxWidth: 640, lineHeight: 1.5 }}>
          Em cidades quentes do interior, <span style={{ color: "#FFF200" }}>isso faz diferença todos os dias.</span>
        </div>
      </TextReveal>
    </AbsoluteFill>
  );
};

const Scene08: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => (
  <AbsoluteFill style={{ backgroundColor: "#0A0A0A", flexDirection: "row" }}>
    <div style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRight: "2px solid #FFF200" }}>
      <Img src={staticFile("images/vox/cidades-verdes/rua_sem_arvores.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.52 }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.62)" }} />
      <div style={{ position: "relative", fontFamily: "Inter, sans-serif", fontSize: 13, letterSpacing: "2px", textTransform: "uppercase", color: "#FFFFFF" }}>Rua sem árvores</div>
      <div style={{ position: "relative", marginTop: 12, width: 160, height: 2, background: "#FFF200", opacity: 0.6 }} />
      <div style={{ position: "relative", marginTop: 12, fontFamily: "Inter, sans-serif", fontSize: 12, color: "#FFF200" }}>asfalto exposto · sol</div>
    </div>
    <div style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile("images/vox/cidades-verdes/rua_com_arvores.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.62 }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(45,125,70,0.52)" }} />
      <div style={{ position: "relative", fontFamily: "Inter, sans-serif", fontSize: 13, letterSpacing: "2px", textTransform: "uppercase", color: "#FFFFFF" }}>Rua arborizada</div>
      <div style={{ position: "relative", marginTop: 12, width: 160, height: 2, background: "#FFF200" }} />
      <div style={{ position: "relative", marginTop: 12, fontFamily: "Inter, sans-serif", fontSize: 12, color: "#FFF200", fontWeight: 700 }}>sombra · conforto</div>
    </div>
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        width: 48,
        height: 48,
        borderRadius: 999,
        background: "#FFF200",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        fontWeight: 800,
        color: "#0A0A0A",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      ×
    </div>
  </AbsoluteFill>
);

const Scene10: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => (
  <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center", padding: 60 }}>
    <TextReveal durationInFrames={durationInFrames}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 36, fontWeight: 700, color: "#FFFFFF", textAlign: "center" }}>
        Não basta <span style={{ color: "#FFF200" }}>quanto</span> verde existe.
      </div>
    </TextReveal>
    <TextReveal durationInFrames={durationInFrames} delay={12}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 36, fontWeight: 800, color: "#FFF200", textAlign: "center", marginTop: 6 }}>
        Importa onde ele está.
      </div>
    </TextReveal>
    <TextReveal durationInFrames={durationInFrames} delay={20}>
      <div style={{ marginTop: 32, display: "flex", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 14, height: 14, background: "#2D7D46", borderRadius: 3 }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#AAA" }}>bem arborizado</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 14, height: 14, background: "#333", borderRadius: 3 }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "#AAA" }}>quase nada</span>
        </div>
      </div>
    </TextReveal>
  </AbsoluteFill>
);

const Scene11: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => (
  <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center" }}>
    <div style={{ position: "absolute", inset: 0, display: "flex", opacity: 0.18 }}>
      <Img src={staticFile("images/vox/cidades-verdes/aerial_birigui.jpg")} style={{ flex: 1, objectFit: "cover" }} />
      <Img src={staticFile("images/vox/cidades-verdes/aerial_sertaozinho.jpg")} style={{ flex: 1, objectFit: "cover" }} />
      <Img src={staticFile("images/vox/cidades-verdes/aerial_sjrp.jpg")} style={{ flex: 1, objectFit: "cover" }} />
    </div>
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.92) 100%)" }} />
    <div style={{ display: "flex", gap: 24, position: "relative" }}>
      {[
        { name: "Birigui", v: "98,4%" },
        { name: "Sertãozinho", v: "97,5%" },
        { name: "SJRio Preto", v: "97,3%" },
      ].map((c, i) => (
        <TextReveal key={c.name} durationInFrames={durationInFrames} delay={i * 7}>
          <div style={{ width: 260, padding: 20, border: "1.5px solid #333", borderRadius: 16, background: "#111", textAlign: "center" }}>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, letterSpacing: "1px", color: "#888", textTransform: "uppercase" }}>{c.name}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 36, fontWeight: 800, color: "#FFF200", marginTop: 6 }}>{c.v}</div>
          </div>
        </TextReveal>
      ))}
    </div>
    <TextReveal durationInFrames={durationInFrames} delay={22}>
      <div
        style={{
          marginTop: 28,
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "#666",
          position: "relative",
        }}
      >
        planejamento · espaço · manutenção · continuidade
      </div>
    </TextReveal>
  </AbsoluteFill>
);

const Scene12: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => (
  <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center", padding: 80 }}>
    <TextReveal durationInFrames={durationInFrames}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 26, fontWeight: 300, color: "#AAAAAA", textAlign: "center" }}>
        A pergunta não é apenas quantas árvores uma cidade tem.
      </div>
    </TextReveal>
    <TextReveal durationInFrames={durationInFrames} delay={14}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 38, fontWeight: 800, color: "#FFF200", textAlign: "center", marginTop: 12 }}>
        A pergunta é: onde estão essas árvores?
      </div>
    </TextReveal>
  </AbsoluteFill>
);

const Scene13: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => (
  <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center" }}>
    <TextReveal durationInFrames={durationInFrames}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 56, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-1px" }}>E A SUA CIDADE?</div>
    </TextReveal>
    <TextReveal durationInFrames={durationInFrames} delay={10}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 56, fontWeight: 800, color: "#FFF200", letterSpacing: "-1px" }}>É ARBORIZADA?</div>
    </TextReveal>
    <TextReveal durationInFrames={durationInFrames} delay={18}>
      <div style={{ marginTop: 20, fontFamily: "Inter, sans-serif", fontSize: 16, color: "#AAAAAA", letterSpacing: "1px" }}>Comente 👇</div>
    </TextReveal>
    <TextReveal durationInFrames={durationInFrames} delay={22}>
      <div style={{ marginTop: 28, fontFamily: "Inter, sans-serif", fontSize: 11, color: "#555" }}>Fonte: IBGE — Censo 2022</div>
    </TextReveal>
  </AbsoluteFill>
);

export const VoxExplainerVideo: React.FC<{ project?: string; audioSrc?: string }> = ({
  project = "cidades-mais-verdes-sp",
  audioSrc = "audio/vox-cidades-verdes-ptbr.mp3",
}) => {
  const durs = VOX_CIDADES_VERDES_DURATIONS as readonly string[];
  let cur = 0;
  const scenes: { id: string; from: number; durationInFrames: number; Comp: React.FC<{ durationInFrames: number }> }[] = [
    { id: "01", from: (cur += 0), durationInFrames: durationToFrames(durs[0]), Comp: Scene01 },
    { id: "02", from: (cur += durationToFrames(durs[0])), durationInFrames: durationToFrames(durs[1]), Comp: Scene02 },
    { id: "03", from: (cur += durationToFrames(durs[1])), durationInFrames: durationToFrames(durs[2]), Comp: Scene03 },
    { id: "04", from: (cur += durationToFrames(durs[2])), durationInFrames: durationToFrames(durs[3]), Comp: Scene04 },
    { id: "05", from: (cur += durationToFrames(durs[3])), durationInFrames: durationToFrames(durs[4]), Comp: Scene05 },
    { id: "06", from: (cur += durationToFrames(durs[4])), durationInFrames: durationToFrames(durs[5]), Comp: Scene06 },
    { id: "07", from: (cur += durationToFrames(durs[5])), durationInFrames: durationToFrames(durs[6]), Comp: Scene07 },
    { id: "08", from: (cur += durationToFrames(durs[6])), durationInFrames: durationToFrames(durs[7]), Comp: Scene08 },
    { id: "09", from: (cur += durationToFrames(durs[7])), durationInFrames: durationToFrames(durs[8]), Comp: (() => (
      <AbsoluteFill style={{ backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center" }}>
        <TextReveal durationInFrames={durationToFrames(durs[8])}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 18, color: "#AAA", textAlign: "center" }}>Parte da chuva fica nas copas. Parte infiltra no solo.</div>
        </TextReveal>
        <TextReveal durationInFrames={durationToFrames(durs[8])} delay={12}>
          <div style={{ marginTop: 10, fontFamily: "Inter, sans-serif", fontSize: 13, letterSpacing: "2px", textTransform: "uppercase", color: "#666" }}>
            interceptação · infiltração
          </div>
        </TextReveal>
      </AbsoluteFill>
    )) as any },
    { id: "10", from: (cur += durationToFrames(durs[8])), durationInFrames: durationToFrames(durs[9]), Comp: Scene10 },
    { id: "11", from: (cur += durationToFrames(durs[9])), durationInFrames: durationToFrames(durs[10]), Comp: Scene11 },
    { id: "12", from: (cur += durationToFrames(durs[10])), durationInFrames: durationToFrames(durs[11]), Comp: Scene12 },
    { id: "13", from: (cur += durationToFrames(durs[11])), durationInFrames: durationToFrames(durs[12]), Comp: Scene13 },
  ];
  // fix first from
  scenes[0].from = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <Audio src={staticFile(audioSrc)} volume={0.9} />
      {scenes.map((s) => (
        <Sequence key={s.id} from={s.from} durationInFrames={s.durationInFrames}>
          <s.Comp durationInFrames={s.durationInFrames} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
