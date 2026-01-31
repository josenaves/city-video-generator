/**
 * Script para migrar cidades restantes (não mapeadas automaticamente)
 * Usage: node scripts/migrate-remaining.js
 */

const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(process.cwd(), "public");
const NEW_BASE_DIR = path.join(PUBLIC_DIR, "images/cities");

const MANUAL_STATE_MAP = {
  // São Paulo
  "aguas-de-lindoia": "SP",
  "aguas-de-santa-barbara": "SP",
  aiuruoca: "SP",
  alpinopolis: "SP",
  aracatuba: "SP",
  "aral-moreira": "SP",
  araraquara: "SP",
  atibaia: "SP",
  baependi: "SP",
  birigui: "SP",
  "braganca-paulista": "SP",
  caconde: "SP",
  caieiras: "SP",
  cambuquira: "SP",
  "campina-grande-do-sul": "SP",
  cananeia: "SP",
  carapicuiba: "SP",
  franca: "SP",
  indaiatuba: "SP",
  itajuba: "SP",
  itamogi: "SP",
  itapevi: "SP",
  itapira: "SP",
  itatiba: "SP",
  itu: "SP",
  itupeva: "SP",
  "jaragua-do-sul": "SP",
  jao: "SP",
  joanopolis: "SP",
  jundiai: "SP",
  leme: "SP",
  limeira: "SP",
  marilia: "SP",
  mirassol: "SP",
  mococa: "SP",
  "mogi-guacu": "SP",
  "mogi-mirim": "SP",
  "monte-alegre-do-sul": "SP",
  osasco: "SP",
  ourinhos: "SP",
  piracaia: "SP",
  "ribeirao-preto": "SP",
  salto: "SP",
  "santana-do-parnaiba": "SP",
  "sao-carlos": "SP",
  "sao-jose-do-rio-pardo": "SP",
  "sao-jose-dos-campos": "SP",
  "sao-paulo": "SP",
  "sao-sebastiao-do-paraiso": "SP",
  "sao-vicente": "SP",
  "serra-negra": "SP",
  sorocaba: "SP",
  tapiratiba: "SP",
  valinhos: "SP",
  vinhedo: "SP",
  votuporanga: "SP",

  // Minas Gerais
  araxa: "MG",
  barbacena: "MG",
  betim: "MG",
  "belo-horizonte": "MG",
  "conselheiro-lafaiete": "MG",
  contagem: "MG",
  divinopolis: "MG",
  extrema: "MG",
  guaranesia: "MG",
  guaxupe: "MG",
  juruaia: "MG",
  "montes-claros": "MG",
  "monte-belo": "MG",
  "monte-santo-de-minas": "MG",
  muzambinho: "MG",
  "nova-resende": "MG",
  "patos-de-minas": "MG",
  "pocos-de-caldas": "MG",
  pratapolis: "MG",
  "ribeirao-das-neves": "MG",
  sacramento: "MG",
  tombos: "MG",
  uberaba: "MG",
  varginha: "MG",

  // Santa Catarina
  ararangua: "SC",
  araucaria: "SC",
  chapeco: "SC",
  criciuma: "SC",
  florianopolis: "SC",
  itajai: "SC",
  joinville: "SC",
  joinvile: "SC",
  laguna: "SC",
  lages: "SC",
  tubarao: "SC",
  "uniao-da-vitoria": "SC",

  // Rio Grande do Sul
  caxambu: "RS",
  "caxias-do-sul": "RS",
  farroupilha: "RS",
  gramado: "RS",
  lajeado: "RS",
  lages: "RS",
  "passo-fundo": "RS",
  pelotas: "RS",
  "rio-grande": "RS",
  "santa-cruz-do-sul": "RS",
  "santa-maria": "RS",
  soledade: "RS",
  vacaria: "RS",
  "novo-hamburgo": "RS",
  "bento-goncalves": "RS",

  // Paraná
  "campo-grande": "PR",
  curitiba: "PR",
  londrina: "PR",
  maringa: "PR",
  "ponta-grossa": "PR",
  "ponte-pora": "PR",
  "porto-uniao": "PR",
  "presidente-prudente": "PR",
  "sao-jose-dos-pinhais": "PR",

  // Bahia
  aracaju: "BA",
  "paulo-afonso": "BA",
  "quatro-barras": "BA",
  "nova-rodelas": "BA",

  // Pernambuco
  "gaviao-peixoto": "PE",
  "joao-pessoa": "PE",
  olinda: "PE",
  parintins: "PE",
  recife: "PE",

  // Rio de Janeiro
  "juiz-de-fora": "RJ",
  "rio-de-janeiro": "RJ",
  teresopolis: "RJ",

  // Goiás
  goiania: "GO",

  // Mato Grosso
  cuiaba: "MT",

  // Mato Grosso do Sul
  dourados: "MS",

  // Espírito Santo
  vitoria: "ES",

  // Rio Grande do Norte
  natal: "RN",

  // Ceará
  "estiva-gerbi": "CE",

  // Pará
  santarem: "PA",

  // Não são cidades
  background: null,
  catedral: null,
};

const LEGACY_EXTENSIONS = [".jpg", ".jpeg", ".webp", ".png", ".svg", ".avif"];

function scanAndMigrate(dir) {
  const files = fs.readdirSync(dir);
  let migrated = 0;
  let skipped = 0;

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
        const result = scanAndMigrate(fullPath);
        migrated += result.migrated;
        skipped += result.skipped;
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (LEGACY_EXTENSIONS.includes(ext)) {
        const cityName = file.replace(ext, "");
        const state = MANUAL_STATE_MAP[cityName.toLowerCase()];

        if (state) {
          const letter = file.charAt(0).toLowerCase();
          const newDir = path.join(NEW_BASE_DIR, state.toLowerCase(), letter);
          const newFilename = file
            .replace(/\.webp$/i, ".jpg")
            .replace(/\.avif$/i, ".jpg");
          const newPath = path.join(newDir, newFilename);

          if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir, { recursive: true });
          }

          if (fs.existsSync(newPath)) {
            skipped++;
          } else {
            fs.copyFileSync(fullPath, newPath);
            migrated++;
          }
        } else if (state === null) {
          skipped++;
        } else {
          skipped++;
        }
      }
    }
  });

  return { migrated, skipped };
}

function main() {
  console.log("🔄 Migrando cidades restantes...\n");

  const result = scanAndMigrate(PUBLIC_DIR);

  console.log("=".repeat(60));
  console.log(`📊 Resultado:`);
  console.log(`   Migradas: ${result.migrated}`);
  console.log(`   Ignoradas: ${result.skipped}`);
  console.log("\n✅ Migração concluída!\n");

  // Update the pending migration file
  const pendingFile = path.join(
    __dirname,
    "../src/data/pending-migration.json",
  );
  if (fs.existsSync(pendingFile)) {
    const pending = JSON.parse(fs.readFileSync(pendingFile, "utf-8"));
    pending.total = result.skipped;
    pending.lastMigration = new Date().toISOString();
    fs.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));
    console.log("📝 Arquivo pending-migration.json atualizado");
  }
}

main();
