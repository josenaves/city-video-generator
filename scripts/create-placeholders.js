/**
 * Script para baixar imagens de referência de Minas Gerais
 * Usa imagem genérica para cidades pequenas sem imagens próprias
 */

const fs = require("fs");
const https = require("https");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "../public/cities");
const FALLBACK_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Minas_Gerais_Municip_Bocaiuva.svg/1200px-Minas_Gerais_Municip_Bocaiuva.svg.png";

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https
      .get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          downloadFile(response.headers.location, filepath)
            .then(resolve)
            .catch(reject);
        } else if (response.statusCode !== 200) {
          file.close();
          fs.unlink(filepath, () => {});
          reject(new Error(`HTTP ${response.statusCode}`));
        } else {
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve(filepath);
          });
        }
      })
      .on("error", (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
  });
}

async function main() {
  console.log("🏙️  Criando imagens placeholder para cidades mineiras...\n");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const CITIES = [
    { name: "Serra da Saudade", filename: "serra-da-saudade" },
    { name: "Morro da Garça", filename: "morro-da-garca" },
    { name: "Lassance", filename: "lassance" },
    { name: "Cônego Marinho", filename: "conego-marinho" },
    { name: "Dom Bosco", filename: "dom-bosco" },
    { name: "Guaraciama", filename: "guaraciama" },
    { name: "Senador Modestino Gonçalves", filename: "senador-modestino" },
    { name: "Cabeceira Grande", filename: "cabeceira-grande" },
    { name: "Montezuma", filename: "montezuma" },
    { name: "José Gonçalves de Minas", filename: "jose-goncalves-minas" },
  ];

  console.log("📥 Baixando imagem de referência de Minas Gerais...");

  try {
    const mainImagePath = path.join(OUTPUT_DIR, "minas-gerais-reference.jpg");
    await downloadFile(FALLBACK_IMAGE, mainImagePath);
    const stats = fs.statSync(mainImagePath);
    console.log(
      `✓ Imagem de referência baixada (${(stats.size / 1024).toFixed(1)} KB)\n`,
    );

    for (const city of CITIES) {
      const filepath = path.join(OUTPUT_DIR, `${city.filename}.jpg`);

      if (fs.existsSync(filepath)) {
        console.log(`✓ ${city.name}: já existe`);
      } else {
        fs.copyFileSync(mainImagePath, filepath);
        console.log(`✓ ${city.name}: imagem de referência copiada`);
      }
    }

    console.log("\n" + "=".repeat(50));
    console.log(`✅ ${CITIES.length} imagens de fallback criadas!`);
    console.log("📁 Pasta: " + OUTPUT_DIR);
    console.log("\n⚠️  Nota: Estas são imagens de referência.");
    console.log("   Para um vídeo profissional, considere:");
    console.log("   - Contratar фотógrafo local");
    console.log("   - Usar imagens do Google Street View");
    console.log("   - Buscar em bancos de imagens pagos\n");
  } catch (error) {
    console.error("✗ Erro ao baixar imagem de referência:", error.message);

    // Create simple placeholder text images
    console.log("\n📝 Criando imagens placeholder simples...\n");

    for (const city of CITIES) {
      const filepath = path.join(OUTPUT_DIR, `${city.filename}.jpg`);

      // Create a simple colored placeholder
      const placeholderContent = `# Imagem de ${city.name}, MG
      
Esta é uma imagem placeholder.
Para um vídeo profissional, substitua por uma imagem real da cidade.

Fonte sugerida:
- Google Maps Street View
- Wikipedia Commons
- Bancos de imagens gratuitos (Unsplash, Pexels)
- Fotógrafo local
      
Coords: MG
População: (ver dados JSON)
`;

      fs.writeFileSync(filepath.replace(".jpg", ".txt"), placeholderContent);
      console.log(`✓ ${city.name}: arquivo de referência criado`);
    }
  }
}

main().catch(console.error);
