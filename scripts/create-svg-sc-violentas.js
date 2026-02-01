const fs = require("fs");
const path = require("path");

const CITIES = [
  {
    name: "São Miguel do Oeste",
    filename: "sao-miguel-do-oeste",
    state: "SC",
    color: "#8B0000",
  },
  { name: "Chapecó", filename: "chapeco", state: "SC", color: "#B22222" },
  { name: "Criciúma", filename: "criciuma", state: "SC", color: "#2F4F4F" },
  { name: "Tubarão", filename: "tubarao", state: "SC", color: "#800000" },
  { name: "Lages", filename: "lages", state: "SC", color: "#8B4513" },
  { name: "Itajaí", filename: "itajai", state: "SC", color: "#006994" },
  { name: "Caçador", filename: "cacador", state: "SC", color: "#556B2F" },
  { name: "Concórdia", filename: "concordia", state: "SC", color: "#8B0000" },
  { name: "São José", filename: "sao-jose-sc", state: "SC", color: "#4B0082" },
  { name: "Videira", filename: "videira", state: "SC", color: "#800080" },
];

const OUTPUT_DIR = path.join(__dirname, "../public/images/cities");

function createSVGPlaceholder(city) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${city.color};stop-opacity:0.95" />
      <stop offset="100%" style="stop-color:${city.color}40;stop-opacity:0.5" />
    </linearGradient>
  </defs>
  
  <rect width="800" height="600" fill="url(#bg)" />
  
  <circle cx="90" cy="70" r="55" fill="${city.color}" opacity="0.2" />
  <circle cx="710" cy="530" r="85" fill="${city.color}" opacity="0.15" />
  <circle cx="660" cy="130" r="45" fill="${city.color}" opacity="0.25" />
  
  <rect x="300" y="65" width="200" height="55" rx="8" fill="${city.color}" opacity="0.95" />
  <text x="400" y="103" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">${city.state}</text>
  
  <text x="400" y="270" font-family="Arial, sans-serif" font-size="30" font-weight="bold" fill="white" text-anchor="middle" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.4)">
    ${city.name}
  </text>
  
  <path d="M400,320 C375,320 355,345 355,375 C355,410 400,450 400,450 C400,450 445,410 445,375 C445,345 425,320 400,320 Z" fill="${city.color}" opacity="0.9" />
  <circle cx="400" cy="375" r="20" fill="white" opacity="0.9" />
  
  <text x="400" y="490" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" opacity="0.85">
    Santa Catarina - Brasil
  </text>
  
  <rect x="220" y="530" width="360" height="3" fill="${city.color}" opacity="0.6" />
</svg>`;
}

function main() {
  console.log("🏙️  Criando imagens SVG para cidades mais violentas de SC...\n");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let count = 0;
  CITIES.forEach((city) => {
    const letter = city.filename.charAt(0).toLowerCase();
    const dir = path.join(OUTPUT_DIR, city.state.toLowerCase(), letter);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filepath = path.join(dir, `${city.filename}.svg`);
    const svg = createSVGPlaceholder(city);
    fs.writeFileSync(filepath, svg);

    console.log(`✓ ${city.name}`);
    count++;
  });

  console.log("\n" + "=".repeat(50));
  console.log(`✅ ${count} imagens SVG criadas!`);
  console.log(`📁 Pasta: ${OUTPUT_DIR}/{estado}/{letra}/`);
}

main();
