# Legacy Inventory — cidades-brasileiras repository (snapshot 2026-09-12)

> Gerado por inspeção direta do repo. Não assumir que formatos descritos em specs externas são idênticos — abaixo estão os **schemas reais** encontrados em disco.
> Comandos de verificação usados: `ls`, `find`, `python3 -c (json.load + contagem)`.

## 0. Mapa rápido

| Path | O que é | Qtd verificada |
|---|---|---|
| `src/data/*.json` (batalhas 1v1) | `{matchId,title,theme,timing?,cities[2],rounds[]}` | 88 |
| `src/data/*.json` (campaign 1-vs-N) | `{feature,mainCity,opponentCities[],rounds[],sponsorship?,video?}` | 10 |
| `src/data/championships/*.json` | `{name,cities[4],rounds[6]}` | 4 |
| `src/data/top-10/*.json` | `{videoId,title,subtitle,theme,format,metric{...},cities[10],dataSource?}` | 15 |
| `src/data/*.json` infra | `city-images-registry.json`, `image-migration-log.json`, `pending-migration.json`, `soundtracks.json` | 4 |
| `src/features/` | 3 engines: `campaign-one-vs-many/`, `top-10-cidades/`, `vox-explainer/` | 3 |
| `public/images/cities/` | `399` arquivos, `151` dirs, **18 UFs** | 399 |
| `public/images/` raiz (legado) | `.webp/.png/.jpeg/.jpg/.avif` soltos + `background.png` | 47 |
| `public/images/vox/cidades-verdes/` | stills do piloto Vox | 21 |
| `public/audio/` | 5 trilhas + 2 vox mp3 + 1 vtt | 8 |
| `public/audio/cities/rj/` | TTS por cidade | 10 mp3 |
| `public/videos/` | **NÃO EXISTE** | — |

---

## 1. `src/data/` — batalhas 1v1 (88 arquivos)

Exemplos inspecionados: `alfenas-guaxupe.json` (padrão EN novo), `uberlandia-uberaba.json` (sem `timing`), `juruaia-guaxupe.json` (padrão PT + `timing`).

### 1.1 Schema real (união observada)

```json
{
  "matchId": "alfenas-vs-guaxupe-2025",
  "title": "Alfenas vs Guaxupé",
  "theme": "epic-battle | Lingerie vs Café | Urban Showdown | ... (string livre)",
  "timing": { "beatsPerTransition": 5 },
  "cities": [
    {
      "ibgeId": 3101607,
      "name": "Alfenas",
      "state": "MG",
      "nickname": "Cidade Universitária",
      "data": { "<field>": "number (livre)" },
      "visual": {
        "primaryColor": "#1565C0",
        "secondaryColor": "#0D47A1",
        "image": "images/cities/mg/a/alfenas.jpg"
      }
    }
  ],
  "rounds": [
    {
      "id": "population",
      "title": "POPULAÇÃO",
      "field": "population",
      "format": "compact",
      "unit": "hab",
      "type": "bar",
      "inverse": true
    }
  ]
}
```

### 1.2 Divergências reais (importante)

- `timing` é **opcional**: só **2 de 88** batalhas o têm (`juruaia-guaxupe.json` com `beatsPerTransition: 5`; outro a confirmar). O resto depende do default do player (`3` beats).
- `ibgeId`: **number na maioria EN** (`3101607`) vs **string em arquivos PT** (`"3136900"` em `juruaia-guaxupe.json`). `src/types.ts:31` declara `string`, mas os JSONs EN usam number — diverge do tipo.
- `data.*`: **dois vocabulários convivendo**:
  - EN (maioria nova): `population, areaKm2, gdpPerCapita, hospitalBedsPerThousand, idh, higherEducationPct, costOfLiving[, costOfLivingIndex, companiesCount, turismoAnual, fontesTermais, frota, fundacao, esgotamentoSanitario]`
  - PT (legado, ex-`juruaia-guaxupe.json`): `populacao, pibPerCapita, leitos, ensinoSuperior[, fundacao, esgotamentoSanitario]` + `hotéis`-like keys com acento em ao menos 1 arquivo.
- `rounds[].type` é **opcional na prática**: `241` rounds sem `type` (estilo `juruaia-guaxupe.json`: só `id/title/field/format/unit`) vs `~379` com `type: bar|pie|line|radar|column|donut`. `src/types.ts:3-10` (`BattleRoundConfig`) **nem declara `type`** — só `ChampionshipManager.Round` declara.
- `rounds[].format` observados (620 rounds totais): `number:169, decimal:143, currency:103, decimal3:80, compact:65, percent:57, percentage:1 (typo — só 1x), integer:1, year:1`. `percentage` não existe no union de `src/types.ts:1` — vai quebrar formatação se não normalizado.
- `inverse: true` usado para "menor vence" (`costOfLiving`, `fundacao`).
- `theme` é string livre, sem enum.

