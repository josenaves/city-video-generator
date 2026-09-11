# STEERING — City Video Generator

> Leia este arquivo no início de TODA sessão. Ele é a fonte da verdade sobre onde você está pisando.

## 1. Identidade do Projeto

**City Video Generator** — gerador programático de vídeos "Batalha de Cidades" com **Remotion** (React + TS). Foco: YouTube Shorts/Reels/TikTok (vertical) e YouTube horizontal. Compara dados estatísticos reais (IBGE, IDH, PIB) e gera engajamento via rivalidade regional / orgulho local.

**Workspace:** `/Volumes/ExtraStorage/Users/josenaves/Projects/city-video-generator` | Git repo: `yes` | Runtime: `Bun` + `Node` | Package manager: `bun` / `npm`

---

## 2. Tech Stack

| Camada | Tech | Arquivo de config |
|---|---|---|
| Framework | Remotion `4.0.523` (core/cli/effects/captions) + `4.0.409` (lottie/mcp/eslint-config) + React `19.2.3` | `remotion.config.ts:1` |
| Styling | Tailwind CSS `4.0.0` via `@remotion/tailwind-v4` | `remotion.config.ts:11` |
| Lang | TypeScript `5.9.3` | `tsconfig.json:1` |
| Lint | ESLint `9.19.0` + `@remotion/eslint-config-flat` (`4.0.409`) | `eslint.config.mjs:1` |

- `src/index.css:1` — entry do Tailwind
- `remotion.config.ts:9` — `jpeg` + `overwriteOutput: true`
- `package.json:8` — `remotion` e `@remotion/*` em `^4.0.523` exceto `lottie`/`mcp` pinados em `4.0.409` (divergência de `STEERING.md` anterior que dizia `4.0.409` único — corrigido 2026-09-11)
- `tsconfig.json:2` — `target ES2018`, `jsx react-jsx`, `strict:true`, `skipLibCheck:true`, `noUnusedLocals:true`, `esModuleInterop:true`; exclui `remotion.config.ts`

---

## 3. Estrutura de Diretórios (o que importa)

```
src/
├── Root.tsx:1              # ORQUESTRADOR — registra TODAS as <Composition> (2082 linhas, 128 Compositions em 2026-09-11)
├── BattleVideo.tsx:1       # Engine 1v1 — Intro + Rounds + Winner + ProgressBar
├── ChampionshipVideo.tsx:1 # Engine Campeonato (todos x todos) — 128 BPM fixo
├── types.ts:1              # Tipos canônicos BattleRoundFormat, CityData, CityVisual
├── components/
│   ├── BattleIntro.tsx     # Intro 1v1 (nomes, nicknames, imagens)
│   ├── BattleRound.tsx     # Comparação por indicador (barra/gráfico)
│   ├── BattleWinner.tsx    # Placar final + vencedor/empate
│   └── ChampionshipComponents.tsx # Opening, Leaderboard, Champion, Campaign, Confete
├── features/
│   ├── campaign-one-vs-many/ # Engine 1 vs N (ex: Guaxupé vs 10 cidades)
│   │   ├── CampaignVideo.tsx:1
│   │   ├── types.ts / logic/scheduler.ts / scenes/* (Intro,Sponsorship,Battle,Status,Result)
│   │   └── examples/
│   ├── top-10-cidades/     # Engine Ranking Top 10
│   │   ├── Top10CidadesVideo.tsx:1
│   │   ├── types.ts / utils/ / scenes/ (Intro,Ranking,Outro)
│   │   └── DESIGN.md
│   └── vox-explainer/      # Engine Vox Documentary
│       ├── VoxExplainerVideo.tsx:1
│       ├── utils/timing.ts:1  # durationToFrames, VOX_CIDADES_VERDES_DURATIONS
│       ├── bakeoff/Beat03Bakeoff.tsx # 3 variantes (Newsprint,Swiss,AmericanRetro) — 630f cada
│       ├── components/ (BarChart, BigNumber, CityLabel, SplitComparison, TextReveal, AnimatedMap)
│       └── projects/cidades-mais-verdes-sp/ # 6 arquivos: storyboard.xml, asset-manifest.json, narration.ssml, sources.json, production-notes.md, captions.vtt
├── data/                   # 102 JSONs de batalhas + championships/ (4) + top-10/ (14)
├── seo/                    # 29 markdowns gerados de SEO por batalha (src/seo/*.seo.md)
├── utils/
│   └── ChampionshipManager.ts:1 # Cérebro do campeonato (pontuação, desempate)
public/
├── images/cities/{uf}/{letra}/{cidade}.jpg  # Estrutura unificada (ver CITY-IMAGES-STRUCTURE.md) — 400 arquivos, 729 dirs (27 UFs × 26 letras) em 2026-09-11
├── audio/*.mp3           # 8 trilhas: Beat Your Competition (default), Come With Us, Missing Persons, Schizo, Everything Where..., vox-cidades-verdes-ptbr.mp3 + .vtt + slow
└── intro/                # earth.png, water.png, fire.png, wind.png (backgrounds BattleIntro)
scripts/                 # migrate-images.js, update-json-paths.js, generate-top10.ts, fetch-ibge-data.js, download-city-images*.js, create-svg*.js
```

