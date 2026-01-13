# Manual Funcional: City Video Generator 🚀

## 📋 Sobre o Produto
O **City Video Generator** é uma ferramenta automatizada de criação de vídeos baseada em **Remotion** (React para vídeo). Seu objetivo principal é gerar vídeos de alta qualidade no formato vertical (9:16) para plataformas de consumo rápido, como **YouTube Shorts, Instagram Reels e TikTok**.

O foco do projeto é a criação de **"Batalhas de Cidades"** e **"Campeonatos Regionais"**, onde municípios são comparados através de indicadores estatísticos reais, gerando engajamento através da curiosidade, competitividade regional e orgulho local.

---

## 🎯 Objetivo Estratégico
*   **Alto Engajamento**: Vídeos curtos (23 segundos) projetados para retenção máxima.
*   **Autoridade de Dados**: Utiliza dados reais (estimativas IBGE, IDH, PIB) para informar e entreter.
*   **Viralização**: Estimula comentários e debates entre moradores das cidades comparadas.

---

## 🎬 Estrutura das Cenas
Cada vídeo é composto por uma sequência lógica de 3 tipos de cenas:

### 1. Batalha Intro (Cena Inicial)
*   **Duração**: 2 segundos (60 frames).
*   **Funcionalidade**: Apresentação visual das duas cidades competidoras.
*   **Elementos**:
    *   Animação de entrada rápida (slide) das fotos de capa das cidades.
    *   Exibição dos nomes e apelidos (Ex: "Terra da Uva", "Capital da Moda").
    *   Fundo dinâmico aleatório para variedade visual.
    *   Título central impactante: "BATALHA DE CIDADES".

### 2. Batalha Round (Cenas de Comparação)
*   **Duração**: 3 segundos por round (90 frames).
*   **Funcionalidade**: Compara um indicador específico entre as cidades.
*   **Indicadores Padrão**:
    1.  **População**: Número de habitantes.
    2.  **Área**: Tamanho territorial em km².
    3.  **PIB/Capita**: Riqueza produzida por habitante.
    4.  **Leitos/1K**: Infraestrutura de saúde (leitos por 1000 hab).
    5.  **IDH**: Índice de Desenvolvimento Humano.
    6.  **Ensino Superior**: Porcentagem da população com graduação.
*   **Feedback Visual**: O valor vencedor é destacado com uma animação de escala e cor, enquanto o perdedor fica em preto e branco.

### 3. Batalha Winner (Cena Final)
*   **Duração**: 3 segundos (90 frames).
*   **Funcionalidade**: Proclama a cidade vencedora com base na pontuação total dos rounds.
*   **Elementos**:
    *   Placar final (Ex: 4 x 2).
    *   Efeito visual de destaque para a cidade campeã.
    *   Call to Action (implícito) para os espectadores comentarem sobre o resultado.

---

## 🏆 Modo Campeonato (Regional Tournaments)
Além das batalhas 1v1, o sistema suporta torneios entre 4 ou mais cidades no formato "todos contra todos".

### Estrutura do Campeonato
1.  **Abertura**: Apresentação de todas as cidades participantes.
2.  **Ciclo de Partidas**: Sequência de batalhas 1v1 seguindo a lógica do torneio.
3.  **Tabelas Parciais**: Após cada jogo, exibição da classificação atualizada (Pontos, Vitórias, Saldo de Rounds).
4.  **Grande Final**: Revelação da campeã com **Efeito de Confete** e resumo da campanha vitoriosa.

### Especificações do Campeonato
*   **Sincronia Musical**: Totalmente sincronizado com 128 BPM.
*   **Tempo das Rodadas**: Ajustado para 6 batidas (~2.8s) para maior legibilidade.
*   **Duração Total**: Limitada a **2:47** para coincidir com a trilha sonora.
*   **Formato**: Horizontal (1920x1080) por padrão.

---

### Adicionar Batalha 1v1
1.  **Coletar Dados**: Obtenha os dados das duas cidades.
2.  **Criar JSON**: Salve em `src/data/nome-das-cidades.json`.
3.  **Adicionar Imagens**: Coloque as fotos das cidades na pasta `public/`.
4.  **Registrar no Root**: Adicione a nova `<Composition>` no arquivo `src/Root.tsx`.

### Adicionar Campeonato
1.  **Configurar JSON**: Crie o arquivo em `src/data/championships/nome.json`.
2.  **Configurar Cidades**: Inclua os objetos completos das cidades (data e visual) no JSON do campeonato.
3.  **Registrar no Root**: Adicione o JSON ao array `championships` dentro do componente `RemotionRoot`.

---

## 💡 Dicas para Criadores
*   **Imagens**: Use fotos de alta resolução que mostrem marcos icônicos da cidade.
*   **Apelidos**: Use apelidos que os moradores locais reconheçam instantaneamente para aumentar a conexão emocional.
*   **Cores**: Personalize as cores primárias no JSON para corresponder aos brasões ou bandeiras das cidades.
