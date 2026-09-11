import path from "path";
import fs from "fs";

export interface CityImageInfo {
  cityName: string;
  state: string;
  legacyPath: string;
  newPath: string;
  exists: boolean;
}

export interface ImageRegistry {
  [state: string]: {
    [letter: string]: string[];
  };
}

const STATE_CODES = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export function getStateFromPath(imagePath: string): string {
  const filename = path.basename(imagePath);

  const knownMappings: Record<string, string> = {
    "belo-horizonte": "MG",
    betim: "MG",
    barbacena: "MG",
    arceburgo: "MG",
    araxa: "MG",
    alfenas: "MG",
    guaxupe: "MG",
    guaranesia: "MG",
    extrema: "MG",
    "poos-de-caldas": "MG",
    varginha: "MG",
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
    bh: "MG",
  };

  const normalizedName = filename
    .toLowerCase()
    .replace(/\.(jpg|jpeg|webp|png|svg)$/, "");

  if (knownMappings[normalizedName]) {
    return knownMappings[normalizedName];
  }

  if (normalizedName.includes("-mg") || normalizedName.endsWith("-mg")) {
    return "MG";
  }
  if (normalizedName.includes("-sc") || normalizedName.endsWith("-sc")) {
    return "SC";
  }
  if (normalizedName.includes("-sp") || normalizedName.endsWith("-sp")) {
    return "SP";
  }
  if (normalizedName.includes("-rs") || normalizedName.endsWith("-rs")) {
    return "RS";
  }

  return "UNKNOWN";
}

export function getFirstLetter(cityName: string): string {
  return cityName.charAt(0).toLowerCase();
}

export function buildNewImagePath(imagePath: string): string {
  const filename = path.basename(imagePath);
  const state = getStateFromPath(imagePath);
  const letter = filename.charAt(0).toLowerCase();
  const cityName = filename.replace(/\.(jpg|jpeg|webp|png|svg)$/, "");

  return `images/cities/${state.toLowerCase()}/${letter}/${cityName}.${getExtension(filename)}`;
}

export function getExtension(filename: string): string {
  const match = filename.match(/\.(jpg|jpeg|webp|png|svg)$/i);
  return match ? match[1].toLowerCase() : "jpg";
}

export function resolveCityImage(
  state: string,
  cityName: string,
  preferredFormat?: string,
): { path: string; exists: boolean } {
  const letter = cityName.charAt(0).toLowerCase();

  const extensions = preferredFormat
    ? [preferredFormat]
    : ["jpg", "jpeg", "webp", "png", "svg"];

  for (const ext of extensions) {
    const newPath = `images/cities/${state.toLowerCase()}/${letter}/${cityName}.${ext}`;
    if (typeof window !== "undefined") {
      return { path: newPath, exists: false };
    }
    try {
      if (fs.existsSync(path.join(process.cwd(), "public", newPath))) {
        return { path: newPath, exists: true };
      }
    } catch {
      return { path: newPath, exists: false };
    }
  }

  const newPath = `images/cities/${state.toLowerCase()}/${letter}/${cityName}.jpg`;
  return { path: newPath, exists: false };
}

export function buildImageRegistry(): ImageRegistry {
  const registry: ImageRegistry = {};

  STATE_CODES.forEach((state) => {
    registry[state] = {};
  });

  return registry;
}

export function migrateImagesToNewStructure() {

  const publicDir = path.join(process.cwd(), "public");
  const newBaseDir = path.join(publicDir, "images/cities");

  const legacyExtensions = [".jpg", ".jpeg", ".webp", ".png"];
  const legacyFiles: string[] = [];

  function scanDir(dir: string) {
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
          scanDir(fullPath);
        }
      } else if (legacyExtensions.includes(path.extname(file).toLowerCase())) {
        const relativePath = path.relative(publicDir, fullPath);
        legacyFiles.push(relativePath);
      }
    });
  }

  scanDir(publicDir);

  const migrationLog: { from: string; to: string; state: string }[] = [];

  legacyFiles.forEach((file) => {
    const filename = path.basename(file);
    const state = getStateFromPath(file);
    const letter = filename.charAt(0).toLowerCase();
    const cityName = filename.replace(/\.(jpg|jpeg|webp|png)$/i, "");

    if (state !== "UNKNOWN") {
      const newDir = path.join(newBaseDir, state.toLowerCase(), letter);
      const newPath = path.join(newDir, filename);

      if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir, { recursive: true });
      }

      const oldFullPath = path.join(publicDir, file);
      if (fs.existsSync(oldFullPath) && !fs.existsSync(newPath)) {
        fs.copyFileSync(oldFullPath, newPath);
        migrationLog.push({
          from: file,
          to: path.join("images/cities", state.toLowerCase(), letter, filename),
          state,
        });
      }
    }
  });

  return {
    migrated: migrationLog.length,
    files: migrationLog,
    summary: `Migrated ${migrationLog.length} images to new structure`,
  };
}

export function generateCityPath(
  state: string,
  cityName: string,
  extension = "jpg",
): string {
  const letter = cityName.charAt(0).toLowerCase();
  return `images/cities/${state.toLowerCase()}/${letter}/${cityName}.${extension}`;
}

export function parseCityPath(
  imagePath: string,
): {
  state: string;
  letter: string;
  cityName: string;
  extension: string;
} | null {
  const match = imagePath.match(
    /^images\/cities\/([A-Z]{2})\/([a-z])\/(.+)\.(jpg|jpeg|webp|png|svg)$/i,
  );
  if (match) {
    return {
      state: match[1].toUpperCase(),
      letter: match[2],
      cityName: match[3],
      extension: match[4].toLowerCase(),
    };
  }
  return null;
}
