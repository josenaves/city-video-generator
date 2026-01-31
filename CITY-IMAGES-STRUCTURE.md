# Estrutura de Imagens de Cidades - Unificada

## 🎯 Objetivo

Centralizar todas as imagens de cidades brasileiras em uma única estrutura de pastas, mantendo compatibilidade retroativa com vídeos existentes.

## 📁 Estrutura

```
public/images/cities/
├── sc/
│   ├── a/
│   │   ├── aracatuba.png
│   │   └── aurora.jpg
│   ├── b/
│   │   ├── blumenau.jpg
│   │   ├── brusque.jpg
│   │   └── bento-goncalves.jpg
│   └── ...
├── mg/
│   ├── a/
│   │   ├── arceburgo.jpg
│   │   ├── araxa.jpg
│   │   └── alfenas.jpg
│   ├── b/
│   │   ├── bh.jpg
│   │   ├── betim.jpg
│   │   └── belo-horizonte.jpg
│   └── ...
├── sp/
│   ├── a/
│   │   ├── atibaia.jpg
│   │   ├── assis.jpg
│   │   └── araras.jpg
│   ├── b/
│   │   ├── bauru.jpg
│   │   ├── barueri.jpg
│   │   └── botucatu.jpg
│   └── ...
└── {estado}/{letra}/{cidade}.{extensao}
```

## 📐 Padrão de Nomenclatura

```
images/cities/{estado}/{letra}/{nome-da-cidade}.{extensao}
```

Exemplos:

- `images/cities/sp/s/sao-paulo.jpg`
- `images/cities/mg/b/belo-horizonte.jpg`
- `images/cities/sc/b/blumenau.jpg`
- `images/cities/rs/c/caxias-do-sul.jpg`

## 🗂️ Estados Suportados

```
AC, AL, AP, AM, BA, CE, DF, ES, GO, MA,
MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN,
RS, RO, RR, SC, SP, SE, TO
```

## 🔄 Migração

### Script de Migração

```bash
# Migrar imagens existentes para nova estrutura
node scripts/migrate-images.js

# Atualizar caminhos nos arquivos JSON
node scripts/update-json-paths.js
```

### Resultados da Migração

- **702 diretórios criados** (27 estados × 26 letras)
- **45 imagens migradas** para nova estrutura
- **88 arquivos JSON atualizados** com novos caminhos
- **Compatibilidade 100%** mantida com vídeos existentes

## 🔗 Compatibilidade Retroativa

O sistema automaticamente resolve caminhos antigos para novos:

| Caminho Antigo              | Novo Caminho                            |
| --------------------------- | --------------------------------------- |
| `public/blumenau.jpg`       | `images/cities/sc/b/blumenau.jpg`       |
| `public/sao-paulo.jpg`      | `images/cities/sp/s/sao-paulo.jpg`      |
| `public/belo-horizonte.jpg` | `images/cities/mg/b/belo-horizonte.jpg` |

## 📝 Como Adicionar Novas Imagens

### 1. Salve a imagem

Coloque em: `public/images/cities/{estado}/{letra}/{cidade}.{ext}`

Exemplo:

```bash
# Para Nova Lima (MG)
cp cidade.jpg public/images/cities/mg/n/nova-lima.jpg
```

### 2. Atualize o JSON de dados

```json
{
  "name": "Nova Lima",
  "state": "MG",
  "visual": {
    "image": "images/cities/mg/n/nova-lima.jpg"
  }
}
```

## 🛠️ Utilitários Disponíveis

### `city-image-path.ts`

```typescript
import {
  resolveCityImagePath,
  generateCityPath,
} from "./utils/city-image-path";

// Resolver caminho com compatibilidade retroativa
const result = resolveCityPath("blumenau.jpg", "SC");
// Resultado: { resolvedPath: 'images/cities/sc/b/blumenau.jpg', source: 'new' }

// Gerar novo caminho
const newPath = generateCityPath("SC", "blumenau", "jpg");
// Resultado: 'images/cities/sc/b/blumenau.jpg'
```

### `image-resolver.ts`

```typescript
import { convertVideoDataToNewPaths } from "./utils/image-resolver";

// Converter dados de vídeo para novos caminhos
const updatedData = convertVideoDataToNewPaths(videoData);
```

## 🎨 Extensões Suportadas

- `.jpg` / `.jpeg` - Recomendado
- `.png` - Suportado
- `.webp` - Convertido automaticamente para `.jpg`
- `.svg` - Suportado para placeholders

## 📦 Arquivos de Configuração

| Arquivo                              | Descrição                   |
| ------------------------------------ | --------------------------- |
| `src/data/city-images-registry.json` | Registro central de imagens |
| `src/data/image-migration-log.json`  | Log da migração             |
| `scripts/migrate-images.js`          | Script de migração          |
| `scripts/update-json-paths.js`       | Atualização de caminhos     |

## 🚀 Próximos Passos

1. **Adicionar imagens de mais cidades** seguindo a nova estrutura
2. **Criar script de download** automático do Wikipedia Commons
3. **Implementar validação** de existência de imagens
4. **Adicionar metadados** (autor, licença, data)

## 📊 Estatísticas

- **Total de imagens:** 172+
- **Migradas:** 45
- **Estados:** 27
- **Arquivos JSON:** 88 atualizados

---

**Nota:** Os vídeos existentes continuarão funcionando normalmente, pois o sistema resolve automaticamente os caminhos antigos para os novos.
