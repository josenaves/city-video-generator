export type BattleRoundFormat = 'number' | 'integer' | 'year' | 'currency' | 'percent' | 'compact' | 'decimal3' | 'decimal';

export interface BattleRoundConfig {
    id: string;
    title: string;
    field: string;
    format: BattleRoundFormat;
    unit: string;
    inverse?: boolean;
}

export interface CityData {
    populacao: number;
    areaKm2: number;
    pibPerCapita: number;
    leitos: number;
    idh: number;
    ensinoSuperior: number;
    fundacao: number;
    frota: number;
    [key: string]: number; // Allow extensibility
}

export interface CityVisual {
    primaryColor: string;
    secondaryColor: string;
    image: string;
}

export interface City {
    ibgeId: string;
    name: string;
    state: string;
    nickname: string;
    data: CityData;
    visual: CityVisual;
}

export interface BattleData {
    matchId: string;
    title: string;
    theme: string;
    timing: {
        beatsPerTransition: number;
    };
    cities: [City, City];
    rounds: BattleRoundConfig[];
}
