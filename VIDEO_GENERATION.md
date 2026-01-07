# Documentação: Geração de Vídeos "Batalha de Cidades"

Este projeto utiliza **Remotion** para criar vídeos programáticos que comparam dados estatísticos entre duas cidades.

## Visão Geral

Os vídeos são estruturados como uma "batalha" onde duas cidades competem em diferentes categorias (população, PIB, IDH, etc.). O vídeo é renderizado a partir de um arquivo de configuração JSON que define os participantes e os dados a serem comparados.

## Estrutura do Vídeo

O vídeo é composto por três seções principais, orquestradas pelo componente `BattleVideo` (`src/BattleVideo.tsx`):

### 1. Introdução (`BattleIntro`)
*   **Duração**: 2 segundos (60 frames @ 30fps). [Otimizado para Shorts]
*   **Função**: Apresenta os nomes, nicknames e imagens das duas cidades competidoras.
*   **Componente**: `src/components/BattleIntro.tsx`

### 2. Rodadas de Comparação (`BattleRound`)
*   **Duração**: 3 segundos por rodada (90 frames @ 30fps).
*   **Função**: Exibe a comparação de um indicador específico.
*   **Quantidade Padrão**: Geralmente 6 rodadas.
*   **Componente**: `src/components/BattleRound.tsx`
*   **Indicadores Comuns**:
    *   População
    *   Área (km²)
    *   PIB per capita
    *   Leitos hospitalares (por mil hab.)
    *   IDH (Índice de Desenvolvimento Humano)
    *   Escolaridade (Ensino Superior Completo %)

### 3. Vencedor / Encerramento (`BattleWinner`)
*   **Duração**: 3 segundos (90 frames @ 30fps).
*   **Função**: Calcula automaticamente o placar final com base nos dados e exibe o vencedor (ou empate).

## Design Philosophy: "Sugar Rush" (Shorts Optimization)
O vídeo foi otimizado para retenção em plataformas de vídeo curto (YouTube Shorts, Reels, TikTok).
*   **Ritmo Acelerado**: Cortes rápidos para manter o espectador engajado.
*   **Barra de Progresso**: Uma barra visual dourada no rodapé indica o progresso da batalha.
*   **Animações "Snappy"**: Física de mola ajustada (`stiffness: 200`, `damping: 15-20`) para movimentos explosivos e rápidos.

## Duração Total
Para uma batalha padrão de 6 rodadas:
*   Intro: 2s
*   Rodadas: 18s (6 x 3s)
*   Final: 3s
*   **Total Aproximado**: 23 segundos (ideal para looping em Shorts).

Em termos de frames (a 30fps), costuma-se configurar `durationInFrames={690}` no `Root.tsx`.

## Configuração de Dados

Cada batalha é definida por um arquivo JSON em `src/data/` (ex: `src/data/aracaju-maceio.json`).

Estrutura do JSON:
*   `matchId`: Identificador único.
*   `cities`: Array com 2 objetos contendo:
    *   Dados estatísticos (`data`).
    *   Identidade visual (`visual`: cores e nome da imagem).
*   `rounds`: Array definindo quais indicadores serão comparados, ordem e formatação.

## Como Gerar Novos Vídeos

1.  Adicione as imagens das cidades em `public/`.
2.  Crie um novo JSON em `src/data/` com os dados das cidades.
3.  Registre uma nova `<Composition>` em `src/Root.tsx`, importando o JSON criado e definindo os mesmos parâmetros de largura/altura e duração.

## Componentes Técnicos
*   **`src/Root.tsx`**: Ponto de entrada que registra todas as composições de vídeo disponíveis.
*   **`src/BattleVideo.tsx`**: Componente "pai" que sequencia a Intro, Rounds e Winner.
