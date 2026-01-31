# Como Gerar Vídeos com Dados Reais

## Fontes de Dados Oficiais

### 1. IBGE - Instituto Brasileiro de Geografia e Estatística

O IBGE é a fonte oficial de dados sobre municípios brasileiros. Principais APIs:

- **API de Localidades**: `https://servicodados.ibge.gov.br/api/v1/localidades/`
- **API de Agregados**: `https://servicodados.ibge.gov.br/api/v3/agregados/`

### 2. Variáveis Disponíveis no IBGE

| Variável         | Código | Descrição                         |
| ---------------- | ------ | --------------------------------- |
| População        | 9324   | População estimada                |
| IDH              | 3022   | Índice de Desenvolvimento Humano  |
| Renda per capita | 3024   | Renda per capita média            |
| Taxa de pobreza  | 3024   | Percentual em situação de pobreza |

### 3. Como Usar o Script de Geração

```bash
# Gerar top 10 cidades mais pobres de Minas Gerais
npm run generate:top10:pobres:minas

# Gerar top 10 cidades mais ricas de Minas Gerais
npm run generate:top10:ricas:minas

# Gerar top 10 cidades com melhor IDH do Brasil
npm run generate:top10:idh:brasil
```

### 4. Script Manual com API do IBGE

```typescript
import { generateRealData } from "./src/features/top-10-cidades/utils/real-data-generator";

// Gerar ranking de cidades mais pobres de Minas
const dados = await generateRealData({
  state: "MG", // Sigla do estado (MG, SP, RJ, etc.)
  metric: "incomePerCapita", // population | idh | incomePerCapita | povertyRate
  order: "asc", // 'asc' = menor valor primeiro (mais pobre)
  title: "As 10 CIDADES MAIS POBRES de Minas Gerais",
  subtitle: "Ranking 2024 - Menor renda per capita",
  theme: "elegant-dark",
  format: "vertical",
});

console.log(JSON.stringify(dados, null, 2));
```

### 5. Estados Disponíveis

```
AC, AL, AP, AM, BA, CE, DF, ES, GO, MA,
MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN,
RS, RO, RR, SC, SP, SE, TO
```

### 6. Métricas Suportadas

- `population` - População total
- `idh` - Índice de Desenvolvimento Humano
- `incomePerCapita` - Renda per capita
- `povertyRate` - Taxa de pobreza

### 7. Exemplo Completo de Uso

```typescript
// Cidades com maior IDH de São Paulo
const dadosSP = await generateRealData({
  state: "SP",
  metric: "idh",
  order: "desc", // 'desc' = maior IDH primeiro
  title: "As 10 CIDADES com MELHOR IDH de São Paulo",
  subtitle: "Ranking 2024 - Desenvolvimento Humano",
  theme: "clean-modern",
  format: "horizontal",
});
```

### 8. Links Úteis

- **Portal de APIs do IBGE**: https://servicodados.ibge.gov.br/api/docs/
- **Atlas Brasil**: http://atlasbrasil.org.br/
- **Dados Abertos**: https://basedosdados.org/ (Dataset completo)

### 9. Nota sobre Imagens

Para renderizar o vídeo, você precisará adicionar imagens das cidades em:

```
public/cities/
  serra-da-saudade.jpg
  morro-da-garca.jpg
  lassance.jpg
  ...
```

### 10. Próximos Passos

1. ✅ Script de geração automática criado
2. ⏳ Adicionar imagens das cidades
3. ⏳ Executar `npm run build:video Top10CidadesMaisPobresMinas`
4. ⏳ Publicar vídeo

Para dados ainda mais detalhados, consulte:

- https://basedosdados.org (dados abertos)
- https://www.ibge.gov.br/cidades-e-estados
- http://atlasbrasil.org.br/2013/pt/o-atlas/