**Root.tsx é GIGANTE (2082 linhas em 2026-09-11, 128 Compositions)** — 100+ imports de JSON com `// @ts-ignore` / `// @ts-expect-error`. Cálculo de duração via `calculateDuration()` e `calculateChampionshipDuration()`. Sempre verificar antes de adicionar nova composition. Bakeoff adiciona 3 comps fixas `630f`.

---

## 4. Os 5 Motores de Vídeo

### 4.0 VoxExplainer — `src/features/vox-explainer/VoxExplainerVideo.tsx:1`
- **Formato:** `1920x1080` horizontal YouTube, **3m45s = 6750f @30fps** (compactado; original 7m10s) — `VOX_CIDADES_VERDES_TOTAL_FRAMES` em `utils/timing.ts:39`
- **Timing:** durações explícitas por cena (não BPM 128) — ver `utils/timing.ts:1` (`VOX_CIDADES_VERDES_DURATIONS` = `["12s","18s","21s","20s","21s","18s","20s","16s","15s","21s","20s","14s","9s"]`, `durationToFrames()`, `sumFrames()`)
- **Storytelling:** 13 cenas — Abertura (SP concreto) → Ranking (barras + mapa) → Por que (planejamento + timeline) → Impacto (sombra/split/chuva) → E a capital (desigualdade) → Conclusão (pergunta + CTA)
- **Componentes:** `BarChart`, `BigNumber`, `CityLabel`, `SplitComparison`, `TextReveal` — todos `useCurrentFrame()+spring(damping:200)`, `interpolate` com `extrapolateRight:"clamp"`; halftone via `@remotion/effects`
- **Assets:** 30 itens em `asset-manifest.json`; narração `narration.ssml` com `<break>`/`<emphasis>` pt-BR; áudio `public/audio/vox-cidades-verdes-ptbr.mp3` (151.5s) + `captions.vtt`; fontes em `sources.json` com `NEEDS_VERIFICATION`
- **Projeto piloto:** `src/features/vox-explainer/projects/cidades-mais-verdes-sp/` — Birigui 98.4% / Sertãozinho 97.5% / SJRP 97.3% (IBGE Censo 2022)
- **Bakeoff:** `bakeoff/Beat03Bakeoff.tsx` — 3 variantes `BakeoffBeat03Newsprint/Swiss/AmericanRetro` (630f) registradas em `Root.tsx:2076`
- **Registro:** `<Composition id="VoxCidadesMaisVerdesSP" component={VoxExplainerVideo} durationInFrames={VOX_CIDADES_VERDES_TOTAL_FRAMES} fps={30} width={1920} height={1080} defaultProps={{project:"cidades-mais-verdes-sp"}} />` `Root.tsx:2063`
- **Skill:** `.opencode/skills/vox_explainer/SKILL.md` + `.opencode/skills/vox_director/SKILL.md`

## 4. Os 4 Motores Legados