### 1.3 Tipos TS relacionados (divergem entre si)

- `src/types.ts:1-48`: `BattleRoundFormat = number|integer|year|currency|percent|compact|decimal3|decimal`; `City.data: CityData` (campos PT fixos + index); `City.ibgeId: string`; `BattleData.cities: [City, City]` (tupla); `timing` obrigatório.
- `src/utils/ChampionshipManager.ts:1-20`: `City` minimalista (`name, nickname?, data: Record<string,number>, visual`) — **sem `ibgeId/state`**; `Round` com `type: string` e `format: string` (soltos, sem union).

---

## 2. `src/data/` — campaign 1-vs-N (10 arquivos)

Arquivos (sem `matchId`, com `feature`): `campaign-test.json`, `caxambu-campaign.json`, `caxambu-regiao-1v10.json`, `caxambu-vs-10.json`, `caxias-do-sul-vs-10.json`, `guaxupe-regiao-1v10.json`, `jacui-vs-10.json`, `marilia-vs-10.json`, `tubarao-vs-10.json`, `varginha-campaign-test.json`.

Exemplo: `caxambu-vs-10.json`.

```json
{
  "feature": "campaign_one_vs_many",
  "mainCity": { "name": "Caxambu", "nickname": "...", "data": {...EN...}, "visual": {"primaryColor": "...", "secondaryColor": "...", "image": "caxambu.jpg"} },
  "opponentCities": [ { "name": "...", "nickname": "...", "data": {...}, "visual": {...} } ],
  "rounds": [ { "id": "...", "title": "...", "type": "bar", "unit": "hab", "field": "population", "format": "compact" } ],
  "sponsorship": { "enabled": false, "title": "Um oferecimento", "items": [{ "type": "logo", "src": "favicon.ico", "label": "City Battles 2026" }] },
  "video": { "aspectRatio": "16:9", "title": "Uma Caxambu vs 10 cidades", "soundtrack": { "src": "audio/Beat Your Competition - Vibe Tracks.mp3", "bpm": 128 } }
}
```

Divergências:

- `mainCity`/`opponentCities` **não têm `ibgeId` nem `state`** (diferente da batalha 1v1).
- `image` aqui é **legado na maioria**: `"caxambu.jpg"`, `"soledade.jpg"`, `"tres-coracoes.webp"` — basename puro, não `images/cities/...`. É o grupo que concentra os **69 refs legadas** (ver §6).
- `sponsorship` e `video` **opcionais** (`caxambu-regiao-1v10.json` não tem nenhum dos dois).
- Tipo canônico: `src/features/campaign-one-vs-many/types.ts:3-29` — `feature: "campaign_one_vs_many"`, `video.aspectRatio: "16:9"`, `soundtrack: {src, bpm, offsetBeats?}`, `sponsorship.items[].type: logo|qrcode`. **Atenção**: JSONs usam `"feature": "campaign_one_vs_many"` — já houve variação `campaign-one-vs-many` em docs; o que vale é o do JSON.
- Cenas: `scenes/IntroScene, SponsorshipScene, BattleScene, CampaignStatusScene, CampaignResultScene`; lógica em `logic/{beat,campaign-phrases,narrative,pacing,scheduler,state,utils,utils_wrapper}.ts`.

---

## 3. `src/data/championships/` (4 arquivos)

`capitais-sudeste.json` (Capitais do Sudeste), `fronteira-ms.json`, `mogi.json` (Regional da Mogiana), `oeste-paulista.json` — todos `{name, cities[4], rounds[6]}`.

Exemplo (`mogi.json`):

```json
{
  "name": "Regional da Mogiana",
  "cities": [
    {
      "ibgeId": "3530706",
      "name": "Mogi Guaçu",
      "state": "SP",
      "nickname": "Cidade do Rio Grande",
      "data": { "populacao": 152895, "areaKm2": 885, "pibPerCapita": 45218, "leitos": 285, "idh": 0.786, "ensinoSuperior": 24.3 },
      "visual": { "primaryColor": "#1565c0", "secondaryColor": "#ffffff", "image": "images/cities/sp/m/mogi-guacu.jpg" },
      "image": "images/cities/sp/m/mogi-guacu.jpg"
    }
  ],
  "rounds": [
    { "id": "populacao", "title": "POPULAÇÃO", "field": "populacao", "format": "number", "type": "bar", "unit": "hab" }
  ]
}
```

