
import fs from 'fs';
import path from 'path';

const STATES_URL = 'https://raw.githubusercontent.com/kelvins/municipios-brasileiros/main/json/estados.json';
const CITIES_URL = 'https://raw.githubusercontent.com/kelvins/municipios-brasileiros/main/json/municipios.json';

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
    console.log('Fetching states data...');
    const statesRes = await fetch(STATES_URL);
    const statesData = await statesRes.json();

    console.log('Fetching cities data...');
    const citiesRes = await fetch(CITIES_URL);
    const citiesData = await citiesRes.json();

    // Create state map: codigo_uf -> { uf, nome }
    const stateMap = new Map();
    statesData.forEach((state: any) => {
        stateMap.set(state.codigo_uf, { uf: state.uf, name: state.nome });
    });

    console.log('Processing cities...');
    const processedCities = citiesData.map((city: any) => {
        const stateInfo = stateMap.get(city.codigo_uf);
        const normalized = normalizeCityName(city.nome);

        return {
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