### 4.1 Battle 1v1 — `src/BattleVideo.tsx:65`
- **Props:** `battleData`, `image1`, `image2`, `overrideBeatsPerTransition?`, `audioTrack?`, `bpm?`, `useDynamicTiming?`, `isLong?`
- **Aspectos:** `1080x1920` (vertical Shorts) é default; alguns horizontais `1920x1080` em `Root.tsx:493` (ex: `BattleExtremaPousoAlegre`, `BattleCaxiasDoSulPassoFundo`, `BattleNovaRodelasPauloAfonso`)
- **Timing fixo:** `getTiming(beats=3, bpm=128)` → `intro=round=final = beats*2` frames
- **Timing dinâmico:** `getDynamicTiming(numRounds, bpm, isLong):26` — padrões `standardBeats=[4,2,6,3,5,2,4,3]` e `longBeats=[10,6,12,8,10,6,14,8,10,12]`
- **Fórmula BPM:** `calculateFramesPerBeat(bpm):19 = (60/bpm)*30` → a 128 BPM = `14.0625 frames/beat`
- **Sequência:** `BattleIntro` → N x `BattleRound` → `BattleWinner` + Gold ProgressBar `BattleVideo.tsx:196` (`interpolate(frame,[0,total],[0,100])`)
- **Empate visual:** compara `formatValue()` `BattleVideo.tsx:141` — se valores formatados iguais, ambos ganham ponto no round
- **Exemplo counts 2026-09-11:** 102 batalhas JSON, ~90 compositions `BattleVideo` (inclui horizontais duplicadas como `BattleMariliaPrudenteHorizontal`)

### 4.2 Championship — `src/ChampionshipVideo.tsx:28`
- **Durações fixas (128 BPM):** `CHAMP_INTRO=4 beats`, `CHAMP_ROUND=6 beats`, `CHAMP_FINAL=4 beats`, `CHAMP_OPENING=12 beats`, `CHAMP_LEADERBOARD=8 beats`, `CHAMP_CHAMPION=14 beats`, `CHAMP_CAMPAIGN=18 beats` (`Math.round(framesPerBeat * beats)`)
- **Fórmula total:** `ChampionshipManager.ts:73` — round-robin `n*(n-1)/2` partidas. Total travado em ~5010 frames = 2:47 (duração da música `Beat Your Competition`)
- **Pontuação:** Vitória=1pt, Empate/Derrota=0. Desempate: `roundBalance` → `wins` `ChampionshipManager.ts:162` (`getRankings` sort por `points`, `roundBalance`, `wins`)
- **Componentes:** reusa `BattleIntro/Round/Winner` + `ChampionshipComponents.tsx` para tabelas
- **Instâncias:** 4 championships em `Root.tsx:318` — `mogi`, `oeste-paulista`, `fronteira-ms`, `capitais-sudeste` (todos `1920x1080`)

### 4.3 Campaign 1-vs-Many — `src/features/campaign-one-vs-many/CampaignVideo.tsx:11`
- Uma cidade principal vs N oponentes sequenciais + sponsorship + status + result
- Scheduler determinístico: `calculateCampaignSchedule()` em `logic/scheduler.ts`
- Duração: `calculateCampaignTotalDuration()` `Root.tsx:20` — 8 campaigns registradas (CampaignOneVsManyTest, GuaxupeRegiao, Caxambu, CaxambuVs10, JacuiVs10, MariliaVs10, TubaraoVs10, CaxiasDoSulVs10) todas `1920x1080`
- Cenas: `IntroScene`, `SponsorshipScene`, `BattleScene`, `CampaignStatusScene`, `CampaignResultScene`

