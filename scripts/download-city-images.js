/**
 * Script para baixar imagens de cidades brasileiras do Wikipedia
 * Usa a API do Wikimedia Commons
 */

const fs = require("fs");
const https = require("https");
const path = require("path");

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

const OUTPUT_DIR = path.join(__dirname, "../public/cities");

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
          reject(new Error(`HTTP ${response.statusCode}`));
          file.close();
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

async function searchWikipediaImage(cityName) {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(cityName + " Minas Gerais")}&prop=pageimages&format=json&pithumbsize=800&origin=*`;

  try {
    const response = await fetch(searchUrl);
    const data = await response.json();
    const pages = data.query?.pages;

    if (pages) {
      const pageId = Object.keys(pages)[0];
      const page = pages[pageId];
      if (page.thumbnail?.source) {
        return page.thumbnail.source;
      }
    }
    return null;
  } catch (error) {
    console.error(`Erro ao buscar imagem para ${cityName}:`, error.message);
    return null;
  }
}

async function downloadCityImage(city) {
  const filepath = path.join(OUTPUT_DIR, `${city.filename}.jpg`);

  if (fs.existsSync(filepath)) {
    console.log(`✓ ${city.name}: já existe`);
    return true;
  }

  console.log(`📥 ${city.name}: buscando...`);

  const imageUrl = await searchWikipediaImage(city.name);

  if (imageUrl) {
    try {
      await downloadFile(imageUrl, filepath);
      const stats = fs.statSync(filepath);
      console.log(
        `✓ ${city.name}: baixada (${(stats.size / 1024).toFixed(1)} KB)`,
      );
      return true;
    } catch (error) {
      console.error(`✗ ${city.name}: erro ao baixar - ${error.message}`);
    }
  } else {
    console.log(`✗ ${city.name}: não encontrada`);
  }

  // Try Portuguese Wikipedia
  console.log(`  → Tentando Wikipedia PT...`);
  const searchUrlPt = `https://pt.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(city.name + " Minas Gerais")}&prop=pageimages&format=json&pithumbsize=800&origin=*`;

  try {
    const response = await fetch(searchUrlPt);
    const data = await response.json();
    const pages = data.query?.pages;

    if (pages) {
      const pageId = Object.keys(pages)[0];
      const page = pages[pageId];
      if (page.thumbnail?.source) {
        try {
          await downloadFile(page.thumbnail.source, filepath);
          const stats = fs.statSync(filepath);
          console.log(
            `✓ ${city.name}: baixada da PT Wikipedia (${(stats.size / 1024).toFixed(1)} KB)`,
          );
          return true;
        } catch (error) {
          console.error(`✗ ${city.name}: erro ao baixar PT - ${error.message}`);
        }
      }
    }
  } catch (error) {
    console.error(`✗ ${city.name}: erro na Wikipedia PT - ${error.message}`);
  }

  return false;
}

async function main() {
  console.log("🏙️  Baixando imagens de cidades mineiras...\n");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let successCount = 0;

  for (const city of CITIES) {
    const success = await downloadCityImage(city);
    if (success) successCount++;
    console.log("");
  }

  console.log("=".repeat(50));
  console.log(
    `✅ ${successCount}/${CITIES.length} imagens baixadas com sucesso!`,
  );
  console.log(`📁 Pasta: ${OUTPUT_DIR}`);
}

main().catch(console.error);
