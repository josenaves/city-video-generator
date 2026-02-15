
import fs from 'fs';
import path from 'path';

const NEW_DATA_PATH = '/Users/josenaves/Projects/cidades-brasileiras/src/data';
const OUTPUT_DIR = path.join(process.cwd(), '.agent/skills/brazilian_knowledge/resources');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'brazilian-cities-data.json');

// Normalization function
function normalizeCityName(name: string): string {
    return name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .toLowerCase()
        .trim();
}

async function buildData() {
    console.log('Reading states data...');
    const statesData = JSON.parse(fs.readFileSync(path.join(NEW_DATA_PATH, 'estados.json'), 'utf-8'));

    const citiesData = [];
    const statesDir = path.join(NEW_DATA_PATH, 'cidades');
    const stateFolders = fs.readdirSync(statesDir);

    for (const stateFolder of stateFolders) {
        const statePath = path.join(statesDir, stateFolder);
        if (fs.statSync(statePath).isDirectory()) {
            const cityFolders = fs.readdirSync(statePath);
            for (const cityFolder of cityFolders) {
                const cityPath = path.join(statePath, cityFolder);
                if (fs.statSync(cityPath).isDirectory()) {
                    const cityJsonFile = `${cityFolder}.json`;
                    const cityJsonPath = path.join(cityPath, cityJsonFile);
                    if (fs.existsSync(cityJsonPath)) {
                        citiesData.push(JSON.parse(fs.readFileSync(cityJsonPath, 'utf-8')));
                    }
                }
            }
        }
    }


    // Create state map: codigo_uf -> { uf, nome }
    const stateMap = new Map();
    statesData.forEach((state: any) => {
        stateMap.set(state.uf, { uf: state.uf, name: state.nome });
    });

    console.log('Processing cities...');
    const processedCities = citiesData.map((city: any) => {
        const stateInfo = stateMap.get(city.estado);
        const normalized = normalizeCityName(city.nome);

        return {
            ...city,
            name: city.nome,
            normalized: normalized,
            state: stateInfo.name,
            uf: stateInfo.uf,
            initial: normalized.charAt(0)
        };
    });

    // Sort by name for consistency
    processedCities.sort((a: any, b: any) => a.name.localeCompare(b.name));

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    console.log(`Writing ${processedCities.length} cities to ${OUTPUT_FILE}...`);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(processedCities, null, 2));
    console.log('Done!');
}

buildData().catch(console.error);
