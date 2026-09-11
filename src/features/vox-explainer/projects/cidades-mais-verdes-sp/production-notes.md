# Production Notes — VoxExplainer: Cidades Mais Verdes de SP

> Blueprint para implementar `storyboard.xml` em Remotion. Leia `STEERING.md` + `REMOTION_QUICK_REFERENCE.md` antes.

## 1. Resumo

- **Vídeo:** `Por que essas 3 cidades do interior de SP têm mais árvores que a capital?`
- **Formato:** `1920x1080` horizontal YouTube, `30fps`, `3m45s = 6750f` (compactado de 7m10s para casar com TTS real 151.5s)
- **Estilo:** editorial documentary Vox — fundo `#0A0A0A`, amarelo `#FFF200`, verde `#2D7D46`, tipografia Inter/IBM Plex Sans, animações suaves `spring damping:200`
- **Projeto:** `src/features/vox-explainer/projects/cidades-mais-verdes-sp/`
- **Orquestrador:** `src/features/vox-explainer/VoxExplainerVideo.tsx:1`
- **Áudio:** `public/audio/vox-cidades-verdes-ptbr.mp3` (151.5s) + `captions.vtt` — usado como guia, holds visuais preenchem até 225s

## 2. Timeline (soma das cenas = 6750f = 3m45s)

| # | id | duração | frames | componente sugerido | VTT narração |
|---|---|---|---|---|---|
| 01 | `01_abertura_sp_concreto` | 12s | 360 | `ImageScene` + `TextReveal` | 0-7.6s |
| 02 | `02_curiosidade_interior` | 18s | 540 | `ImageScene` + `AnimatedMap` | 7.6-23s |
| 03 | `03_ranking_barras` | 21s | 630 | `BarChart` + `BigNumber` | 23-43s |
| 04 | `04_mapa_tres_cidades` | 20s | 600 | `AnimatedMap` + `CityLabel` | 43-56s |
| 05 | `05_porque_planejamento` | 21s | 630 | `ImageScene` grid + `TextReveal` | 56-75s |
| 06 | `06_timeline_crescimento` | 18s | 540 | `Timeline` | 75-92s |
| 07 | `07_impacto_sombra_calor` | 20s | 600 | `ImageScene` + overlay | 92-110s |
| 08 | `08_split_rua_comparacao` | 16s | 480 | `SplitComparison` | 110-125s |
| 09 | `09_impacto_chuva` | 15s | 450 | `Icon` animado | 125-136s |
| 10 | `10_e_a_capital` | 21s | 630 | `AnimatedMap` heatmap | 136-157s |
| 11 | `11_conclusao_planejamento` | 20s | 600 | `ImageScene` 3-up | 157-179s |
| 12 | `12_pergunta_final` | 14s | 420 | `TextReveal` | 179-192s |
| 13 | `13_cta_comentarios` | 9s | 270 | `TextReveal` | 192-151s + tail |
| **Total** | | **3m45s** | **6750** | | **151.5s áudio + 73.5s holds** |

Cálculo: `durationToFrames("32s") = 32*30 = 960` — ver `src/features/vox-explainer/utils/timing.ts:1`.

## 3. Como implementar em Remotion

### 3.1 Criar composição em `src/Root.tsx:1`

```tsx
import { VoxExplainerVideo } from "./features/vox-explainer/VoxExplainerVideo";
import { VOX_CIDADES_VERDES_TOTAL_FRAMES } from "./features/vox-explainer/utils/timing";

<Composition
  id="VoxCidadesMaisVerdesSP"
  component={VoxExplainerVideo}
  durationInFrames={6750} // ou VOX_CIDADES_VERDES_TOTAL_FRAMES = 6750 (3m45s compactado)
  fps={30}
  width={1920}
  height={1080}
  defaultProps={{ project: "cidades-mais-verdes-sp", audioSrc: "audio/vox-cidades-verdes-ptbr.mp3" }}
/>
```

### 3.2 Sequenciamento (não use BPM 128)

Diferente de `BattleVideo.tsx:19` (`calculateFramesPerBeat`) e `ChampionshipVideo.tsx:19`, **VoxExplainer usa duração explícita** por cena:

```tsx
import { Sequence, AbsoluteFill, Audio, staticFile } from "remotion";
import { durationToFrames } from "./utils/timing";

const scenes = [
  { from: 0, duration: durationToFrames("18s"), Comp: Scene01 },
  { from: 540, duration: durationToFrames("28s"), Comp: Scene02 },
  // ... somar cursor
];

<AbsoluteFill style={{background:"#0A0A0A"}}>
  <Audio src={staticFile("audio/vox-cidades-verdes-ptbr.mp3")} volume={0.9} />
  {scenes.map(s => <Sequence key={s.id} from={s.from} durationInFrames={s.duration}><s.Comp /></Sequence>)}
</AbsoluteFill>
```

