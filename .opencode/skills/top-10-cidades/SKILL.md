---
name: top-10-cidades
description: Gera vídeos de ranking "Top 10 Cidades" para qualquer tema ou métrica
---

# Skill: Top 10 Cidades

## Descrição

Esta skill permite criar vídeos de ranking "As 10 cidades mais XXXX" para qualquer tema ou métrica específica, usando dados locais das cidades com imagens.

## Integração com Remotion Best Practices

⚠️ **Importante**: Antes de trabalhar com esta skill, consulte as regras oficiais do Remotion em `.agent/skills/remotion-best-practices/rules/`:

### Regras Relevantes para Top 10 Cidades

| Regra                                                                                        | Aplicação                               |
| -------------------------------------------------------------------------------------------- | --------------------------------------- |
| [`animations.md`](.agent/skills/remotion-best-practices/rules/animations.md)                 | Animações de entrada/saída dos rankings |
| [`text-animations.md`](.agent/skills/remotion-best-practices/rules/text-animations.md)       | Animações de títulos e textos           |
| [`timing.md`](.agent/skills/remotion-best-practices/rules/timing.md)                         | Curvas de interpolação e timing         |
| [`transitions.md`](.agent/skills/remotion-best-practices/rules/transitions.md)               | Transições entre cenas                  |
| [`images.md`](.agent/skills/remotion-best-practices/rules/images.md)                         | Carregamento de imagens de cidades      |
| [`audio.md`](.agent/skills/remotion-best-practices/rules/audio.md)                           | Trilha sonora e batidas (BPM)           |
| [`charts.md`](.agent/skills/remotion-best-practices/rules/charts.md)                         | Visualização de dados estatísticos      |
| [`tailwind.md`](.agent/skills/remotion-best-practices/rules/tailwind.md)                     | Estilização com TailwindCSS             |
| [`compositions.md`](.agent/skills/remotion-best-practices/rules/compositions.md)             | Registro de composições                 |
| [`calculate-metadata.md`](.agent/skills/remotion-best-practices/rules/calculate-metadata.md) | Cálculo de duração baseado em BPM       |
| [`sequencing.md`](.agent/skills/remotion-best-practices/rules/sequencing.md)                 | Sequenciamento sincronizado (Beats)     |

## Funcionalidades

### 🎥 Formatos de Vídeo Suportados

- **Vertical (1080x1920)**: Para Reels, TikTok, Shorts
- **Horizontal (1920x1080)**: Para YouTube

### 📊 Tipos de Ranking Disponíveis

- **Econômicos**: Mais ricas (PIB per capita), mais pobres
- **Demográficos**: Mais populosas, menos populosas
- **Sociais**: Melhor IDH, pior IDH
- **Segurança**: Mais violentas, mais seguras
- **Turismo**: Mais visitadas, menos visitadas
- **Infraestrutura**: Melhor qualidade de vida, pior qualidade de vida
- **Custom**: Qualquer métrica numérica ordenável

### 🏙️ Estrutura de Dados

Cada cidade deve conter:

```json
{
  "name": "São Paulo",
  "state": "SP",
  "nickname": "Terra da Garoa",
  "data": {
    "population": 12325000,
    "areaKm2": 1521,
    "gdpPerCapita": 45000,
    "idh": 0.805,
    "violentCrimeRate": 12.3,
    "touristVisits": 15000000
  },
  "visual": {
    "primaryColor": "#FF0000",
    "secondaryColor": "#FFFFFF",
    "image": "images/cities/sp/s/sao-paulo.jpg"
  }
}
```

### Imagens de Cidades

As imagens devem seguir a estrutura unificada em `public/images/cities/{estado}/{letra}/{cidade}.jpg`.

Consulte [`images.md`](.agent/skills/remotion-best-practices/rules/images.md) para boas práticas de carregamento de imagens.

### 🖼️ Serviço de Assets (cidades-brasileiras-data) — FONTE CANÔNICA DE HERO IMAGES

**NUNCA use Wikimedia/Wikipedia direto.** As hero images vêm do serviço local
`cidades-brasileiras-data` (`bun run src/api/server.ts` em
`/home/josenaves/Projects/cidades-brasileiras-data`), já curadas e com licença
`public domain`. Guia completo em `docs/mcp-cli-integration-guide.md` do outro repo.

> **Porta: `4000`** (desde 2026-09-14; antes era `3000`). Não confundir com o
> Remotion Studio (`npm run dev`), que usa a `3000`. Se `localhost:4000` não
> responder, o serviço está fora do ar — avisar o usuário em vez de voltar
> para Wikimedia.