Notas:

- Vocabulário `data.*` aqui é **PT** (`populacao, pibPerCapita, leitos, ensinoSuperior`) — oposto à maioria das batalhas 1v1 (EN).
- `image` **duplicado**: em `visual.image` e na raiz da cidade. Consumidores diferentes leem um ou outro — manter os dois sincronizados.
- Sem `matchId`, sem `timing`, sem `video/sponsorship`.
- Motor: `src/ChampionshipVideo.tsx` + `src/utils/ChampionshipManager.ts` (round-robin `n*(n-1)/2`, `points/roundBalance/wins`).

---

## 4. `src/data/top-10/` (15 arquivos)

Lista verificada: `cidades-mais-pobres-minas/sp/pr/rs/santa-catarina/rj-ifdm`, `cidades-mais-populosas`, `cidades-mais-ricas-santa-catarina`, `cidades-mais-violentas-goias/mg/parana/santa-catarina/sp`, `goias-poorest-cities`, `piores-enchentes-brasil-30-anos`.

Schema (`cidades-mais-populosas.json` / `cidades-mais-violentas-sp.json`):

```json
{
  "videoId": "top-10-cidades-mais-populosas-brasil",
  "title": "As 10 CIDADES MAIS POPULOSAS do Brasil",
  "subtitle": "Ranking 2024 - População em habitantes",
  "theme": "elegant-dark",
  "format": "vertical",
  "metric": { "field": "population", "title": "População", "unit": "hab", "format": "compact", "order": "desc" },
  "dataSource": "Fonte: SSP/SP 2025 - ...",
  "cities": [
    { "name": "São Paulo", "state": "SP", "nickname": "Terra da Garoa",
      "data": { "population": 12325000, "areaKm2": 1521, "gdpPerCapita": 45000, "idh": 0.805, "violentCrimeRate": 12.3, "touristVisits": 15000000 },
      "visual": { "primaryColor": "#FF0000", "secondaryColor": "#FFFFFF", "image": "images/cities/sp/s/sao-paulo.jpg" } }
  ]
}
```

Variações de `metric` observadas:

| arquivo | format | field | order | cities |
|---|---|---|---|---|
| mais-pobres-minas | vertical | `incomePerCapita` asc | 10 | elegant-dark |
| mais-pobres-parana | horizontal | `score` asc | 10 | elegant-dark |
| mais-pobres-rj-ifdm | vertical | `ifdm` asc | 10 | elegant-dark |
| mais-pobres-rs/sc | horizontal | `gdpPerCapita` asc | 10 | elegant-dark |
| mais-pobres-sp | horizontal | `idh` asc | 10 | elegant-dark |
| mais-populosas | vertical | `population` desc | 10 | elegant-dark |
| mais-ricas-sc | vertical | `gdpPerCapita` desc | 10 | elegant-dark |
| violentas-go/mg/pr/sp | horizontal | `homicideRate` desc | 10 | elegant-dark |
| violentas-sc | horizontal | `violentCrimeRate` desc | 10 | elegant-dark |
| goias-poorest | horizontal | `gdpPerCapita` asc | 10 | elegant-dark |
| piores-enchentes | horizontal | `deaths` desc | 10 | elegant-dark |

Notas:

- Sem `ibgeId`. `nickname` pode ser `""`.
- `data.*` é aberto (`Record<string,any>` no tipo) — cada ranking usa fields próprios (`homicideRate/homicides/region`, `deaths`, `ifdm`, `score`, ...).
- `dataSource` opcional (só em alguns, ex-violentas-sp).
- Todos `theme: elegant-dark` na prática; tipo admite `elegant-dark|clean-modern|gradient-burst|data-focused` (`src/features/top-10-cidades/types.ts:4`).
- Tipo canônico: `src/features/top-10-cidades/types.ts:1-35`.
- Cenas: `scenes/Top10IntroScene, Top10RankingScene, Top10OutroScene`; utils em `utils/{city-image-path,image-resolver,real-data-generator}`.

---

## 5. `src/features/` — os 3 motores

```
src/features/campaign-one-vs-many/
  CampaignVideo.tsx, index.ts, types.ts
  logic/{beat,campaign-phrases,narrative,pacing,scheduler,state,utils,utils_wrapper}.ts
  scenes/{BattleScene,CampaignResultScene,CampaignStatusScene,IntroScene,SponsorshipScene}.tsx
src/features/top-10-cidades/
  Top10CidadesVideo.tsx, types.ts, DESIGN.md
  scenes/{Top10IntroScene,Top10OutroScene,Top10RankingScene}.tsx
  utils/{city-image-path,image-resolver,index,real-data-generator}.ts
src/features/vox-explainer/
  VoxExplainerVideo.tsx, types.ts, index.ts
  components/{AnimatedMap,BarChart,BigNumber,CityLabel,SplitComparison,TextReveal}.tsx
  utils/timing.ts
  bakeoff/Beat03Bakeoff.tsx
  projects/cidades-mais-verdes-sp/{storyboard.xml,asset-manifest.json,narration.ssml,sources.json,production-notes.md,captions.vtt}
```

