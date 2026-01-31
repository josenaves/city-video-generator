/**
 * Resolvedor de caminhos de imagens com compatibilidade retroativa
 * Suporta tanto caminhos antigos quanto novos
 */

export interface ImageResolution {
  resolvedPath: string;
  source: "new" | "legacy" | "fallback";
}

const STATE_MAP: Record<string, string> = {
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

const KNOWN_LEGACY_PATHS: Record<string, string> = {
  "sao-paulo.jpg": "images/cities/sp/s/sao-paulo.jpg",
  "belo-horizonte.jpg": "images/cities/mg/b/belo-horizonte.jpg",
  "blumenau.jpg": "images/cities/sc/b/blumenau.jpg",
  "campinas.jpg": "images/cities/sp/c/campinas.jpg",
  "curitiba.webp": "images/cities/pr/c/curitiba.webp",
  "rio-de-janeiro.jpg": "images/cities/rj/r/rio-de-janeiro.jpg",
  "florianopolis.jpg": "images/cities/sc/f/florianopolis.jpg",
};

export function resolveCityImagePath(
  originalPath: string,
  state?: string,
): ImageResolution {
  const filename = originalPath.split("/").pop() || originalPath;
  const cityName = filename.replace(/\.(jpg|jpeg|webp|png|svg|avif)$/i, "");

  if (KNOWN_LEGACY_PATHS[filename]) {
    return {
      resolvedPath: KNOWN_LEGACY_PATHS[filename],
      source: "legacy",
    };
  }

  let detectedState = state;
  if (!detectedState) {
    detectedState = STATE_MAP[cityName.toLowerCase()];
  }

  if (detectedState) {
    const letter = filename.charAt(0).toLowerCase();
    const newPath = `images/cities/${detectedState.toLowerCase()}/${letter}/${filename.replace(/\.webp$/, ".jpg").replace(/\.avif$/, ".jpg")}`;

    return {
      resolvedPath: newPath,
      source: "new",
    };
  }

  return {
    resolvedPath: originalPath,
    source: "legacy",
  };
}

export function convertVideoDataToNewPaths(videoData: any): any {
  const newCities = videoData.cities.map((city: any) => {
    const { resolvedPath, source } = resolveCityImagePath(
      city.visual.image,
      city.state,
    );

    return {
      ...city,
      _imageSource: source,
      visual: {
        ...city.visual,
        image: resolvedPath,
      },
    };
  });

  return {
    ...videoData,
    cities: newCities,
  };
}

export function updateJsonFilesWithNewPaths() {
  const fs = require("fs");
  const path = require("path");

  const dataDir = path.join(process.cwd(), "src/data");
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));

  const updated: string[] = [];

  files.forEach((file) => {
    const filepath = path.join(dataDir, file);
    try {
      const content = fs.readFileSync(filepath, "utf-8");
      const data = JSON.parse(content);

      if (data.cities && Array.isArray(data.cities)) {
        const updatedData = convertVideoDataToNewPaths(data);
        fs.writeFileSync(filepath, JSON.stringify(updatedData, null, 2));
        updated.push(file);
      }
    } catch (e) {
      // Skip non-video JSON files
    }
  });

  return {
    updated: updated.length,
    files: updated,
  };
}
