# City Video Generator

Gerador programático de vídeos **Batalha de Cidades** com [Remotion](https://remotion.dev) — compara dados reais (IBGE, IDH, PIB) e transforma rivalidade regional em conteúdo viral para **YouTube Shorts, Reels, TikTok e YouTube**.

> 102 batalhas · 4 campeonatos · 14 rankings Top 10 · 8 campanhas 1-vs-N · 1 documentário Vox · 128 compositions em `src/Root.tsx`

---

## Motores

| Motor | Formato | Duração | Quando usar |
|---|---|---|---|
| **Battle 1v1** `src/BattleVideo.tsx` | `1080x1920` vertical (Shorts) ou `1920x1080` | 23s fixo (`690f`) ou dinâmico `isLong` 3-5min | Duelo direto ex: Uberlândia vs Uberaba |
| **Championship** `src/ChampionshipVideo.tsx` | `1920x1080` | ~2:46 (`5006f`) travado em 128 BPM | Torneio round-robin `n*(n-1)/2` ex: Regional da Mogiana |
| **Campaign 1-vs-N** `src/features/campaign-one-vs-many/` | `1920x1080` | variável `calculateCampaignTotalDuration()` | Uma cidade vs 10 oponentes sequenciais + sponsorship |
| **Top 10** `src/features/top-10-cidades/` | vertical `1080x1920` (~38s) / horizontal `1920x1080` (~65s) | BPM sync `beatsToFrames` | Rankings "As 10 cidades mais ..." (ricas, violentas, populosas) |
| **Vox Explainer** `src/features/vox-explainer/` | `1920x1080` | `6750f = 3m45s` (6-8min configurável) | Documentário editorial estilo Vox com mapas/gráficos/narração |

Todos usam `useCurrentFrame()` + `spring`/`interpolate` e `staticFile("images/cities/...")` — sem CSS transitions.

---

## Tech Stack

- **Remotion 4.0.523** + React 19.2.3 + Tailwind CSS 4.0 + TypeScript 5.9.3 (`remotion.config.ts`)
- **ESLint 9.19.0** + `@remotion/eslint-config-flat` — `npm run lint` passa (`0 errors`)
- Runtime: Node + Bun — `remotion.config.ts` `jpeg` + `overwriteOutput:true`

---

## Estrutura

```
src/
├── Root.tsx                 # orquestrador — 128 Compositions (2082 linhas)
├── BattleVideo.tsx          # engine 1v1 + ProgressBar dourada
├── ChampionshipVideo.tsx    # engine campeonato 128 BPM
├── types.ts                 # BattleRoundFormat, CityData
├── components/              # BattleIntro, BattleRound, BattleWinner, ChampionshipComponents
├── features/
│   ├── campaign-one-vs-many/   # CampaignVideo + scheduler + cenas
│   ├── top-10-cidades/         # Top10CidadesVideo + scenes + utils
│   └── vox-explainer/          # VoxExplainerVideo + bakeoff + projects/cidades-mais-verdes-sp
├── data/                    # 102 batalhas + championships/ (4) + top-10/ (14)
├── seo/                     # 29 .seo.md gerados
└── utils/ChampionshipManager.ts
public/
├── images/cities/{uf}/{letra}/{cidade}.jpg   # 400 arquivos, 729 pastas (27 UFs)
├── audio/*.mp3               # 8 trilhas (Beat Your Competition, vox-ptbr, etc.)
└── intro/                    # earth/water/fire/wind.png
```

Docs canônicos: `STEERING.md` (fonte da verdade), `AI_AGENT_GUIDE.md` (atalho), `memory/MEMORY.md` (patterns Remotion), `CITY-IMAGES-STRUCTURE.md`.

---

## Começo rápido

```bash
npm i              # ou bun install
npm run dev        # Studio http://localhost:3000

# renderizar um vídeo
npx remotion render BattleUberlandiaUberaba out/uberlandia.mp4
npx remotion render ChampionshipMogi out/mogi.mp4
npx remotion render Top10CidadesMaisPopulosas out/top10.mp4
npx remotion render VoxCidadesMaisVerdesSP out/vox.mp4

# lint + tsc (deve passar)
npm run lint
```

---

## Workflows

### Batalha 1v1
1. Pesquise dados IBGE (`brazilian_knowledge` + `brave_fetch`)
2. Salve imagem `public/images/cities/{uf}/{letra}/{cidade}.jpg`
3. Crie `src/data/cidadeA-cidadeB.json` seguindo `.opencode/skills/city_battle_spec/SKILL.md` (Short 4 rounds, Long 7-9)
4. Registre em `src/Root.tsx`: `import data from "./data/..."` + `<Composition id="Battle..." component={BattleVideo} durationInFrames={calculateDuration(data)} width={1080} height={1920} defaultProps={{battleData, image1, image2}} />`

### Championship
```json
// src/data/championships/nome.json
{ "name": "Nome", "cities": [City], "rounds": [Round] }
```
Adicione ao array `championships` em `src/Root.tsx:318` — auto-registra `1920x1080`.

### Top 10
Crie `src/data/top-10/nome.json` `{videoId,title,subtitle,theme,format,metric,cities}` e registre `<Composition component={Top10CidadesVideo} durationInFrames={calculateTop10Duration("vertical")} />`.

### Campaign 1-vs-10
Crie `src/data/cidade-vs-10.json` e registre `<Composition component={CampaignVideo} durationInFrames={calculateCampaignTotalDuration(data)} />`.

### Vox Explainer
Skill `vox_explainer` gera `src/features/vox-explainer/projects/{slug}/` com `storyboard.xml`, `asset-manifest.json`, `narration.ssml`, `sources.json`, `production-notes.md` → TTS → `public/audio/vox-*.mp3` → preview `VoxCidadesMaisVerdesSP`.

---

## Skills (opencode)

| Skill | Uso |
|---|---|
| `city_battle_spec` | criar JSON batalha Short vs Long |
| `top-10-cidades` | ranking Top 10 + BPM sync |
| `youtube_seo` | `src/seo/[matchId].seo.md` título ⚔️ viral + descrição + hashtags |
| `brazilian_knowledge` | dados IBGE/geográficos |
| `brave_fetch` | tendências 2026 / notícias |
| `vox_explainer` / `vox_director` | documentário Vox / collage |
| `remotion-best-practices` | regras `useCurrentFrame`/`staticFile` |

`.opencode/skills/` versionado, `.agents/` ignorado (`.gitignore`). `skills-lock.json` trava versões.

---

## Schemas

**Batalha** `src/data/*.json`
```json
{
  "matchId": "slug",
  "title": "A vs B",
  "cities": [{ "ibgeId","name","state","nickname","data": {"populacao","areaKm2","pibPerCapita","idh"...}, "visual": {"primaryColor","image": "images/cities/uf/l/cidade.jpg"}}],
  "rounds": [{ "id","title","field","format":"compact|integer|year|currency|decimal3","unit","inverse?": bool }]
}
```

---

## Git

Repo GitLab: `git@gitlab.com:josenaves/city-video-generator.git` (`main`)

```bash
git status
git add .
git commit -m "feat: ..."
git push origin main
```

Renders em `out/` estão em `.gitignore`.

---

## Verificação

- [ ] `npm run lint` passa
- [ ] `durationInFrames` confere (`690`, `calculateDuration`, `6750`, `630`)
- [ ] imagens em `public/images/cities/{uf}/{letra}/` e `staticFile()` ok
- [ ] Studio sem flash branco

Última auditoria: 2026-09-11 — 160 → 0 erros lint, `tsc` pass, paths `images/cities/` normalizados, `.agents/` ignorado. Ver `STEERING.md:16`.