Tipos:

- Campaign: `CampaignOneVsManyInput` (`feature, mainCity, opponentCities[], rounds: Round[], sponsorship?, video{aspectRatio:"16:9", soundtrack{src,bpm,offsetBeats?}}`).
- Top10: `Top10CidadesData` (`videoId,title,subtitle,theme,format,metric{field,title,unit,format:compact|currency|number|decimal|percent,order},cities: Top10Cidade[]` com `data: Record<string,any>`).
- Vox: `VoxExplainerProps {project, audioSrc?, fps?}`, `VoxSceneMeta {id,duration:"32s",durationInFrames}`, `VoxAssetRef {id,type:IMAGE|VIDEO|MAP|CHART|ICON|TEXT|AUDIO,...}`, `VoxChart/VoxMap`.

---

## 6. `public/images/` — estado real

- `public/images/cities/`: **399 arquivos / 151 dirs / 18 UFs** (`al,ba,ce,es,go,mg,ms,mt,pa,pb,pe,pr,rj,rn,rs,sc,se,sp`). Faltam no disco: `AC,AM,AP,DF,MA,PI,RO,RR,TO` — mas JSONs referenciam `am/m/manaus.jpg`, `df/b/brasilia.jpg`, `ba/s/salvador.jpg`, `ce/f/fortaleza.jpg` (ver missing abaixo).
- Padrão: `images/cities/{uf}/{letra}/{slug}.{ext}` (slug minúsculo, hifenizado). Extensões mistas: `.jpg` dominante + `.jpeg/.png/.webp/.svg/.avif`.
- Raiz `public/images/` (legado, **47 arquivos**): `antonio-joao.webp, aracatuba.png, bage.webp, cabo-verde.webp, criciuma.webp, cuiaba.jpeg, curitiba.webp, ... franca.webp, guaxupe.jpeg, ...` + `background.png`. Sobras da migração.
- Cruzamento refs-vs-disco (via `json.load` em `src/data/**/*.json`):
  - **316 image-refs únicas**; **69 legadas** (basename puro, ex `caxambu.jpg`, `soledade.jpg`, `alfenas.jpg`, `brusque.jpg`, `cabo-verde.webp`) — concentradas nos 10 JSONs de campaign.
  - **31 refs `images/cities/...` sem arquivo no disco**, ex: `images/cities/am/m/manaus.jpg`, `images/cities/am/p/parintins.jpeg`, `images/cities/ba/s/salvador.jpg`, `images/cities/ce/f/fortaleza.jpg`, `images/cities/df/b/brasilia.jpg`, `images/cities/mg/u/uberlandia-skyline.jpg`, `images/cities/mg/u/uberaba-historic.jpg`, `images/cities/mg/t/tres-coracoes.jpg`, `images/cities/mg/s/sao-sebastiao-do-paraiso.jpeg`, `images/cities/mg/r/ressaquinha.jpeg`, + ~11 do norte de MG (`cabeceira-grande, conego-marinho, dom-bosco, guaraciama, ...`). Fallback do resolver (`city-image-path.ts`/`image-resolver.ts`) mascara parte, mas render pode cair em placeholder.
- `public/images/vox/cidades-verdes/`: 21 stills (`aerial_birigui.jpg`, `aerial_birigui_real.jpg`, `aerial_sertaozinho.jpg`, `aerial_sertaozinho_real.png`, `aerial_sjrp.jpg`, `aerial_sjrp_real.jpg`, `ator_foreground.jpg`, `ator_halftone_2.jpg`, `broll_rua_generica.jpg`, `equipe_manutencao.jpg`, `evolucao_muda_adulta.jpg`, `rua_arborizada_interior.jpg`, `rua_arborizada_real.jpg`, `rua_com_arvores.jpg`, `rua_sem_arvores.jpg`, `rua_sombra_densa.jpg`, `rua_sombra_real2.jpg`, `sertaozinho_ibge.jpg`, `sertaozinho_panorama.jpg`, `sp_aerial_concreto.jpg`, `viveiro_mudas.jpg`). O `asset-manifest.json` declara **30 assets** (12 image, 5 text, 4 icon, 3 map, 2 video `.mp4`, 2 chart `.svg`, 2 audio) — ou seja, manifest ≠ disco: vídeos/charts/maps/icons/text são gerados ou stock, só os 21 `.jpg/.png` estão em `public/images/vox/`.

