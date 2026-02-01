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

### 3. Registrar Composição

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
```

Para informações sobre composições, consulte [`compositions.md`](.agent/skills/remotion-best-practices/rules/compositions.md) e [`calculate-metadata.md`](.agent/skills/remotion-best-practices/rules/calculate-metadata.md).

### 4. Renderizar Vídeo

```bash
# Vertical (social media)
npm run build:video Top10CidadesMaisRicas

# Horizontal (YouTube)
npm run build:video:youtube Top10CidadesMaisRicas
```

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

- Trilha sonora de fundo
- Efeitos sonoros para transições
- Narração opcional

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
