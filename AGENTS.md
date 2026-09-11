# AGENTS — City Video Generator

> **Leia `STEERING.md` no início de TODA sessão.** Este arquivo é só um atalho.

- **Steering canônico:** [`STEERING.md`](./STEERING.md) — fonte da verdade (stack, motores, schemas, timing BPM, workflows, pitfalls)
- **Guia rápido do agente:** [`AI_AGENT_GUIDE.md`](./AI_AGENT_GUIDE.md)
- **Memória Remotion:** [`memory/MEMORY.md`](./memory/MEMORY.md)

**Stack:** Remotion 4.0.409 + React 19 + Tailwind 4 + TypeScript 5.9 | `npm run dev` → Studio | `npx remotion render <Id> out/video.mp4`

**5 Motores:** `BattleVideo.tsx` (1v1) · `ChampionshipVideo.tsx` (todos x todos, 128 BPM) · `features/campaign-one-vs-many/` (1-vs-N) · `features/top-10-cidades/` (ranking) · `features/vox-explainer/` (Vox 6-8min horizontal)

**Regra de ouro Remotion:** animações SÓ com `useCurrentFrame()`+`interpolate`/`spring`; assets SÓ com `staticFile()`; nunca CSS transitions.
