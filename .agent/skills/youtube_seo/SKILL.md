---
name: Geração de SEO para YouTube
description: Gera automaticamente títulos, descrições, palavras-chave e comentários fixados otimizados para SEO para vídeos de batalhas de cidades usando raciocínio autônomo de IA.
---

# 🤖 Skill de Geração de SEO para YouTube com IA

Esta skill aproveita as capacidades de raciocínio profundo e criatividade do agente de IA para gerar conteúdo de SEO de alto engajamento e consciente do contexto para a série "Cidades Brasileiras".

## 🚀 Diretrizes Principais da IA

1.  **Ganchos Emocionais Únicos**: Evite modelos repetitivos. Use seu conhecimento interno de tendências de 2026 para criar um gancho único, no estilo viral, para cada batalha (ex: "A Capital do Seguro está perdendo sua coroa?", "A Joia Escondida do Sul vs o Polo Tecnológico").
2.  **Descoberta Autônoma de Insights**: Analise os dados JSON para identificar as vitórias de rodada *mais surpreendentes* ou *impactantes*. Use-as para criar uma narrativa que desperte curiosidade (ex: "Você não vai acreditar qual cidade tem mais leitos hospitalares!").
3.  **Integração de Tendências em Tempo Real**: Use a ferramenta `search_web` para encontrar tendências, notícias ou apelidos reais de 2026 para as cidades para dar vida e atualidade ao SEO.
4.  **Otimização de Engajamento Psicológico**: Crie comentários fixados que gerem *debate* e incentivem os espectadores a comentarem sobre seu orgulho local ou opiniões divergentes (ex: "Você trocaria um salário maior por uma segurança 20% melhor?").

## 📋 Estrutura do Conteúdo de SEO

Cada saída deve ser um único arquivo Markdown contendo:

-   **Título Viral**: Título com alto CTR (Click-Through Rate), emojis e o ano 2026.
-   **Descrição Narrativa**: 2-3 parágrafos curtos e impactantes com um "gancho" forte.
-   **Destaques dos Dados**: Principais conclusões da batalha (ex: "Cidade X vence no PIB, mas Cidade Y domina na Saúde").
-   **CTA Padrão**: "🔔 Inscreva-se para mais Batalhas de Cidades!"
-   **Hashtags Direcionadas**: Uma mistura de amplas (#MercadoImobiliario) e específicas (#MudandoParaSaoPaulo).
-   **Palavras-chave Meta**: Uma lista separada por vírgulas de termos de pesquisa de alto volume.
-   **Comentário Fixado para Engajamento**: Uma pergunta polêmica ou que instigue a reflexão.

## 🛠️ Fluxo de Trabalho de Geração

1.  **Analisar**: Analisar profundamente o JSON da batalha para identificar o vencedor e "choques" estatísticos.
2.  **Pesquisar**: Usar `search_web` para encontrar as últimas notícias das cidades ou tendências de "migração" de 2026.
3.  **Sintetizar**: Elaborar conteúdo que maximize o CTR e a retenção.
4.  **Armazenar**: Salvar o resultado em `src/seo/[match-id].seo.md`.

## 📁 Convenção de Nomenclatura de Arquivos

Arquivos de SEO DEVEM ser armazenados em `src/seo/` com o formato de nome: `[match-id].seo.md`.