## 7. `public/audio/`

- Trilhas (5): `Beat Your Competition - Vibe Tracks.mp3` (default battles/campaigns/championships), `Come With Us - ...mp3`, `Everything Where it Needs to Be - ...mp3`, `Missing Persons - Jeremy Blake.mp3` (top-10), `Schizo - Anno Domini Beats.mp3`. Metadados (bpm/duração/gênero) em `src/data/soundtracks.json` — que lista só **4** (falta `Everything Where...`).
- Vox: `vox-cidades-verdes-ptbr.mp3` + `-slow.mp3` + `vox-cidades-verdes-ptbr.vtt` (narração TTS do `narration.ssml`).
- `public/audio/cities/rj/` (10 mp3): `belford-roxo, cardoso-moreira, duas-barras, japeri, nova-iguacu, queimados, sao-francisco-de-itabapoana, sao-goncalo, sao-joao-de-meriti, varre-sai` — TTS por cidade, só RJ.

## 8. `public/videos/` — não existe

`ls public/videos/` → `No such file or directory`. Renders vão para `out/` (gitignored). Nenhum mp4 versionado.

## 9. Infra: registry / logs

- `src/data/city-images-registry.json` (`version 1.0`): declara `structure.base: public/images/cities`, `organization: {estado}/{letra}/{nome-cidade}.{ext}`, `aliases: {cities, public/cities → images/cities}`, `deprecated_paths: [public/*.jpg, ...]`. Mas o campo `cities` é **amostra manual** (só SC/MG/SP/RS com 2-3 slugs cada) — não é inventário real, não confiar para contagem.
- `src/data/image-migration-log.json` (`2026-01-31`, `migrated: 45`): lista `from (basename)` → `to (images\cities\...)` com `state`. Contém erros conhecidos: `caxambu.jpg → rs\c` (Caxambu é MG), `gaviao-peixoto → pe\g` (Gavião Peixoto é SP), `joao-pessoa → pe\j` (João Pessoa é PB), `sao-jose-do-rio-preto → pr\s` (é SP), `presidente-prudente → pr\p` (é SP), `sao-pedro-da-uniao → pe\s` (é MG), separador Windows `\` — usar como histórico, não como fonte.
- `src/data/pending-migration.json` (`total: 75`, `2026-01-31`): backlog por UF com `missing[]` — também com erros de UF (ex `SP.missing` inclui `aracatuba` que é SP ok, mas também `aiuruoca/baependi/itamogi` que são MG; `SC.missing` inclui `araucaria` que é PR; `CE.missing: [estiva-gerbi]` que é SP; `UNKNOWN: [background.png, catedral.jpg]`). Útil como lista de trabalho, não como verdade geográfica.
- `src/data/soundtracks.json`: `{soundtracks[{id,title,filename,path,bpm,duration,size,genre,mood,added,recommended_for}], metadata{total_tracks:4,...}}` — desatualizado (4 vs 5 mp3 em disco).

## 10. Vox project (`cidades-mais-verdes-sp`)

`storyboard.xml` (13 cenas, `6750f @30fps = 3m45s`, `1920x1080`), `asset-manifest.json` (30 assets, 27 required), `narration.ssml` (fonte do TTS), `sources.json` (`{project,generatedAt,sources[],needsVerification,usageNotes}`), `production-notes.md`, `captions.vtt`. Timing por durações explícitas (`utils/timing.ts`), não BPM.

## 11. Riscos para migração (o que um importador deve tratar)

1. Dois vocabulários de `data.*` (EN vs PT) + keys com acento — normalizar por `rounds[].field`, não pelo nome da key.
2. `ibgeId` number-vs-string; campaign sem `ibgeId/state` — não usar como chave primária.
3. `rounds[].type` ausente em ~40% dos rounds; `format: percentage` (typo) fora do union.
4. `image` em 3 formas: `images/cities/...`, basename legado, duplicado `visual.image` + `image` (championship) — resolver com fallback `city-image-path.ts`.
5. 31 refs sem arquivo + 9 UFs sem pasta — importador deve reportar `missing`, não falhar.
6. `city-images-registry.json`, `image-migration-log.json`, `pending-migration.json`, `soundtracks.json` contêm erros/desatualizações — tratar como histórico, re-derivar do disco.
7. `public/videos/` inexistente — não esperar inputs de vídeo versionados (só `out/`, ignorado).
