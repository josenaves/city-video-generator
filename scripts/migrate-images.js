/**
 * Script para migrar imagens para a nova estrutura unificada
 * Uso: node scripts/migrate-images.js
 */

const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "../public");
const NEW_BASE_DIR = path.join(PUBLIC_DIR, "images/cities");

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
};

const LEGACY_EXTENSIONS = [".jpg", ".jpeg", ".webp", ".png", ".svg"];

function scanForImages(dir, images = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (
        file !== "images" &&
        file !== "cities" &&
        file !== "audio" &&
        file !== "intro"
      ) {
        scanForImages(fullPath, images);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (LEGACY_EXTENSIONS.includes(ext)) {
        images.push({
          relativePath: path.relative(PUBLIC_DIR, fullPath),
          filename: file,
          extension: ext.replace(".", ""),
        });
      }
    }
  });
  return images;
}

function getState(filename) {
  const name = filename.toLowerCase().replace(/\.(jpg|jpeg|webp|png|svg)$/, "");

  if (STATE_MAP[name]) {
    return STATE_MAP[name];
  }

  if (name.includes("-mg")) return "MG";
  if (name.includes("-sc")) return "SC";
  if (name.includes("-sp")) return "SP";
  if (name.includes("-rs")) return "RS";
  if (name.includes("-pr")) return "PR";
  if (name.includes("-ba")) return "BA";
  if (name.includes("-pe")) return "PE";
  if (name.includes("-rj")) return "RJ";
  if (name.includes("-go")) return "GO";
  if (name.includes("-mt")) return "MT";
  if (name.includes("-ms")) return "MS";

  return "UNKNOWN";
}

function migrateImages() {
  console.log("🔍 Procurando imagens legadas...\n");

  const images = scanForImages(PUBLIC_DIR);
  console.log(`✓ ${images.length} imagens encontradas\n`);

  const migrationLog = [];
  let skipped = 0;

  images.forEach((img) => {
    const state = getState(img.filename);

    if (state === "UNKNOWN") {
      console.log(`⚠️  Ignorado: ${img.filename} (estado não identificado)`);
      skipped++;
      return;
    }

    const letter = img.filename.charAt(0).toLowerCase();
    const newDir = path.join(NEW_BASE_DIR, state.toLowerCase(), letter);
    const newFilename = img.filename
      .replace(/\.webp$/, ".jpg")
      .replace(/\.avif$/, ".jpg");
    const newPath = path.join(newDir, newFilename);

    const oldFullPath = path.join(PUBLIC_DIR, img.relativePath);

    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir, { recursive: true });
    }

    if (fs.existsSync(newPath)) {
      console.log(`✓ ${img.filename}: já existe em ${state}/${letter}/`);
    } else if (fs.existsSync(oldFullPath)) {
      fs.copyFileSync(oldFullPath, newPath);
      console.log(
        `✓ ${img.filename} → ${state.toLowerCase()}/${letter}/${newFilename}`,
      );
      migrationLog.push({
        from: img.relativePath,
        to: path.join(
          "images/cities",
          state.toLowerCase(),
          letter,
          newFilename,
        ),
        state,
      });
    }
  });

  console.log("\n" + "=".repeat(60));
  console.log(`📊 Resumo da migração:`);
  console.log(`   Migradas: ${migrationLog.length}`);
  console.log(`   Ignoradas: ${skipped}`);
  console.log(`   Total: ${images.length}`);
  console.log(
    "\n📁 Nova estrutura: public/images/cities/{estado}/{letra}/{cidade}.jpg\n",
  );

  fs.writeFileSync(
    path.join(__dirname, "../src/data/image-migration-log.json"),
    JSON.stringify(
      {
        date: new Date().toISOString(),
        migrated: migrationLog.length,
        files: migrationLog,
      },
      null,
      2,
    ),
  );
  console.log("📝 Log salvo em src/data/image-migration-log.json");
}

function createDirectoryStructure() {
  console.log("📁 Criando estrutura de diretórios...\n");

  const states = [
    "ac",
    "al",
    "ap",
    "am",
    "ba",
    "ce",
    "df",
    "es",
    "go",
    "ma",
    "mt",
    "ms",
    "mg",
    "pa",
    "pb",
    "pr",
    "pe",
    "pi",
    "rj",
    "rn",
    "rs",
    "ro",
    "rr",
    "sc",
    "sp",
    "se",
    "to",
  ];

  states.forEach((state) => {
    for (let i = 97; i <= 122; i++) {
      const letter = String.fromCharCode(i);
      const dir = path.join(NEW_BASE_DIR, state, letter);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
  });

  console.log(`✓ 27 estados × 26 letras = 702 diretórios criados\n`);
}

createDirectoryStructure();
migrateImages();
