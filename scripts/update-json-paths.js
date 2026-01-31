/**
 * Script para atualizar arquivos JSON com novos caminhos de imagens
 * Uso: node scripts/update-json-paths.js
 */

const fs = require("fs");
const path = require("path");

const STATE_MAP = {
  "belo-horizonte": "MG",
  betim: "MG",
  barbacena: "MG",
  arceburgo: "MG",
  araxa: "MG",
  alfenas: "MG",
  guaxupe: "MG",
  guaranesia: "MG",
  extrema: "MG",
  "pocos-de-caldas": "MG",
  varginha: "MG",
  bh: "MG",
  blumenau: "SC",
  brusque: "SC",
  joinville: "SC",
  florianopolis: "SC",
  tubarao: "SC",
  criciuma: "SC",
  chapeco: "SC",
  itajai: "SC",
  laguna: "SC",
  aracatuba: "SP",
  araras: "SP",
  assis: "SP",
  atibaia: "SP",
  bauru: "SP",
  barueri: "SP",
  botucatu: "SP",
  campinas: "SP",
  jundiai: "SP",
  "ribeirao-preto": "SP",
  "sao-paulo": "SP",
  sorocaba: "SP",
  "caxias-do-sul": "RS",
  caxambu: "RS",
  "passo-fundo": "RS",
  pelotas: "RS",
  "santa-maria": "RS",
  lajeado: "RS",
  "bento-goncalves": "RS",
  gramado: "RS",
  "rio-grande": "RS",
  "joao-pessoa": "PE",
  "gaviao-peixoto": "PE",
  "sao-pedro-da-uniao": "PE",
  "presidente-prudente": "PR",
  "quatro-barras": "BA",
  "sao-jose-do-rio-preto": "PR",
};

function getNewPath(imagePath, cityState) {
  const filename = path.basename(imagePath);
  const cityName = filename.replace(/\.(jpg|jpeg|webp|png|svg|avif)$/i, "");

  let state = cityState;
  if (!state && STATE_MAP[cityName.toLowerCase()]) {
    state = STATE_MAP[cityName.toLowerCase()];
  }

  if (state) {
    const letter = filename.charAt(0).toLowerCase();
    const ext =
      filename.match(/\.(jpg|jpeg|webp|png|svg|avif)$/i)?.[1] || "jpg";
    const newFilename = filename
      .replace(/\.webp$/i, ".jpg")
      .replace(/\.avif$/i, ".jpg");
    return `images/cities/${state.toLowerCase()}/${letter}/${newFilename}`;
  }

  return imagePath;
}

function updateJsonFile(filepath) {
  const content = fs.readFileSync(filepath, "utf-8");
  const data = JSON.parse(content);

  if (!data.cities || !Array.isArray(data.cities)) {
    return false;
  }

  let changes = 0;

  data.cities.forEach((city) => {
    const oldPath = city.visual?.image;
    if (oldPath && !oldPath.startsWith("images/cities/")) {
      const newPath = getNewPath(oldPath, city.state);
      if (newPath !== oldPath) {
        city.visual.image = newPath;
        changes++;
      }
    }
  });

  if (changes > 0) {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  }

  return changes;
}

function main() {
  console.log("🔄 Atualizando caminhos de imagens nos arquivos JSON...\n");

  const dataDir = path.join(__dirname, "../src/data");
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));

  let totalChanges = 0;
  let updatedFiles = 0;

  files.forEach((file) => {
    const filepath = path.join(dataDir, file);
    try {
      const changes = updateJsonFile(filepath);
      if (changes !== false) {
        if (changes > 0) {
          console.log(`✓ ${file}: ${changes} caminhos atualizados`);
          totalChanges += changes;
          updatedFiles++;
        }
      }
    } catch (e) {
      // Skip non-video JSON files
    }
  });

  console.log("\n" + "=".repeat(60));
  console.log(`📊 Resumo:`);
  console.log(`   Arquivos atualizados: ${updatedFiles}`);
  console.log(`   Total de mudanças: ${totalChanges}`);
  console.log("\n💡 Os vídeos existentes continuarão funcionando!");
  console.log("   Novos vídeos usarão a nova estrutura automaticamente.\n");
}

main();
