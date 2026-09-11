---
name: vox_explainer
description: Cria vídeos documentais no estilo Vox (explainer editorial) — 6 a 8 min, horizontal YouTube, com mapas, gráficos, números grandes e animações suaves
---

# Skill: VoxExplainer — Documentário Editorial (Vox Style)

## Descrição

Gera vídeos documentais horizontais (`1920x1080`, 6–8 min) inspirados em Vox: narrativa clara, curiosidade, mapas com zoom, gráficos animados, números grandes, comparações visuais `rua sem árvores × rua arborizada`, ritmo dinâmico mas contemplativo.

Diferente do motor Battle (`src/BattleVideo.tsx:1`, Sugar Rush 23s) ou Top10 (`src/features/top-10-cidades/`), o VoxExplainer é **long-form, essay-style**: cenas de 20–40s, `getDynamicTiming(isLong=true)` com `longBeats [10,6,12,8,10,6,14,8,10,12]`, áudio guiado por narração TTS, não por BPM 128.

## Quando usar

- Vídeo horizontal YouTube >3 min que precisa explicar *por que* algo aconteceu
- Tema que exige mapa + chart + comparação + linha do tempo
- Prompt único que vira blueprint completo (storyboard → assets → TTS → Remotion)

## Estrutura de saída (5 arquivos obrigatórios)

Cada projeto VoxExplainer gera em `src/features/vox-explainer/projects/{slug}/`:

1. `storyboard.xml` — blueprint cena-a-cena (voice SSML + visual + animation + onscreen + assets + transition + chart + map)
2. `asset-manifest.json` — lista flat de todos os assets com `id, type, description, filename, source, ai_generated`
3. `narration.ssml` — narração completa isolada, pronta para TTS `pt-BR`
4. `sources.json` — fontes IBGE/estudos com URL + afirmação suportada; `NEEDS_VERIFICATION` se não confirmado
5. `production-notes.md` — instruções para implementar em Remotion com componentes reutilizáveis

## Componentes Remotion reutilizáveis

```
src/features/vox-explainer/
├── VoxExplainerVideo.tsx       # Orquestrador principal (timeline = soma das cenas)
├── types.ts                   # Tipos: Scene, Voice, Visual, Chart, Map
├── components/
│   ├── AnimatedMap.tsx        # Mapa flat com zoom + highlight de cidade
│   ├── BarChart.tsx           # Barras horizontais animadas (ex: Birigui 98.4%)
│   ├── BigNumber.tsx          # Número grande com count-up + spring
│   ├── CityLabel.tsx          # Label de cidade com cor/acento
│   ├── SplitComparison.tsx    # Comparação lado-a-lado (rua sem × com árvores)
│   ├── Timeline.tsx           # Linha do tempo plantio → cidade arborizada
│   ├── ImageScene.tsx         # Imagem real com parallax/ken-burns
│   └── TextReveal.tsx         # Texto editorial com interpolate
├── utils/
│   ├── timing.ts              # beatsToFrames + getVoxTiming (long-form)
│   └── ssml.ts                # Helpers para <break> e <emphasis>
└── projects/{slug}/
    ├── storyboard.xml
    ├── asset-manifest.json
    ├── narration.ssml
    ├── sources.json
    └── production-notes.md
```

## Estilo Visual (editorial documentary)

**Usar:** editorial documentary, tipografia moderna (Inter / IBM Plex Sans), composição limpa, poucos elementos simultâneos, números grandes (120–180px), gráficos animados, mapas com zoom suave, cortes rápidos mas não frenéticos, movimentos de câmera suaves (`spring damping:200`), imagens reais, animações 2D simples, contraste `rua arborizada × sem árvores`.

**Evitar:** excesso de texto, efeitos chamativos, animações genéricas, cenas poluídas, estética corporativa, narração dramática.

**Paleta Vox:** fundo `#0A0A0A` / `#111111`, amarelo `#FFF200` para destaque, branco `#FFFFFF` para texto, verde `#2D7D46` para natureza.

## Estrutura narrativa canônica (6 atos)

1. **Abertura** — São Paulo concreto vs interior verde, curiosidade, mapa do estado
2. **Ranking** — gráfico de barras animado (Birigui 98.4 / Sertãozinho 97.5 / SJRio Preto 97.3) + mapa localizando as 3
3. **Por que essas cidades?** — planejamento, plantio, regras municipais, manutenção, décadas → Timeline `plantio → crescimento → manutenção → cidade arborizada`
4. **Impacto** — sombra, calor, conforto, chuva (sem inventar números) → SplitComparison
5. **E a capital?** — mapa SP desigual, mensagem "não basta quanto, importa onde"
6. **Conclusão** — planejamento + continuidade, pergunta final + CTA comentários

## Narração / SSML

Dentro de cada `<voice>`:

```xml
<voice>
  São Paulo é a cidade do concreto. <break time="400ms"/>
  Mas o interior guarda um contraste curioso. <break time="500ms"/>
  <emphasis level="strong">Birigui</emphasis> tem árvores em <emphasis level="strong">98,4%</emphasis> das ruas.
</voice>
```

Regras: frases curtas, linguagem natural, ritmo conversacional, `<break time="300ms|500ms"/>` antes de números/ideias, `<emphasis>` só em nomes/dados, nada teatral.

## Mapas e Gráficos

- **Mapas:** simplificado, zoom animado com `interpolate`, destacar 1 cidade por vez, evitar detalhe excessivo
- **Gráficos:** `type="horizontal_bar"` com `<item label value>` animado com `spring`, duração 3–4s por barra

## Integração Remotion

- **Timing:** não use BPM 128. Use duração explícita por cena (ex: `duration="32s"` = `960f @30fps`). Total 6–8 min = `10800–14400f`
- **Assets:** sempre `staticFile("images/cities/...")` para locais; `staticFile("audio/vox-*.mp3")` para narração TTS
- **Animações:** só `useCurrentFrame()` + `interpolate`/`spring`; CSS transitions proibidas (`STEERING.md:11`)
- **Registro em Root.tsx:** `<Composition id="VoxCidadesMaisVerdesSP" component={VoxExplainerVideo} durationInFrames={totalF} fps={30} width={1920} height={1080} defaultProps={{project: "cidades-mais-verdes-sp"}} />`

## Uso

```bash
# 1. Criar projeto (gera 5 arquivos)
/vox_explainer "Por que essas 3 cidades do interior de SP têm mais árvores que a capital?" --format horizontal

# 2. Gerar TTS
npm run tts -- src/features/vox-explainer/projects/cidades-mais-verdes-sp/narration.ssml --voice pt-BR-Wavenet-A --out public/audio/vox-cidades-verdes.mp3

# 3. Preview
npm run dev # → VoxCidadesMaisVerdesSP

# 4. Render
npx remotion render VoxCidadesMaisVerdesSP out/vox-cidades-verdes.mp4
```

## Referências

- `STEERING.md:4` — motores existentes
- `REMOTION_QUICK_REFERENCE.md` — animações, sequencing, assets
- `.opencode/skills/brazilian_knowledge/SKILL.md` — dados IBGE
- `CITY-IMAGES-STRUCTURE.md` — `public/images/cities/{uf}/{letra}/`
