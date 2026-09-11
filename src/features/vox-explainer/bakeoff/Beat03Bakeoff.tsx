import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

// Common torn edge via clip-path
const tornClip = "polygon(0% 2%, 3% 0%, 7% 3%, 12% 0%, 18% 2%, 24% 0%, 30% 3%, 36% 1%, 44% 4%, 52% 0%, 60% 2%, 68% 0%, 76% 3%, 84% 1%, 92% 4%, 100% 2%, 100% 98%, 92% 100%, 84% 97%, 76% 100%, 68% 98%, 60% 100%, 52% 97%, 44% 100%, 36% 98%, 24% 100%, 18% 97%, 12% 100%, 7% 98%, 3% 100%, 0% 98%)";

const Tape: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div
    style={{
      position: "absolute",
      width: 72,
      height: 22,
      background: "rgba(255,255,255,0.82)",
      boxShadow: "0 1px 6px rgba(0,0,0,0.22)",
      opacity: 0.92,
      transform: "rotate(-8deg)",
      ...style,
    }}
  />
);

export const Beat03Newsprint: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#F5F1E8", justifyContent: "center", alignItems: "center", padding: 40 }}>
    {/* flat bold background cream */}
    <div style={{ position: "absolute", inset: 0, background: "#F5F1E8" }} />
    {/* Layer 1: main cut-out - Birigui photo */}
    <div style={{ position: "absolute", left: "8%", top: "12%", width: "42%", height: "58%", background: "#fff", padding: 12, transform: "rotate(-1.2deg)", boxShadow: "0 8px 24px rgba(0,0,0,0.22)", clipPath: tornClip }}>
      <Img src={staticFile("images/vox/cidades-verdes/aerial_birigui.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.1) contrast(1.1)" }} />
      <Tape style={{ top: -10, left: 18, transform: "rotate(-18deg)" }} />
      <Tape style={{ bottom: -8, right: 22, transform: "rotate(12deg)", width: 64, height: 18 }} />
    </div>
    {/* Layer 2: prop - newspaper clipping faixa */}
    <div style={{ position: "absolute", right: "10%", top: "18%", width: "44%", transform: "rotate(1.1deg)", background: "#FFFFFF", padding: "18px 22px", boxShadow: "0 6px 18px rgba(0,0,0,0.18)", clipPath: tornClip }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, letterSpacing: "2px", textTransform: "uppercase", color: "#8B0000" }}>IBGE Censo 2022</div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 52, fontWeight: 900, color: "#0A0A0A", lineHeight: 0.9, marginTop: 6 }}>98,4<tspan style={{ fontSize: 26 }}>%</tspan></div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 700, color: "#0A0A0A" }}>BIRIGUI</div>
      <div style={{ marginTop: 8, width: "100%", height: 3, background: "#C41E3A" }} />
    </div>
    {/* Layer 3: red seal */}
    <div style={{ position: "absolute", right: "14%", top: "48%", width: 86, height: 86, borderRadius: 999, background: "#C41E3A", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 11, textAlign: "center", lineHeight: 1.1, transform: "rotate(8deg)", boxShadow: "0 4px 12px rgba(0,0,0,0.22)", border: "3px solid #fff" }}>
      TOP 1<br />BRASIL
    </div>
    {/* Layer 4: decorative scraps - 2nd city strips */}
    <div style={{ position: "absolute", left: "12%", bottom: "14%", display: "flex", gap: 14 }}>
      <div style={{ background: "#0A0A0A", color: "#F5F1E8", padding: "10px 14px", transform: "rotate(-0.8deg)", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, boxShadow: "0 4px 12px rgba(0,0,0,0.18)" }}>
        Sertãozinho 97,5% <span style={{ color: "#FFF200" }}>•</span>
      </div>
      <div style={{ background: "#2D7D46", color: "#fff", padding: "10px 14px", transform: "rotate(0.9deg)", fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 700, boxShadow: "0 4px 12px rgba(0,0,0,0.18)" }}>
        SJRio Preto 97,3%
      </div>
    </div>
    {/* headline banner torn */}
    <div style={{ position: "absolute", bottom: "6%", left: "50%", transform: "translateX(-50%) rotate(-0.4deg)", background: "#0A0A0A", color: "#F5F1E8", padding: "10px 18px", fontFamily: "Inter, sans-serif", fontSize: 13, letterSpacing: "2px", textTransform: "uppercase", clipPath: tornClip }}>
      As 3 mais arborizadas — Brasil
    </div>
    {/* halftone dots overlay subtle */}
    <div style={{ position: "absolute", inset: 0, opacity: 0.07, backgroundImage: "radial-gradient(#000 1.2px, transparent 1.2px)", backgroundSize: "10px 10px", pointerEvents: "none" }} />
  </AbsoluteFill>
);

