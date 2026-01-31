/**
 * Script para baixar imagens de cidades brasileiras usando geolocalização
 * Usa API do Wikimedia Commons baseada em coordenadas
 */

const fs = require("fs");
const https = require("https");
const path = require("path");

const CITIES = [
  { name: "Serra da Saudade", lat: -19.2369, lon: -45.8978 },
  { name: "Morro da Garça", lat: -17.8286, lon: -44.3133 },
  { name: "Lassance", lat: -17.6211, lon: -44.5739 },
  { name: "Cônego Marinho", lat: -15.4069, lon: -44.3669 },
  { name: "Dom Bosco", lat: -16.9622, lon: -45.1933 },
  { name: "Guaraciama", lat: -17.0169, lon: -43.8408 },
  { name: "Senador Modestino Gonçalves", lat: -18.0636, lon: -43.9503 },
  { name: "Cabeceira Grande", lat: -16.9069, lon: -45.6203 },
  { name: "Montezuma", lat: -15.1831, lon: -42.5981 },
  { name: "José Gonçalves de Minas", lat: -16.6819, lon: -44.0917 },
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

async function searchImagesByCoords(lat, lon, radius = 10000) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=geosearch&gsradius=${radius}&gscoord=${lat}|${lon}&prop=pageimages&format=json&pithumbsize=800&origin=*`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.query?.geosearch || [];
  } catch (error) {
    console.error("Erro na busca por coordenadas:", error.message);
    return [];
  }
}

async function downloadCityImage(city) {
  const filepath = path.join(OUTPUT_DIR, `${city.filename}.jpg`);

  if (fs.existsSync(filepath)) {
    console.log(`✓ ${city.name}: já existe`);
    return true;
  }

  console.log(`📥 ${city.name} (${city.lat}, ${city.lon}): buscando...`);

  const results = await searchImagesByCoords(city.lat, city.lon);

  if (results.length > 0) {
    const imageUrl = `https:${results[0].thumbnail}`;
    try {
      await downloadFile(imageUrl, filepath);
      const stats = fs.statSync(filepath);
      console.log(
        `✓ ${city.name}: baixada (${(stats.size / 1024).toFixed(1)} KB)`,
      );
      return true;
    } catch (error) {
      console.error(`✗ ${city.name}: erro - ${error.message}`);
    }
  } else {
    console.log(`✗ ${city.name}: sem imagens na região`);
  }

  return false;
}

async function main() {
  console.log(
    "🏙️  Baixando imagens de cidades mineiras (por geolocalização)...\n",
  );

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
  console.log(`✅ ${successCount}/${CITIES.length} imagens baixadas!`);
  console.log(`📁 Pasta: ${OUTPUT_DIR}`);
}

main().catch(console.error);