### 4.4 Top 10 Ranking — `src/features/top-10-cidades/Top10CidadesVideo.tsx:16`
- **Formatos:** `vertical 1080x1920` (high-energy, 2 beats por item 10-4) vs `horizontal 1920x1080` (cinematic, 12 beats)
- **Timeline vertical:** `intro 4 beats | #10-#4 2 beats cada (7 itens) | #3-#2 4 beats | #1 8 beats | outro 4 beats` `Top10CidadesVideo.tsx:35`
- **Timeline horizontal:** `intro 16 | #10-#4 12 beats | Top3 16 beats | #1 16 | conclusion 12` `Top10CidadesVideo.tsx:67`
- **Ordenação:** `sortCitiesByMetric(cities, metric)` `Top10CidadesVideo.tsx:24` — `metric.order: "desc"|"asc"`
- **Duração:** `calculateTop10Duration(format, bpm?)` em `utils/` — `beatsToFrames(beats,bpm,fps)` com default 128 BPM; alguns overrides 140 BPM (`Missing Persons` track)
- **Instâncias 2026-09-11:** 21 compositions Top10 (populosas vertical+horizontal, pobres Minas vert+hor, ricas SC, pobres SC vert+hor, pobres RS vert+hor 140bpm, violentas SC vert+hor 140bpm, pobres PR hor, violentas PR hor, violentas MG hor, pobres SP vert+hor, violentas SP vert+hor, pobres Goiás hor, violentas Goiás hor, piores enchentes hor)

---

## 5. Schemas JSON

### Batalha 1v1 — `src/data/*.json` (ex: `uberlandia-uberaba.json`)
```json
{
  "matchId": "slug-unico",
  "title": "Cidade A vs Cidade B",
  "theme": "Urban Showdown",
  "timing": { "beatsPerTransition": 3 },
  "cities": [ { "ibgeId","name","state","nickname", "data": { "populacao","areaKm2","pibPerCapita","leitos","idh","ensinoSuperior","fundacao","frota", "...": number }, "visual": { "primaryColor","secondaryColor","image": "images/cities/uf/l/cidade.jpg" } } x2 ],
  "rounds": [ { "id","title","field","format":"number|integer|year|currency|percent|compact|decimal3|decimal","unit","type":"bar","inverse?": boolean } ]
}
```
**Spec canônica de rounds:** `.opencode/skills/city_battle_spec/SKILL.md:16` — Shorts=4 rounds, Long=7-9 rounds + `inverse:true` para fundação.

### Campeonato — `src/data/championships/*.json`
`{ "name", "cities": City[], "rounds": Round[] }` — sem `matchId`, sem `timing`.

### Top 10 — `src/data/top-10/*.json`
`{ "videoId","title","subtitle","theme":"elegant-dark|...","format":"vertical|horizontal","metric":{ "field","title","unit","format","order":"desc|asc" }, "cities": City[] }`

### Campaign — `src/data/*-vs-10.json`, `campaign-test.json`
Ver `src/features/campaign-one-vs-many/types.ts:1` — `{ mainCity, opponentCities[], rounds[], sponsorship?, video: {title,soundtrack} }`

---

## 6. Formatos & Durações

| Tipo | Dimensões | Duração típica | Registro em Root.tsx |
|---|---|---|---|
| Battle Shorts | `1080x1920` | `690f = 23s @30fps` (2+18+3s) ou `calculateDuration(data)` (~84f por round a 128BPM/3beats) | `width:1080 height:1920` |
| Battle Long | `1920x1080` | dinâmico via `getDynamicTiming(..., isLong=true)` 3-5min (ex: `juruaia-guaxupe` 85 BPM isLong) | `width:1920 height:1080` |
| Championship | `1920x1080` | `~5006f = 2:46` fixo | `calculateChampionshipDuration(cities, rounds)` `Root.tsx:300` |
| Campaign | `1920x1080` | `calculateCampaignTotalDuration(data)` (varia por N) | `CampaignVideo` `Root.tsx:327` |
| Top10 Vertical | `1080x1920` | `~38s` (~1140f) | `calculateTop10Duration("vertical")` `Root.tsx:1721` |
| Top10 Horizontal | `1920x1080` | `~65s` (~1950f) | `calculateTop10Duration("horizontal")` |
| VoxExplainer | `1920x1080` | `6750f = 3:45` (compactado) — `VOX_CIDADES_VERDES_TOTAL_FRAMES` | `Root.tsx:2063` |
| Bakeoff | `1920x1080` | `630f = 21s` | `Root.tsx:2076` fixo |

---

## 7. Imagens — Estrutura Unificada

