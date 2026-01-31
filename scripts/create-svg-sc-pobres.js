const fs = require("fs");
const path = require("path");

const CITIES = [
  {
    name: "Abelardo Luz",
    filename: "abelardo-luz",
    state: "SC",
    color: "#8B4513",
  },
  { name: "Anchieta", filename: "anchieta-sc", state: "SC", color: "#CD853F" },
  {
    name: "Guaraciaba",
    filename: "guaraciaba-sc",
    state: "SC",
    color: "#DAA520",
  },
  {
    name: "Bela Vista do Toldo",
    filename: "bela-vista-do-toldo",
    state: "SC",
    color: "#228B22",
  },
  {
    name: "Trombudo Central",
    filename: "trombudo-central",
    state: "SC",
    color: "#4682B4",
  },
  { name: "Ipuaçu", filename: "ipuacu", state: "SC", color: "#6B8E23" },
  {
    name: "Monte Carlo",
    filename: "monte-carlo-sc",
    state: "SC",
    color: "#20B2AA",
  },
  { name: "Vargeão", filename: "vargeao", state: "SC", color: "#A0522D" },
  {
    name: "Novo Horizonte",
    filename: "novo-horizonte-sc",
    state: "SC",
    color: "#FF8C00",
  },
  {
    name: "São Bernardino",
    filename: "sao-bernardino-sc",
    state: "SC",
    color: "#DEB887",
  },
];

const OUTPUT_DIR = path.join(__dirname, "../public/cities");

function createSVGPlaceholder(city) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${city.color};stop-opacity:0.85" />
      <stop offset="100%" style="stop-color:${city.color}40;stop-opacity:0.5" />
    </linearGradient>
  </defs>
  
  <rect width="800" height="600" fill="url(#bg)" />
  
  <circle cx="100" cy="90" r="55" fill="${city.color}" opacity="0.2" />
  <circle cx="680" cy="510" r="85" fill="${city.color}" opacity="0.15" />
  <circle cx="620" cy="140" r="45" fill="${city.color}" opacity="0.25" />
  
  <rect x="300" y="75" width="200" height="50" rx="8" fill="${city.color}" opacity="0.95" />
  <text x="400" y="108" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="white" text-anchor="middle">${city.state}</text>
  
  <text x="400" y="275" font-family="Arial, sans-serif" font-size="30" font-weight="bold" fill="white" text-anchor="middle" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3)">
    ${city.name}
  </text>
  
  <path d="M400,330 C375,330 360,355 360,385 C360,420 400,455 400,455 C400,455 440,420 440,385 C440,355 425,330 400,330 Z" fill="${city.color}" opacity="0.9" />
  <circle cx="400" cy="385" r="20" fill="white" opacity="0.9" />
  
  <text x="400" y="500" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" opacity="0.8">
    Cidade do interior catarinense
  </text>
  
  <rect x="260" y="530" width="280" height="3" fill="${city.color}" opacity="0.5" />
</svg>`;
}

function createSVGFile(city) {
  const svg = createSVGPlaceholder(city);
  const filepath = path.join(OUTPUT_DIR, `${city.filename}.svg`);
  fs.writeFileSync(filepath, svg);
  return filepath;
}

function main() {
  console.log("🏙️  Criando imagens SVG para cidades pobres de SC...\n");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let count = 0;
  CITIES.forEach((city) => {
    const filepath = createSVGFile(city);
    console.log(`✓ ${city.name}`);
    count++;
  });

  console.log("\n" + "=".repeat(50));
  console.log(`✅ ${count} imagens SVG criadas!`);
  console.log(`📁 Pasta: ${OUTPUT_DIR}`);
}

main();
