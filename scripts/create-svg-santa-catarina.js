const fs = require("fs");
const path = require("path");

const CITIES = [
  {
    name: "Balneário Camboriú",
    filename: "balneario-camboriu",
    state: "SC",
    color: "#00BFFF",
  },
  {
    name: "Florianópolis",
    filename: "florianopolis",
    state: "SC",
    color: "#4169E1",
  },
  { name: "Joinville", filename: "joinville", state: "SC", color: "#228B22" },
  { name: "Blumenau", filename: "blumenau", state: "SC", color: "#8B0000" },
  { name: "Itajaí", filename: "itajai", state: "SC", color: "#006994" },
  { name: "Chapecó", filename: "chapeco", state: "SC", color: "#2E8B57" },
  { name: "Criciúma", filename: "criciuma", state: "SC", color: "#2F4F4F" },
  { name: "Tubarão", filename: "tubarao", state: "SC", color: "#4682B4" },
  { name: "Lages", filename: "lages", state: "SC", color: "#8B4513" },
  { name: "São José", filename: "sao-jose-sc", state: "SC", color: "#4B0082" },
];

const OUTPUT_DIR = path.join(__dirname, "../public/cities");

function createSVGPlaceholder(city) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${city.color};stop-opacity:0.9" />
      <stop offset="100%" style="stop-color:${city.color}40;stop-opacity:0.5" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="600" fill="url(#bg)" />
  
  <!-- Decorative elements -->
  <circle cx="100" cy="80" r="60" fill="${city.color}" opacity="0.2" />
  <circle cx="700" cy="520" r="90" fill="${city.color}" opacity="0.15" />
  <circle cx="650" cy="120" r="50" fill="${city.color}" opacity="0.25" />
  
  <!-- State Badge -->
  <rect x="300" y="70" width="200" height="55" rx="8" fill="${city.color}" opacity="0.95" />
  <text x="400" y="108" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">${city.state}</text>
  
  <!-- City Name -->
  <text x="400" y="280" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3)">
    ${city.name}
  </text>
  
  <!-- Map pin -->
  <path d="M400,340 C370,340 350,370 350,400 C350,440 400,480 400,480 C400,480 450,440 450,400 C450,370 430,340 400,340 Z" fill="${city.color}" opacity="0.9" />
  <circle cx="400" cy="400" r="22" fill="white" opacity="0.95" />
  
  <!-- Rich indicator -->
  <text x="400" y="510" font-family="Arial, sans-serif" font-size="18" fill="white" text-anchor="middle" opacity="0.8">
    Uma das cidades mais ricas de SC
  </text>
  
  <!-- Footer -->
  <rect x="250" y="540" width="300" height="3" fill="${city.color}" opacity="0.5" />
</svg>`;
}

function createSVGFile(city) {
  const svg = createSVGPlaceholder(city);
  const filepath = path.join(OUTPUT_DIR, `${city.filename}.svg`);
  fs.writeFileSync(filepath, svg);
  return filepath;
}

function main() {
  console.log("🏙️  Criando imagens SVG para cidades catarinenses...\n");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let count = 0;
  CITIES.forEach((city) => {
    const filepath = createSVGFile(city);
    const stats = fs.statSync(filepath);
    console.log(`✓ ${city.name}`);
    count++;
  });

  console.log("\n" + "=".repeat(50));
  console.log(`✅ ${count} imagens SVG criadas!`);
  console.log(`📁 Pasta: ${OUTPUT_DIR}`);
}

main();