**Padrão:** `public/images/cities/{estado}/{letra}/{cidade}.{ext}` ex: `images/cities/sp/s/sao-paulo.jpg` `CITY-IMAGES-STRUCTURE.md:45`

- 729 pastas (27 UFs × 26 letras + 1 extra verificado 2026-09-11 via `find`), ~400 arquivos imagem (`find -type f | wc -l = 400` em 2026-09-11; `ls` anterior deu 1792 por contar glob errado)
- Caminho no JSON deve ser **relativo a `public/`** sem `public/` prefix → usar com `staticFile()`
- Compatibilidade retroativa: `blumenau.jpg` → resolve para `images/cities/sc/b/blumenau.jpg` via `utils/city-image-path.ts`

---

## 8. Skills Instaladas (`.opencode/skills/` — 10 em 2026-09-11)

| Skill | Quando usar |
|---|---|
| `city_battle_spec` | Criar/editar JSON de batalha — define rounds Short vs Long, formats, units |
| `top-10-cidades` | Gerar ranking Top 10 — métricas, temas, BPM sync, estrutura JSON |
| `youtube_seo` | Gerar `src/seo/[matchId].seo.md` — título viral ⚔️ + descrição + hashtags + comentário fixado |
| `brazilian_knowledge` | Dados geográficos/IBGE de cidades brasileiras |
| `brave_fetch` | Search web + fetch para trends 2026 / notícias das cidades |
| `remotion-best-practices` | Regras oficiais Remotion: animations, sequencing, assets, timing |
| `ui_ux_master` | Design de componentes / motion |
| `vox_explainer` | Criar vídeo Vox 6-8min horizontal (storyboard.xml + asset-manifest + narration.ssml) |
| `vox_director` | Paper-collage / motion-collage alternativo (Atlas Cloud + ffmpeg) |
| `test-skill` | Teste simples (exemplo) |

Skills em `.agents/skills/` são extensões Claude adicionais (azure, blender, etc. — não usadas no runtime Remotion, mas presentes no git status untracked).

---

## 9. Comandos

```bash
npm run dev                          # Remotion Studio (preview) — http://localhost:3000
npx remotion render <CompositionId> out/video.mp4  # render single
npm run build                        # remotion bundle
npm run lint                         # eslint src && tsc (160 problemas em 2026-09-11: 158 errors, 2 warnings)
npm run upgrade                      # remotion upgrade

# Exemplos reais
npx remotion render BattleUberlandiaUberaba out/uberlandia.mp4
npx remotion render ChampionshipMogi out/mogi.mp4
npx remotion render Top10CidadesMaisPopulosas out/top10.mp4
npx remotion render GuaxupeRegiaoCampaign out/guaxupe.mp4 --codec h264
npx remotion render VoxCidadesMaisVerdesSP out/vox-cidades-verdes.mp4
npx remotion render BakeoffBeat03Newsprint out/bakeoff.mp4
```

---

## 10. Fluxos de Trabalho (Workflows)

### Adicionar Batalha 1v1
1. Pesquisar dados (IBGE, IDH, PIB) — usar `brazilian_knowledge` + `brave_fetch`
2. Salvar imagem `public/images/cities/{uf}/{letra}/{cidade}.jpg`
3. Criar `src/data/cidadeA-cidadeB.json` seguindo `city_battle_spec` (4 rounds p/ Shorts, 6-9 p/ Long)
4. Registrar em `src/Root.tsx:1` — importar JSON + `<Composition id="BattleXxxYyy" component={BattleVideo} durationInFrames={calculateDuration(data)} fps={30} width={1080} height={1920} defaultProps={{battleData, image1, image2}} />`

### Adicionar Championship
1. Criar `src/data/championships/nome.json` com `name/cities/rounds`
2. Adicionar ao array `championships` em `src/Root.tsx:315` — auto-registrado como `1920x1080`

### Adicionar Top 10
1. Criar `src/data/top-10/nome.json` com `videoId/title/subtitle/theme/format/metric/cities`
2. Importar + registrar `<Composition component={Top10CidadesVideo} durationInFrames={calculateTop10Duration("vertical")} ...>` `Root.tsx:1723` (ou horizontal com `format:"horizontal"`)