| Via | Como | Quando usar |
|-----|------|-------------|
| **REST** (preferida) | `GET http://localhost:4000/v1/cities/:uf/:slug/media?type=hero` | Consultar hero + metadados (path, checksum, licença) via `curl` |
| **REST** dados | `GET http://localhost:4000/v1/cities/:uf/:slug` | Nome, população, fundação, mesorregião p/ preencher o JSON |
| **CLI** | `bun run src/import/asset-manager.ts add:hero --city=UF/slug --file=...` (rodar no outro repo) | Cadastrar nova hero quando a cidade não tiver (`"count":0`) |
| **MCP** | Servidor `cidades-brasileiras-data` já registrado em `opencode.json` → tools `get_city_media`, `get_city` (heroes, dados, feriados) | Preferir ao REST quando as tools MCP estiverem disponíveis na sessão |

- **Sem token/API key**: endpoints GET são somente-leitura e não exigem auth.
- Arquivos físicos ficam em `data/media/cities/{uf}/{letra}/{slug}/hero.{webp|jpeg}`
  **no outro repo** — copiar para `public/images/cities/{uf}/{letra}/{slug}.{ext}`
  **neste repo** e referenciar esse caminho no JSON (via `staticFile()`).
- Verificar a imagem com `file <hero>` antes de copiar (deve ser landscape real,
  não thumbnail; ignorar campos `width/height` absurdos no metadato JSON).

Exemplo (hero + dados de Sarandi/PR via REST):

```bash
curl -s "http://localhost:4000/v1/cities/PR/sarandi/media?type=hero"
curl -s "http://localhost:4000/v1/cities/PR/sarandi"
cp /home/josenaves/Projects/cidades-brasileiras-data/data/media/cities/pr/s/sarandi/hero.jpeg \
   public/images/cities/pr/s/sarandi.jpeg
```

## Configuração do Vídeo

### Schema do Arquivo JSON

```json
{
  "videoId": "top-10-cidades-mais-ricas-2024",
  "title": "As 10 CIDADES MAIS RICAS do Brasil",
  "subtitle": "PIB per capita - Ranking 2024",
  "theme": "elegant-dark",
  "format": "vertical",
  "metric": {
    "field": "gdpPerCapita",
    "title": "PIB per capita",
    "unit": "R$",
    "format": "currency",
    "order": "desc"
  },
  "cities": [...]
}
```

### Métricas Suportadas

- `population`: População total
- `areaKm2`: Área em km²
- `gdpPerCapita`: PIB per capita
- `idh`: Índice de Desenvolvimento Humano
- `violentCrimeRate`: Taxa de criminalidade violenta
- `touristVisits`: Visitas turísticas anuais
- **Custom**: Qualquer campo numérico adicionado em `data`

### Formatos de Exibição

- `compact`: Números abreviados (1M, 500k)
- `currency`: Moeda localizada (R$ 50.000)
- `number`: Inteiro padrão (1.234.567)
- `decimal`: 1 casa decimal (12,3)
- `percent`: Percentagem (75,5%)

## 🥁 Sincronização por BPM (Mandatório)

Para garantir um fluxo profissional e rítmico, **todas as transições de cena devem obrigatoriamente ser sincronizadas com as batidas por minuto (BPM) da trilha sonora.**

### Fórmulas de Sincronia
- **Beats to Frames**: `Math.round((beats * 60 * fps) / bpm)`
- **Padrão**: Usar múltiplos de 4 beats (1 compasso) ou 2 beats para cortes rápidos.

### 🎥 Estrutura do Vídeo Sugerida (Ex: 128 BPM)


