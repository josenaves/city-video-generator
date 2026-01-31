---
name: top-10-cidades
description: Gera vídeos de ranking "Top 10 Cidades" para qualquer tema ou métrica
---

# Skill: Top 10 Cidades

## Descrição

Esta skill permite criar vídeos de ranking "As 10 cidades mais XXXX" para qualquer tema ou métrica específica, usando dados locais das cidades com imagens.

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
    "image": "sao-paulo.jpg"
  }
}
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

## Estrutura do Vídeo

### Formato Vertical (Social Media)

1. **Intro (3s)**: Título animado com música impactante
2. **Ranking #10-#4 (21s)**: Apresentação rápida (3s cada)
3. **Top 3 Destaque (12s)**: Animação especial para top 3 (4s cada)
4. **#1 Campeã (4s)**: Animação triunfal para primeira colocada
5. **Outro (2s)**: Chamada para ação e inscrição

### Formato Horizontal (YouTube)

1. **Intro (5s)**: Título e introdução do tema
2. **#10-#8 (12s)**: Apresentação detalhada (4s cada)
3. **#7-#4 (16s)**: Análise comparativa (4s cada)
4. **Top 3 Podium (18s)**: Destaque especial para top 3
5. **#1 Destaque (8s)**: Análise profunda da vencedora
6. **Conclusão (6s)**: Resumo e insights

## Uso

### 1. Preparar Dados

Crie arquivo JSON com dados das 10 cidades:

```bash
# Exemplo para cidades mais ricas
src/data/top-10/cidades-mais-ricas.json
```

### 2. Adicionar Imagens

Coloque imagens das cidades em:

```bash
public/cities/nome-da-cidade.jpg
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

### 4. Renderizar Vídeo

```bash
# Vertical (social media)
npm run build:video Top10CidadesMaisRicas

# Horizontal (YouTube)
npm run build:video:youtube Top10CidadesMaisRicas
```

## Personalização

### Temas Visuais

- `elegant-dark`: Fundo escuro com cores vibrantes
- `clean-modern`: Fundo claro com design minimalista
- `gradient-burst`: Gradientes coloridos e energéticos
- `data-focused`: Visual limpo focado nos dados

### Animações

- Transições suaves entre posições
- Efeitos de podium para top 3
- Confete para primeira colocada
- Chart animations para dados

### Áudio

- Música épica para introdução
- Sound effects para transições
- Narration overlay opcional
- Sound design específico por tema

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

## Requisitos Técnicos

### Dependências

- React + Remotion framework
- TypeScript para type safety
- Tailwind CSS para estilização
- Chart.js ou similar para visualizações

### Performance

- Suporta até 60fps para animações suaves
- Lazy loading de imagens grandes
- Progressive enhancement para diferentes dispositivos
- Otimização automática para exportação

Esta skill oferece uma solução completa e flexível para criar conteúdo de ranking de cidades em formato de vídeo profissional.