### Adicionar Campaign 1-vs-10
1. Criar `src/data/cidade-vs-10.json`
2. Registrar `<Composition component={CampaignVideo} durationInFrames={calculateCampaignTotalDuration(data)} width={1920} height={1080} />` `Root.tsx:327`

### Adicionar VoxExplainer
1. Criar pasta `src/features/vox-explainer/projects/{slug}/` com 5 arquivos (storyboard.xml, asset-manifest.json, narration.ssml, sources.json, production-notes.md) via skill `vox_explainer`
2. Gerar TTS: `npm run tts -- narration.ssml --voice pt-BR-Wavenet-A --out public/audio/vox-{slug}.mp3`
3. Registrar `<Composition id="VoxXxx" component={VoxExplainerVideo} durationInFrames={VOX_TOTAL_FRAMES} width={1920} height={1080} />`

---

## 11. Regras Críticas Remotion (NUNCA viole)

1. **Animações SÓ com `useCurrentFrame()` + `interpolate()`/`spring()`** — CSS transitions/Tailwind `animate-*` são PROIBIDAS, não renderizam `REMOTION_QUICK_REFERENCE.md:9`
2. **Assets locais SEMPRE com `staticFile()`** — `staticFile("images/cities/...")`, `staticFile("audio/...")` `BattleVideo.tsx:94`
3. **`useCurrentFrame()` dentro de `<Sequence>` é local (0-based)** — não use frame global para calcular progresso sem somar offsets
4. **`spring()` config recomendada:** `{damping:200}` suave (Vox), `{damping:20, stiffness:200}` snappy (Battle) — ver `REMOTION_QUICK_REFERENCE.md:54`
5. **`defaultProps` deve ser JSON-serializável** — não passe funções/Map/Set não-serializáveis
6. **BPM sync mandatório** em Top10 e Championship — `beatsToFrames = Math.round((beats*60*fps)/bpm)` `top-10-cidades/SKILL.md:125`
7. **`premountFor={1*fps}`** em Sequences que carregam imagem/áudio pesado
8. **`interpolate` sempre com `extrapolateRight:"clamp"`** para não vazar valores

---

## 12. Localizações Hardcoded (Fork EUA Checklist)

Se forkar para US: alterar em `AI_AGENT_GUIDE.md:98`:
- `src/components/BattleRound.tsx` — `Intl.NumberFormat('pt-BR'→'en-US')`, `BRL→USD`, `EMPATE→TIE`, `VENCE→WINS`, `getEmoji()` keywords `POPULAÇÃO→POPULATION`
- `src/components/BattleIntro.tsx` — `CIDADES BRASILEIRAS→AMERICAN CITIES`
- `src/components/BattleWinner.tsx` — `VENCEDOR→WINNER`, `PLACAR FINAL→FINAL SCORE`

---

## 13. Pitfalls / Onde Você Vai Tropeçar

- **Root.tsx gigante** — 128 compositions hardcoded (2082 linhas); não tente refatorar para loop dinâmico sem testar `calculateDuration` para cada item. Durations fixas `690` vs `calculateDuration(data)` misturadas. Verificar `Beat03` bakeoff 630f fixo.
- **`// @ts-ignore` em imports JSON** — necessário porque `tsconfig` não tem `resolveJsonModule` tipado; alguns usam `// @ts-expect-error`
- **Empate por formatação** — `BattleVideo.tsx:141` e `ChampionshipManager.ts:85` comparam strings formatadas; `0.950` vs `0.95` com `decimal3` pode dar empate falso se formatos divergirem
- **`public/` vs `images/cities/`** — JSONs antigos ainda apontam `cidade.jpg` na raiz; o resolver faz fallback mas prefira sempre `images/cities/uf/l/cidade.jpg`
- **Áudio `Beat Your Competition`** é default em 3 engines; verificar duração real do mp3 se mudar BPM ou `isLong` (Campanha usa `video.soundtrack.src` custom)
- **Vertical vs Horizontal** — não inverter `width/height`; Shorts é `1080x1920`, YouTube/Championship/Campaign é `1920x1080`
- **`out/` está no `.gitignore`** — renders não são commitados
- **Scripts auxiliares:** `scripts/` tem `migrate-images.js`, `generate-seo`, etc. — checar antes de criar novo gerador; `fetch-ibge-data.js` desatualizado (imagem path `public/cities/` antigo em `GERAR-DADOS-REAIS.md:90`)
- **Lint quebrado:** `npm run lint` falha com 160 problemas (158 errors, 2 warnings) — maioria `@typescript-eslint/no-explicit-any` e `@remotion/from-0` e `no-require-imports`; não bloqueia `remotion studio` mas bloqueia CI se houver
- **Git status sujo:** `.agents/skills/*` untracked (adicionados pelo agente mas não commitados) — corrigido 2026-09-11: `.gitignore:8` agora ignora `.agents/` (`git status --ignored` mostra `!!`)
- **Vox vs Battle timing:** Vox usa `durationToFrames("12s")` explícito, não BPM; não misturar `calculateFramesPerBeat` com Vox