#### Formato Vertical (Social Media - High Energy)
- **Visual Impact**: Layout **Split-Screen**. A metade superior (50%) é dedicada à imagem da cidade (formato quadrado ou quase quadrado), garantindo destaque visual claro. A metade inferior (50%) contém a tipografia e métricas.
1.  **Intro**: 6 beats (~2.8s) - Gancho visual rápido.
2.  **Ranking #10-#4**: 3 beats cada (~1.4s) - Ritmo frenético para retenção.
3.  **Top 2 Battle (#3, #2)**: 4 beats cada (~1.8s) - Pausa dramática.
4.  **#1 Campeã**: 8 beats (~3.7s) - Momento de glória com animação.
5.  **Outro**: 8 beats (~3.7s) - CTA claro.

#### Formato Horizontal (YouTube - Cinematic)
1.  **Intro**: 16 beats (~7.5s) - Introdução do tema.
2.  **#10-#4**: 12 beats cada (~5.6s) - Tempo para leitura de estatísticas.
3.  **Top 3 Podium**: 16 beats cada (~7.5s) - Destaque cinematográfico.
4.  **#1 Campeã**: 16 beats (~7.5s) - Destaque profundo.
5.  **Conclusão**: 12 beats (~5.6s) - Encerramento.
## Uso

### 1. Preparar Dados

Crie arquivo JSON com dados das 10 cidades:

```bash
# Exemplo para cidades mais ricas
src/data/top-10/cidades-mais-ricas.json
```

### 2. Adicionar Imagens

Imagens devem ser salvas em:

```bash
public/images/cities/{estado}/{letra}/{cidade}.jpg
```

Exemplo:

```bash
public/images/cities/sp/s/sao-paulo.jpg
public/images/cities/mg/b/belo-horizonte.jpg
```

### 3. Gerar Narração da Intro (REGRA: somente horizontal)

Gere a locução de abertura com a mesma voz das cidades (`pt-BR-AntonioNeural`):

```bash
edge-tts --voice pt-BR-AntonioNeural --text "Canal Cidades Brasileiras apresenta... As 10 cidades mais XXXX de YYYY!" --write-media public/audio/intro/<slug>.mp3
```

⚠️ **REGRA (vale p/ todos os vídeos):** a narração de intro vai **somente** na composição horizontal, via prop `introAudio`. Versões verticais NUNCA levam `introAudio` — a intro vertical tem 4 beats (~1,7s) e não comporta narração; só a horizontal (intro 16 beats, ~7s) comporta.

### 4. Gerar Narrações das Cidades (OBRIGATÓRIO)

Cada cidade do ranking tem locução do próprio nome (mesma voz `pt-BR-AntonioNeural`),
tocada em `Top10RankingScene` durante a exibição da cidade:

```bash
mkdir -p public/audio/cities/<uf-minusculo>
edge-tts --voice pt-BR-AntonioNeural --text "<Nome da Cidade>" --write-media public/audio/cities/<uf-minusculo>/<slug>.mp3
```

- **Regra do slug** (idêntica ao `citySlug` em `Top10RankingScene.tsx:80`): remover
  acentos, minúsculas, tudo que não for `[a-z0-9]` vira `-`. Ex: `São José dos Pinhais` → `sao-jose-dos-pinhais`.
- **Habilitar a UF**: `Top10RankingScene.tsx:97` só toca o áudio p/ UFs listadas na
  condição — adicionar o estado (ex: `|| cidade.state === "PR"`).
- ⚠️ **Efeito colateral**: habilitar a UF afeta TODOS os vídeos Top10 dela. Verificar
  se as cidades dos outros JSONs da UF têm mp3 e gerar os faltantes, senão o render
  quebra por áudio inexistente. Conferir com:

```bash
python3 -c "
import json, glob, unicodedata, os, re
def slug(n):
    n = unicodedata.normalize('NFD', n)
    n = ''.join(c for c in n if unicodedata.category(c) != 'Mn')
    return re.sub(r'^-|\-$', '', re.sub(r'[^a-z0-9]+', '-', n.lower()))
have = set(os.listdir('public/audio/cities/<uf-minusculo>'))
print([c['name'] for f in glob.glob('src/data/top-10/*.json') for c in json.load(open(f)).get('cities', []) if c.get('state')=='<UF>' and slug(c['name'])+'.mp3' not in have])
"
```

### 5. Registrar Composição

Adicione em `src/Root.tsx`:

```tsx
import top10Data from "./data/top-10/cidades-mais-ricas.json";

<Composition
  id="Top10CidadesMaisRicas"
  component={Top10CidadesVideo}
  durationInFrames={calculateTop10Duration(top10Data)}
  fps={30}
  width={1080}
  height={1920}
  defaultProps={{
    videoData: top10Data,
  }}
/>;

// Horizontal (YouTube) — ÚNICA que leva introAudio
<Composition
  id="Top10CidadesMaisRicasHorizontal"
  component={Top10CidadesVideo}
  durationInFrames={calculateTop10Duration("horizontal")}
  fps={30}
  width={1920}
  height={1080}
  defaultProps={{
    videoData: { ...top10Data, format: "horizontal" },
    introAudio: "audio/intro/<slug>.mp3",
  }}
/>;
```

Para informações sobre composições, consulte [`compositions.md`](.agent/skills/remotion-best-practices/rules/compositions.md) e [`calculate-metadata.md`](.agent/skills/remotion-best-practices/rules/calculate-metadata.md).

### 6. Renderizar Vídeo

```bash
# Vertical (social media)
npm run build:video Top10CidadesMaisRicas

# Horizontal (YouTube)
npm run build:video:youtube Top10CidadesMaisRicas
```

> ⚠️ **NÃO renderize automaticamente.** O usuário prefere subir o Remotion Studio
> (`npm run dev`) e conferir o vídeo lá antes de qualquer render.

### 7. Gerar SEO (OBRIGATÓRIO)

Todo vídeo Top10 sai com o arquivo de SEO. Carregar a skill `youtube_seo_top10`
(variante viral — template do vídeo mais acessado, SEM ⚔️) e salvar em
`src/seo/[videoId].seo.md` (ex: `src/seo/top-10-cidades-mais-feias-parana-2026.seo.md`),
espelhando o `.seo.md` mais parecido com o tema (ex: Feias SP p/ Feias PR).

## Implementação Técnica

### Estrutura de Componentes

```
src/features/top-10-cidades/
├── Top10CidadesVideo.tsx    # Componente principal
├── types.ts                  # TypeScript interfaces
├── utils/
│   ├── index.ts             # Funções utilitárias
│   ├── city-image-path.ts   # Resolução de caminhos de imagens
│   └── real-data-generator.ts # Integração com IBGE
└── scenes/
    ├── Top10IntroScene.tsx      # Cena de introdução
    ├── Top10RankingScene.tsx    # Apresentação do ranking
    └── Top10OutroScene.tsx      # Encerramento
```

### Animações e Timing

Para animações suaves e rítmicas:

- **beatsToFrames()**: Deve ser a função central para definir a duração de qualquer sequência.
- **spring()**: Sincronize o `stiffness` e `damping` para que o pico da animação coincida com o beat.
- **interpolate()**: Use para efeitos de pulsão baseados no beat atual.

Consulte [`animations.md`](.agent/skills/remotion-best-practices/rules/animations.md) e [`timing.md`](.agent/skills/remotion-best-practices/rules/timing.md).

### Sequenciamento de Cenas

O sequenciamento deve ser acumulativo, somando os frames calculados por beats.

```tsx
const introFrames = beatsToFrames(8, bpm, fps);
const scene1Frames = beatsToFrames(4, bpm, fps);

// Sequenciamento
<Sequence from={0} durationInFrames={introFrames}>...</Sequence>
<Sequence from={introFrames} durationInFrames={scene1Frames}>...</Sequence>
```
### Áudio

O componente suporta:

- Trilha sonora de fundo (com ducking automático p/ 0,25 durante narrações)
- Efeitos sonoros para transições
- Narração das cidades (`audio/cities/{uf}/{slug}.mp3`, voz `pt-BR-AntonioNeural`)
- Narração de intro ("Canal Cidades Brasileiras apresenta...") — SOMENTE na horizontal, via prop `introAudio`; nunca na vertical (ver passo 3)

Consulte [`audio.md`](.agent/skills/remotion-best-practices/rules/audio.md).

## Personalização

### Temas Visuais

- `elegant-dark`: Fundo escuro com cores vibrantes
- `clean-modern`: Fundo claro com design minimalista
- `gradient-burst`: Gradientes coloridos e energéticos
- `data-focused`: Visual limpo focado nos dados

A estilização usa TailwindCSS. Consulte [`tailwind.md`](.agent/skills/remotion-best-practices/rules/tailwind.md).

### Animações

- Transições suaves entre posições
- Efeitos de podium para top 3
- Confete para primeira colocada
- Chart animations para dados

## Casos de Uso

### Exemplos de Vídeos

1. **"As 10 cidades mais ricas do Brasil"** - PIB per capita
2. **"As 10 cidades mais populosas"** - População total
3. **"As 10 cidades mais seguras"** - Taxa de criminalidade (inverso)
4. **"As 10 cidades com melhor IDH"** - Índice de Desenvolvimento Humano
5. **"As 10 cidades mais turísticas"** - Visitas anuais
6. **"As 10 capitais com melhor qualidade de vida"** - Métrica composta

### Extensões Futuras

- Rankings regionais (estado, região)
- Comparações históricas (crescimento)
- Rankings por categoria (industriais, litorâneas)
- Análises de tendências

## Integração com AI Agent

A skill pode ser acionada via AI Agent com prompts como:

- "Crie um vídeo das 10 cidades mais populosas do Brasil"
- "Gere ranking das 10 cidades com maior PIB per capita"
- "Faça vídeo top 10 cidades mais seguras de São Paulo"
- "Mostre as 10 cidades turísticas do Nordeste"

## Referências Adicionais

- **Documentação Remotion**: https://www.remotion.dev/docs
- **Regras Oficiais**: `.agent/skills/remotion-best-practices/rules/`
- **Source Code**: `src/features/top-10-cidades/`

Esta skill oferece uma solução completa e flexível para criar conteúdo de ranking de cidades em formato de vídeo profissional, seguindo as melhores práticas do ecossistema Remotion.
