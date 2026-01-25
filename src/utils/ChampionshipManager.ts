export type City = {
    name: string;
    nickname?: string;
    data: Record<string, number>;
    visual: {
        primaryColor: string;
        secondaryColor: string;
        image: string;
    };
};

export type Round = {
    id: string;
    title: string;
    field: string;
    unit: string;
    format: string;
    type: string;
    inverse?: boolean;
};

export type Match = {
    cityA: City;
    cityB: City;
    scoreA: number;
    scoreB: number;
    winner: 'cityA' | 'cityB' | 'tie';
};

export type Standing = {
    city: City;
    points: number;
    matchesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    roundsFor: number;
    roundsAgainst: number;
    roundBalance: number;
};

export class ChampionshipManager {
    name: string;
    cities: City[];
    rounds: Round[];
    matches: Match[] = [];
    standings: Map<string, Standing> = new Map();

    constructor(name: string, cities: City[], rounds: Round[]) {
        this.name = name;
        this.cities = cities;
        this.rounds = rounds;
        this.initializeStandings();
        this.generateMatches();
    }

    private initializeStandings() {
        this.cities.forEach(city => {
            this.standings.set(city.name, {
                city,
                points: 0,
                matchesPlayed: 0,
                wins: 0,
                draws: 0,
                losses: 0,
                roundsFor: 0,
                roundsAgainst: 0,
                roundBalance: 0
            });
        });
    }

    private generateMatches() {
        for (let i = 0; i < this.cities.length; i++) {
            for (let j = i + 1; j < this.cities.length; j++) {
                const cityA = this.cities[i];
                const cityB = this.cities[j];
                const match = this.runMatch(cityA, cityB);
                this.matches.push(match);
                this.updateStandings(match);
            }
        }
    }

    private formatValue(val: number, format: string) {
        if (format === 'compact') return new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(val);
        if (format === 'currency') return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumSignificantDigits: 3 }).format(val);
        if (format === 'percent') return val.toFixed(1);
        return val.toFixed(format === 'decimal3' ? 3 : 1);
    }

    private runMatch(cityA: City, cityB: City): Match {
        let winsA = 0;
        let winsB = 0;

        this.rounds.forEach(round => {
            const vA = cityA.data[round.field];
            const vB = cityB.data[round.field];

            const fA = this.formatValue(vA, round.format);
            const fB = this.formatValue(vB, round.format);

            if (fA === fB) {
                winsA++;
                winsB++;
                return;
            }

            if (round.inverse) {
                if (vA < vB) winsA++;
                else if (vB < vA) winsB++;
            } else {
                if (vA > vB) winsA++;
                else if (vB > vA) winsB++;
            }
        });

        let winner: 'cityA' | 'cityB' | 'tie';
        if (winsA > winsB) winner = 'cityA';
        else if (winsB > winsA) winner = 'cityB';
        else winner = 'tie';

        return {
            cityA,
            cityB,
            scoreA: winsA,
            scoreB: winsB,
            winner
        };
    }

    private updateStandings(match: Match) {
        const sA = this.standings.get(match.cityA.name)!;
        const sB = this.standings.get(match.cityB.name)!;

        sA.matchesPlayed++;
        sB.matchesPlayed++;

        sA.roundsFor += match.scoreA;
        sA.roundsAgainst += match.scoreB;
        sA.roundBalance = sA.roundsFor - sA.roundsAgainst;

        sB.roundsFor += match.scoreB;
        sB.roundsAgainst += match.scoreA;
        sB.roundBalance = sB.roundsFor - sB.roundsAgainst;

        if (match.winner === 'cityA') {
            sA.points += 1; // Vitória = 1 ponto
            sA.wins++;
            sB.losses++;
        } else if (match.winner === 'cityB') {
            sB.points += 1; // Vitória = 1 ponto
            sB.wins++;
            sA.losses++;
        } else {
            // Empate = 0 pontos (conforme regra do usuário)
            sA.draws++;
            sB.draws++;
        }
    }

    getRankings(): Standing[] {
        return Array.from(this.standings.values()).sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            // Critério de desempate: Saldo de Rounds (roundBalance)
            if (b.roundBalance !== a.roundBalance) return b.roundBalance - a.roundBalance;
            return b.wins - a.wins;
        });
    }

    getChampion(): City {
        return this.getRankings()[0].city;
    }

    getChampionCampaign(): Match[] {
        const champion = this.getChampion();
        return this.matches.filter(m => m.cityA.name === champion.name || m.cityB.name === champion.name);
    }
}
