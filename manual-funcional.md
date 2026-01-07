# Manual Funcional: City Video Generator 🚀

## 📋 Sobre o Produto
O **City Video Generator** é uma ferramenta automatizada de criação de vídeos baseada em **Remotion** (React para vídeo). Seu objetivo principal é gerar vídeos de alta qualidade no formato vertical (9:16) para plataformas de consumo rápido, como **YouTube Shorts, Instagram Reels e TikTok**.

O foco do projeto é a criação de **"Batalhas de Cidades"**, onde dois municípios são comparados através de indicadores estatísticos reais, gerando engajamento através da curiosidade, competitividade regional e orgulho local.

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
    *   Animação de "Confete" ou destaque para a cidade campeã.
    *   Call to Action (implícito) para os espectadores comentarem sobre o resultado.

---

## ⚙️ Especificações Técnicas
*   **Resolução**: 1080x1920 (Vertical).
*   **FPS**: 30 frames por segundo.
*   **Duração Total**: ~23 segundos (690 frames) — ideal para o algoritmo do YouTube Shorts.
*   **Áudio**: Trilha sonora de alta energia ("Beat Your Competition") sincronizada.

---

## 📝 Como Adicionar uma Nova Batalha
Para criar um novo vídeo, siga este fluxo:

1.  **Coletar Dados**: Obtenha os dados das duas cidades (IBGE/Google).
2.  **Criar JSON**: Crie um arquivo em `src/data/nome-das-cidades.json` (use um existente como template).
3.  **Adicionar Imagens**: Coloque as fotos das cidades na pasta `public/` (JPG/PNG/WEBP).
4.  **Registrar no Root**: Adicione a nova `<Composition>` no arquivo `src/Root.tsx`.
5.  **Renderizar**: Execute `npx remotion render BattleID` para gerar o arquivo MP4.

---

## 💡 Dicas para Criadores
*   **Imagens**: Use fotos de alta resolução que mostrem marcos icônicos da cidade.
*   **Apelidos**: Use apelidos que os moradores locais reconheçam instantaneamente para aumentar a conexão emocional.
*   **Cores**: Personalize as cores primárias no JSON para corresponder aos brasões ou bandeiras das cidades.