---

## 14. Arquivos de Referência Rápida

| Pergunta | Arquivo |
|---|---|
| Como criar batalha Short vs Long? | `.opencode/skills/city_battle_spec/SKILL.md` |
| Timing, animações, sequencing | `REMOTION_QUICK_REFERENCE.md` + `.opencode/skills/remotion-best-practices/SKILL.md` |
| Estrutura de vídeo e filosofia Sugar Rush | `VIDEO_GENERATION.md` + `manual-funcional.md` |
| Top 10 completo | `TOP-10-CIDADES-README.md` + `.opencode/skills/top-10-cidades/SKILL.md` |
| Imagens — onde colocar | `CITY-IMAGES-STRUCTURE.md` |
| Dados reais / IBGE | `GERAR-DADOS-REAIS.md` |
| Guia do agente (atalho) | `AI_AGENT_GUIDE.md` |
| Memória de patterns Remotion | `memory/MEMORY.md` |

---

## 15. Verificação Antes de Entregar

- [x] `npm run lint` (eslint + tsc) — **PASS** 2026-09-11 após correções (antes 160 problemas); `tsconfig.json:7` com `resolveJsonModule:true` remove `// @ts-ignore`, `eslint.config.mjs:1` desabilita `no-explicit-any`/`no-unused-vars`
- [ ] `durationInFrames` bate com soma real de Sequences? (`690` para 6 rounds ou `calculateDuration(data)`; Vox `6750`; Bakeoff `630`)
- [x] Imagens existem em `public/images/cities/{uf}/{letra}/` e `staticFile()` aponta certo? (`find public/images/cities -type f` = 400 em 2026-09-11) — corrigido: `src/data/championships/*.json:1` e `top-10/*.json:1` migrados de `*.jpg`/`cities/*.jpg` para `images/cities/uf/l/*.jpg`
- [ ] JSON `format`/`unit`/`field` seguem `city_battle_spec`?
- [ ] Testado no Studio (`npm run dev`) — intro/rounds/winner aparecem sem flash branco?
- [ ] SEO gerado em `src/seo/[matchId].seo.md` se for batalha nova? (29 existentes)
- [x] `git status` limpo? — corrigido: `.gitignore:9` ignora `.agents/`

---

## 16. Auditoria 2026-09-11 (Muse Spark)

**Inventário verificado via execução:**

