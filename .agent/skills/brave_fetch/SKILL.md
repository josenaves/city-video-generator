---
name: Brave Web Fetch & Search
description: Realiza buscas na web e extração de conteúdo (Web Fetch) otimizadas usando a API do Brave Search para obter dados precisos e atualizados.
---

# 🦁 Skill de Brave Web Fetch & Search

Esta skill permite que o agente realize pesquisas na web e extraia o conteúdo principal de páginas de forma extremamente rápida e "limpa" (sem ruído de HTML/JS), utilizando a API do Brave Search.

## 🛠️ Configuração Requerida

- **BRAVE_API_KEY**: A chave deve estar presente no arquivo `.env` ou nas variáveis de ambiente do sistema.

## 🚀 Como Usar (Instruções para o Agente)

### 1. Pesquisa na Web (Web Search)
Sempre que precisar buscar fatos, estatísticas ou notícias recentes, utilize o endpoint de busca.
- **Endpoint**: `https://api.search.brave.com/res/v1/web/search`
- **Parâmetros úteis**:
    - `q`: A query de busca.
    - `count`: Número de resultados (padrão 10, máx 20).
    - `result_filter`: Use `web` para focar em páginas.

**Exemplo de Comando:**
```bash
curl -s -G "https://api.search.brave.com/res/v1/web/search" \
  --data-urlencode "q=população varginha 2024" \
  -H "Accept: application/json" \
  -H "Accept-Encoding: gzip" \
  -H "X-Subscription-Token: $BRAVE_API_KEY"
```

### 2. Extração de Conteúdo (Web Fetch / Pro)
Para ler o conteúdo de uma URL específica de forma otimizada para IA (Markdown/Texto limpo):
- **Endpoint**: `https://api.search.brave.com/res/v1/web/content`
- **Parâmetro**: `url=A_URL_AQUI`

**Exemplo de Comando:**
```bash
curl -s -G "https://api.search.brave.com/res/v1/web/content" \
  --data-urlencode "url=https://exemplo.com/pagina-de-dados" \
  -H "Accept: application/json" \
  -H "X-Subscription-Token: $BRAVE_API_KEY"
```

## 📋 Diretrizes de Execução

1.  **Prioridade**: Use esta skill antes de tentar o `browser_subagent` se o objetivo for apenas extrair texto ou dados numéricos, pois é significativamente mais rápido.
2.  **Tratamento de Dados**: Ao receber o JSON do Brave, extraia os campos `description` e `extra_snippets` no caso de busca, ou o campo `content` no caso de extração de URL.
3.  **Fallback**: Se a API do Brave falhar (limite de quota ou erro 4xx/5xx), utilize a ferramenta `search_web` padrão como fallback.
4.  **SEO & Dados**: Use os dados obtidos para alimentar as outras skills do projeto, como a `youtube_seo`.
