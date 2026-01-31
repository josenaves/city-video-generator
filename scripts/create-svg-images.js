const fs = require("fs");
const path = require("path");

const CITIES = [
  {
    name: "Serra da Saudade",
    filename: "serra-da-saudade",
    state: "MG",
    color: "#8B4513",
  },
  {
    name: "Morro da Garça",
    filename: "morro-da-garca",
    state: "MG",
    color: "#CD853F",
  },
  { name: "Lassance", filename: "lassance", state: "MG", color: "#FFD700" },
  {
    name: "Cônego Marinho",
    filename: "conego-marinho",
    state: "MG",
    color: "#DEB887",
  },
  { name: "Dom Bosco", filename: "dom-bosco", state: "MG", color: "#F4A460" },
  { name: "Guaraciama", filename: "guaraciama", state: "MG", color: "#20B2AA" },
  {
    name: "Senador Modestino Gonçalves",
    filename: "senador-modestino",
    state: "MG",
    color: "#696969",
  },
  {
    name: "Cabeceira Grande",
    filename: "cabeceira-grande",
    state: "MG",
    color: "#4682B4",
  },
  { name: "Montezuma", filename: "montezuma", state: "MG", color: "#6B8E23" },
  {
    name: "José Gonçalves de Minas",
    filename: "jose-goncalves-minas",
    state: "MG",
    color: "#DAA520",
  },
];

const OUTPUT_DIR = path.join(__dirname, "../public/cities");

function createSVGPlaceholder(city) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${city.color};stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:${city.color}40;stop-opacity:0.4" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="600" fill="url(#bg)" />
  
  <!-- Decorative circles -->
  <circle cx="100" cy="100" r="50" fill="${city.color}" opacity="0.3" />
  <circle cx="700" cy="500" r="80" fill="${city.color}" opacity="0.2" />
  <circle cx="650" cy="150" r="40" fill="${city.color}" opacity="0.25" />
  
  <!-- State Badge -->
  <rect x="300" y="80" width="200" height="60" rx="10" fill="${city.color}" opacity="0.9" />
  <text x="400" y="120" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">${city.state}</text>
  
  <!-- City Name -->
  <text x="400" y="300" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="white" text-anchor="middle">
    ${city.name}
  </text>
  
  <!-- Subtitle -->
  <text x="400" y="380" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" opacity="0.8">
    Minas Gerais
  </text>
  
  <!-- Map pin icon -->
  <path d="M400,420 C370,420 350,450 350,480 C350,520 400,560 400,560 C400,560 450,520 450,480 C450,450 430,420 400,420 Z" fill="${city.color}" opacity="0.9" />
  <circle cx="400" cy="480" r="20" fill="white" opacity="0.9" />
  
  <!-- Footer -->
  <text x="400" y="570" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle" opacity="0.6">
    Cidade do interior mineiro
  </text>
</svg>`;
}

function createSVGFile(city) {
  const svg = createSVGPlaceholder(city);
  const filepath = path.join(OUTPUT_DIR, `${city.filename}.svg`);
  fs.writeFileSync(filepath, svg);
  return filepath;
}

function main() {
  console.log("🏙️  Criando imagens SVG para cidades mineiras...\n");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Remove old text files
  const files = fs.readdirSync(OUTPUT_DIR);
  files.forEach((file) => {
    if (file.endsWith(".txt")) {
      fs.unlinkSync(path.join(OUTPUT_DIR, file));
    }
  });

  let count = 0;
  CITIES.forEach((city) => {
    const filepath = createSVGFile(city);
    const stats = fs.statSync(filepath);
    console.log(`✓ ${city.name}: ${(stats.size / 1024).toFixed(1)} KB`);
    count++;
  });

  console.log("\n" + "=".repeat(50));
  console.log(`✅ ${count} imagens SVG criadas!`);
  console.log(`📁 Pasta: ${OUTPUT_DIR}`);
  console.log("\n💡 Dica: Para imagens reais, você pode:");
  console.log("   - Usar Google Street View");
  console.log("   - Baixar do Wikipedia Commons");
  console.log("   - Contratar fotógrafo local\n");
}

main();