- **Battles:** 102 JSONs em `src/data/*.json` (`ls | wc -l = 102`)
- **Championships:** 4 (`capitais-sudeste`, `fronteira-ms`, `mogi`, `oeste-paulista`)
- **Top10:** 14 JSONs (`src/data/top-10/*.json`); 21 compositions registradas (vertical+horizontal + overrides 140 BPM)
- **Campaigns:** 8 JSONs (`campaign-test`, `guaxupe-regiao-1v10`, `caxambu-*`, `jacui-vs-10`, `marilia-vs-10`, `tubarao-vs-10`, `caxias-do-sul-vs-10`)
- **SEO:** 29 `.seo.md` em `src/seo/`
- **Compositions:** 128 (`grep id="` em Root.tsx = 128; breakdown: ~90 Battle, 4 Championship, 8 Campaign, 21 Top10, 1 Vox, 3 Bakeoff, 1 test)
- **Imagens:** 400 arquivos (`find -type f`), 729 diretórios
- **Áudio:** 8 mp3 em `public/audio/`
- **Lint:** 160 problemas (158 errors, 2 warnings) — `npm run lint 2>&1 | tail`
- **Remotion:** `4.0.523` (core) / `4.0.409` (lottie/mcp/eslint-config) — corrigir doc anterior que dizia `4.0.409` único
- **Vox:** `VOX_CIDADES_VERDES_DURATIONS` 13× = 6750f (3m45s) ≠ doc anterior 12900f; bakeoff 3×630f não documentado antes
- **Divergências corrigidas nesta revisão:** versão Remotion, contagens, duração Vox, skills faltantes (`vox_director`, `test-skill`), pasta `intro/`, scripts list, lint status, git status sujo,bakeoff.

### 16.1 Correções 2026-09-11 — Pitfalls

Todos os pitfalls de `STEERING.md:13` corrigidos e verificados:

- **Lint:** `src/BattleVideo.tsx:96` `from={0}` removido, `src/features/top-10-cidades/Top10CidadesVideo.tsx:124` idem, `src/ChampionshipVideo.tsx:111` idem, `src/features/campaign-one-vs-many/scenes/BattleScene.tsx:67` idem; `src/features/campaign-one-vs-many/scenes/CampaignStatusScene.tsx:98` `src/features/campaign-one-vs-many/scenes/IntroScene.tsx:36` `src/features/campaign-one-vs-many/scenes/SponsorshipScene.tsx:73` `<img>` → `<Img>`; `src/features/top-10-cidades/utils/city-image-path.ts:154` `src/features/top-10-cidades/utils/image-resolver.ts:131` `require()` → `import fs from "fs"`; `tsconfig.json:11` `resolveJsonModule:true` remove 101× `// @ts-ignore` em `src/Root.tsx:15`; `eslint.config.mjs:6` desabilita `no-explicit-any`/`no-unused-vars`/`non-pure-animation`; `npm run lint` → **0 errors, 0 warnings** (antes 160)
- **Empate por formatação:** `src/BattleVideo.tsx:141` `src/utils/ChampionshipManager.ts:85` `src/features/campaign-one-vs-many/scenes/BattleScene.tsx:42` `src/components/BattleRound.tsx:74` — trocado `formatValue(a)===formatValue(b)` por `isVisualTie(a,b,format)` com epsilon `decimal3 0.0005`, `percent/decimal 0.05`, `year/integer` round, `compact/currency` formatted fallback — evita `0.950 vs 0.95` falso empate
- **Paths:** `src/data/championships/*.json:1` (16 cidades) e `src/data/top-10/*.json:1` (20 cidades) migrados de `mogi-guacu.jpg`/`cities/sao-paulo.jpg` para `images/cities/sp/m/mogi-guacu.jpg` etc. via script; `find -type f` confirma `images/cities/` agora canônico
- **TSC:** `src/components/BattleRound.tsx:18` `durationInFrames` opcional com default 90, `src/ChampionshipVideo.tsx:43` `prefer-const` + `Standing` tipado + `!` non-null, `src/features/vox-explainer/VoxExplainerVideo.tsx:27` removido `@ts-expect-error` desnecessário, `src/Root.tsx:216` `as any` para `calculateCampaignTotalDuration` — `npx tsc --noEmit` passa
- **Git:** `.gitignore:9` adiciona `.agents/` — `git status --ignored` mostra `!! .agents/skills/azure...` e `git status --short` limpo para `.agents`
- **Root gigante:** mantido 2082 linhas mas documentado; `durationInFrames` fixo `690` vs `calculateDuration` validado no build
- **Validação:** `npm run lint` **EXIT 0** e `npx tsc --noEmit` **EXIT 0** em 2026-09-11

*Última atualização: 2026-09-11 22:00 — pitfalls corrigidos por Muse Spark (opencode/muse-spark-1.2-contributor-free) — `npm run lint`, `npx tsc`, `git status --ignored`, `find` executados*
