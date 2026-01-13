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
*   `cities`: Array com 2 objetos contendo dados estatísticos (`data`) e identidade visual (`visual`).
*   `rounds`: Array definindo quais indicadores serão comparados, ordem e formatação.

---

## 🏆 Motor de Campeonatos (`ChampionshipVideo`)

O sistema agora suporta um modo de campeonato completo para torneios regionais.

### Sincronia Musical (128 BPM)
Diferente das batalhas simples, este modo é sincronizado matematicamente com a batida:
*   **Batida**: 1 beat = 14.0625 frames (em 30fps).
*   **Partidas**: Rodadas de 6 batidas para garantir melhor leitura em formatos mais longos.
*   **Duração Máxima**: **2:47** (tempo total da música).

### Lógica de Torneio (`ChampionshipManager`)
O gerenciamento dos jogos e rankings é feito programaticamente:
*   **Pontuação**: Vitória = 1 ponto, Empate/Derrota = 0.
*   **Desempate**: 1º Saldo de Rounds, 2º Número de Vitórias.

### Configuração via JSON
Os campeonatos são configurados em `src/data/championships/*.json`:
```json
{
  "name": "Nome do Campeonato",
  "cities": [...],
  "rounds": [...]
}
```

## Componentes Técnicos
*   **`src/Root.tsx`**: Orquestrador que registra batalhas e campeonatos via mapeamento de JSON.
*   **`src/ChampionshipVideo.tsx`**: Engine que renderiza a sequência de jogos, tabelas e pódio.
*   **`src/utils/ChampionshipManager.ts`**: Cérebro matemático do torneio.
*   **`src/components/ChampionshipComponents.tsx`**: UI especializada (Abertura, Tabelas, Confete).