### 3.3 Animações — regras críticas (`STEERING.md:11`)

- Só `useCurrentFrame()` + `interpolate`/`spring`; **nunca** CSS transitions ou `animate-*`.
- Dentro de `<Sequence>`, `useCurrentFrame()` é local (0-based).
- `spring({frame, fps, config:{damping:200}})` para Vox (suave). Não use `damping:15` snappy de Battle.
- `interpolate(frame, [0, duration], [0, 1], {extrapolateRight:"clamp"})` sempre com clamp.

Exemplo (BarChart `src/features/vox-explainer/components/BarChart.tsx:1`):
```tsx
const progress = spring({ frame: frame - delay, fps, config: {damping:200} });
const width = interpolate(progress, [0,1], [0, (value/max)*100]);
```

### 3.4 Assets — sempre `staticFile()`

```
public/images/cities/sp/b/birigui.jpg        // já existe? verificar CITY-IMAGES-STRUCTURE.md
public/images/vox/cidades-verdes/*.jpg       // novos assets do asset-manifest.json
public/audio/vox-cidades-verdes-ptbr.mp3     // TTS gerado de narration.ssml
```
Uso: `<Img src={staticFile("images/vox/cidades-verdes/rua_sombra_densa.jpg")} />`

### 3.5 TTS / SSML

- Entrada: `narration.ssml` (13 blocos `<p>` com `<break time="300ms|500ms"/>` e `<emphasis>`).
- Gerar: `npx tts --ssml src/features/vox-explainer/projects/cidades-mais-verdes-sp/narration.ssml --voice pt-BR-Wavenet-A --out public/audio/vox-cidades-verdes-ptbr.mp3`
- Alternativas locais: `edge-tts --voice pt-BR-ThalitaNeural --file narration.ssml`
- Dica Vox: `rate="slow"` não usado aqui — mantivemos ritmo conversacional; adicionar `<prosody rate="95%">` só se TTS soar apressado.

### 3.6 Mapas e Gráficos

- **Mapas:** SVG flat gerado (não Mapbox satélite). Animar zoom com `interpolate(frame, [0, duration], [1, 1.08])` + `transform: scale()`. Ver `components/AnimatedMap.tsx:1`.
- **Gráfico 03:** `BarChart` já implementado — 3 itens, `unit="%"`, stagger 8f, amarelo #FFF200 para Birigui.
- **Timeline 06:** desenhar linha com `width: interpolate(frame, [0,600], [0,100])%`, círculos com `spring`.
- **Split 08:** `SplitComparison.tsx:1` — divisor #FFF200, sem números de temperatura inventados.

## 4. Checklist de fontes (rodapé obrigatório)

Em cenas 03, 04, 10, 13 incluir rodapé 14px #888:

> Fonte: IBGE — Censo 2022, Características Urbanísticas do Entorno dos Domicílios (divulgado 17/04/2025)

Ver `sources.json:1` para URLs. Para afirmações marcadas `NEEDS_VERIFICATION` (causa do planejamento, redução de temperatura em °C, heatmap capital), manter linguagem genérica/ilustrativa sem número.

## 5. O que NÃO fazer

- Não inventar percentuais — só 98.4/97.5/97.3 com fonte IBGE.
- Não quantificar impacto térmico com °C sem citar estudo (ex: Cuiabá 15°C é de outro clima).
- Não usar mapa detalhado por bairro de SP sem extrair SIDRA por setor censitário.
- Não lotar tela — máximo 1 gráfico OU 1 mapa OU 1 imagem por cena + 1 frase curta.

## 6. Próximos passos para render

```bash
# 1. Gerar TTS
edge-tts --voice pt-BR-ThalitaNeural --file src/features/vox-explainer/projects/cidades-mais-verdes-sp/narration.ssml --write-media public/audio/vox-cidades-verdes-ptbr.mp3

# 2. Baixar/gerar imagens do asset-manifest.json (30 assets, 8 com prompt IA)
#    Colocar em public/images/vox/cidades-verdes/

# 3. Preview
npm run dev # → VoxCidadesMaisVerdesSP

# 4. Render
npx remotion render VoxCidadesMaisVerdesSP out/vox-cidades-mais-verdes-sp.mp4 --codec h264 --crf 18
```

## 7. Reuso

Componentes `AnimatedMap`, `BarChart`, `BigNumber`, `SplitComparison`, `Timeline`, `TextReveal` são genéricos — reutilizar para próximo VoxExplainer mudando só `storyboard.xml` + `asset-manifest.json`.
