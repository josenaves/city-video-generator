---
name: SEO Top10 Ranking — Variante Viral
description: Gera título/descrição/tags no template exato do vídeo mais acessado (Top10 IDH/IFDM) — título com emoji de gancho + 📊 Principais Revelações + Estatísticas Impactantes
---

# SEO Top10 Ranking — Variante Viral (RJ IFDM)

Esta variante replica **1:1** o template do vídeo mais acessado da série (`Ribeirão Branco 0,639 ≈ São Tomé e Príncipe`):

> Você sabia que no estado mais rico do Brasil, existem cidades com IDH comparável ao de países africanos? 🤔

Use para **Top10** (`src/data/top-10/*.json`), não para Battle 1v1 (`⚔️`).

## Template obrigatório (espelhar ordem)

```md
🏷️ Título: [título do vídeo — ver regra de Título abaixo]

Você sabia que [gancho contraste estado rico vs pobreza com comparação internacional PNUD/Banco Mundial]? 🤔

Este ranking revela as 10 cidades mais [pobres/ricas/violentas] de [Estado] segundo [IFDM FIRJAN / IDH PNUD] [ano]. Prepare-se para conhecer realidades surpreendentes que contrastam fortemente com a imagem de [prosperidade/segurança] do estado.

🔴 [Cidade #1] lidera como a cidade mais [pobre] , com [IFDM/IDH] de apenas [valor] - comparável ao de [País]!

📊 Principais Revelações:

* [Cidade #1]: [IFDM] ([menor do estado])
* [Cidade #2]: [IFDM] - cidade de apenas [pop] habitantes
* Surpreendente: [Cidade X] tem apenas [pop] habitantes
* Padrão: Todas as cidades têm [IFDM] abaixo de [limite] ([faixa])
* Localização: Concentração na [região do estado]

Estatísticas Impactantes

💡 O que o ranking revela:

* Populações pequenas: entre [min] e [max] habitantes
* Baixo índice de educação: principal fator de queda no [IFDM/IDH]
* Renda per capita significativamente inferior à média estadual
* Expectativa de vida menor que a média
* Desafios estruturais de infraestrutura e acesso a serviços

🔔 Inscreva-se para mais vídeos sobre [desigualdade/desenvolvimento] e realidades brasileiras! 💬 Comente: Você conhecia alguma dessas cidades? 👍 Curta se este conteúdo te surpreendeu!

✅ Tags: #DesigualdadeSocial #SãoPaulo #CidadesBrasileiras #IDH #PobrezaNoBrasil #InteriorDeSP #EconomiaBrasileira #DesenvolvimentoHumano #PNUD #RibeirãoBranco #ValeDoRibeira #RealidadeBrasileira #RankingDeCidades #cidadesbrasileiras

📺 Principais vídeos
https://www.youtube.com/watch?v=AOOFvyibumk
https://www.youtube.com/watch?v=v34M07-VJ8o
https://www.youtube.com/watch?v=aCIJw9qz394
https://www.youtube.com/watch?v=aVR9W5osvOg
https://www.youtube.com/watch?v=hIsUapWpX8A
https://youtu.be/KFepyB57C_M
https://www.youtube.com/watch?v=C-zKmwcCKM8

🏡 Canal Cidades Brasileiras - https://www.youtube.com/channel/UCNIBV1w8fyEhiou8qp6GzXg?sub_confirmation=1
O canal para as pequenas, médias e grandes cidades brasileiras.

🔗 Nos siga também em outras redes sociais:
💚 Whatsapp: https://whatsapp.com/channel/0029Va86o4i0wajzsSqjxl2G
💚 Telegram: https://t.me/cidadesbrasileiras
💚 Facebook: http://facebook.com/profile.php?id=100089084473197

🏡 Canal Cidades Brasileiras - http://youtube.com/channels/UCNIBV1w8fyEhiou8qp6GzXg/join
O canal para as pequenas, médias e grandes cidades brasileiras.

✅ Comente o que você gostaria de ver aqui no🏡 Cidades Brasileiras - @cidadesbrasileiras
✅ Comente se você gostaria de ver sua cidade no 🏡 Cidades Brasileiras - @cidadesbrasileiras
✅ Entre em contato: canal.cidades.brasileiras@gmail.com
```

## Regras

- **Título (OBRIGATÓRIO — primeira linha do `.seo.md` como `🏷️ Título:`):** seguir os padrões reais do canal — emoji de gancho no início + palavra-chave em CAPS + ano quando houver. Exemplos canônicos:
  - `⚔️ AS 10 CIDADES MAIS POBRES DE SANTA CATARINA` (⚔️ choque/batalha)
  - `🤢 As cidades mais FEIAS de São Paulo` (🤢🤮 nojo → tema feiúra)
  - `🤮 As 10 cidades mais FEIAS de Santa Catarina 📉 2026` (📉 + ano)
  - `🐀 AS 10 CIDADES MAIS POBRES de SÃO PAULO: O Lado Esquecido do Estado Mais Rico do Brasil 2026` (subtítulo após `:` + ano)
  - Elementos: emoji-tema no início (`⚔️` `🤢` `🤮` `🐀` `📉`), keyword em CAPS (`FEIAS`, `POBRES`), subtítulo-gancho opcional após `:`, ano no fim (`2026`).
- **Comparação internacional:** use `brazilian_knowledge` + PNUD/Banco Mundial para mapear `IFDM 0,382` → país (ex: Níger, Haiti, São Tomé). Obrigatório no `🔴`.
- **Dados:** extraia de `src/data/top-10/*.json` `cities[]` ordenadas por `metric.order`. Calcule `min/max pop`, `média`, `região` (ex: Baixada Fluminense concentra 6/10).
- **IDs:** `videoId` → `src/seo/[videoId].seo.md` (ex: `top-10-cidades-mais-pobres-rj-ifdm-2025.seo.md`)
- **Boilerplate fixo:** copie `📺 Principais vídeos` 7 links + `🏡 Canal` 2× + sociais Whatsapp/Telegram/Facebook + contato `canal.cidades.brasileiras@gmail.com` — não invente.

## Workflow

1. **Analisar** `src/data/top-10/*.json` — identifique #1, menor pop, padrão `abaixo de X`, concentração regional
2. **Pesquisar** `brave_fetch` país comparável para `🔴`
3. **Gerar** título (`🏷️ Título:` primeira linha, regra de Título) + markdown seguindo template acima
4. **Salvar** `src/seo/[videoId].seo.md`

## Exemplo para RJ IFDM (este vídeo)

- `🔴 Belford Roxo 0,382` → comparável ao Níger (IDH 0,394)
- `📊` → `Japeri 0,411 - 105 mil hab` / `Varre-Sai 10.976 hab` / `Padrão <0,522` / `Localização: 6/10 na Baixada Fluminense, 3/10 no Noroeste`
- `Tags` → `#IFDM #FIRJAN #RiodeJaneiro #BaixadaFluminense #BelfordRoxo #DesigualdadeNoRJ` + tags base