export const Beat03Swiss: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center", padding: 40 }}>
    {/* grid */}
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#EEE 1px, transparent 1px), linear-gradient(90deg, #EEE 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.6 }} />
    <div style={{ position: "absolute", left: "6%", top: "10%", width: "44%", height: "62%", background: "#fff", border: "1.5px solid #0A0A0A", padding: 14, boxShadow: "0 10px 28px rgba(0,0,0,0.12)" }}>
      <Img src={staticFile("images/vox/cidades-verdes/aerial_birigui.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0) contrast(1.05)" }} />
      <div style={{ position: "absolute", top: -8, left: 16, background: "#FF3B30", color: "#fff", padding: "4px 8px", fontFamily: "Inter, sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: "1px" }}>BIRIGUI • 98,4%</div>
    </div>
    <div style={{ position: "absolute", right: "8%", top: "12%", width: "40%", background: "#0A0A0A", color: "#fff", padding: 28 }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "#FF3B30" }}>IBGE 2022</div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 64, fontWeight: 800, letterSpacing: "-3px", marginTop: 8 }}>98,4<tspan style={{ fontSize: 28 }}>%</tspan></div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", marginTop: 6 }}>Birigui — Top 1 Brasil</div>
      <div style={{ marginTop: 18, height: 2, background: "#FF3B30", width: "100%" }} />
      <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", fontFamily: "Inter, sans-serif", fontSize: 11, color: "#AAA" }}>
        <span>Sertãozinho 97,5%</span>
        <span>SJRP 97,3%</span>
      </div>
    </div>
    <div style={{ position: "absolute", bottom: "8%", left: "6%", right: "6%", height: 1, background: "#0A0A0A", opacity: 0.15 }} />
    <div style={{ position: "absolute", bottom: "4.5%", left: "6%", fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "#888" }}>As 3 mais arborizadas — Brasil • Fonte: IBGE Censo 2022</div>
    <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "8px 8px", pointerEvents: "none" }} />
  </AbsoluteFill>
);

export const Beat03AmericanRetro: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#FFD23F", justifyContent: "center", alignItems: "center", padding: 36 }}>
    <div style={{ position: "absolute", inset: 0, background: "#FFD23F" }} />
    {/* wood-type headline */}
    <div style={{ position: "absolute", top: "6%", left: "50%", transform: "translateX(-50%) rotate(-1deg)", background: "#0A0A0A", color: "#FFD23F", padding: "14px 24px", fontFamily: "Inter, sans-serif", fontSize: 28, fontWeight: 900, letterSpacing: "-1px", clipPath: tornClip, boxShadow: "0 8px 20px rgba(0,0,0,0.22)" }}>
      KING OF GREEN — 98,4%
    </div>
    <div style={{ position: "absolute", left: "7%", top: "22%", width: "46%", height: "56%", background: "#fff", padding: 10, transform: "rotate(-1.4deg)", boxShadow: "0 10px 26px rgba(0,0,0,0.22)", clipPath: tornClip, border: "3px solid #0A0A0A" }}>
      <Img src={staticFile("images/vox/cidades-verdes/aerial_birigui.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", bottom: 12, left: 12, background: "#C41E3A", color: "#fff", padding: "8px 14px", fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 900, letterSpacing: "0.5px", transform: "rotate(-2deg)", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>BIRIGUI • TOP 1</div>
      <Tape style={{ top: -10, right: 18, background: "#0A0A0A", opacity: 0.92 }} />
    </div>
    <div style={{ position: "absolute", right: "8%", top: "26%", width: "38%", background: "#FFFFFF", padding: 20, transform: "rotate(1.2deg)", boxShadow: "0 8px 20px rgba(0,0,0,0.18)", clipPath: tornClip, borderLeft: "6px solid #C41E3A" }}>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 800, color: "#C41E3A", letterSpacing: "2px" }}>IBGE 2022 • CENSO</div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 44, fontWeight: 900, color: "#0A0A0A", marginTop: 6 }}>Sertãozinho 97,5%</div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 44, fontWeight: 900, color: "#0A0A0A" }}>SJRP 97,3%</div>
      <div style={{ marginTop: 12, fontFamily: "Inter, sans-serif", fontSize: 16, fontWeight: 700, color: "#0A0A0A", letterSpacing: "0.5px" }}>Interior de SP domina o topo</div>
    </div>
    <div style={{ position: "absolute", right: "8%", bottom: "8%", width: 124, height: 124, borderRadius: 999, background: "#0A0A0A", color: "#FFD23F", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 18, textAlign: "center", lineHeight: 1.05, transform: "rotate(9deg)", border: "4px solid #fff", boxShadow: "0 8px 22px rgba(0,0,0,0.28)" }}>
      BRASIL<br />#1
    </div>
    <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)", backgroundSize: "12px 12px", pointerEvents: "none" }} />
  </AbsoluteFill>
);
