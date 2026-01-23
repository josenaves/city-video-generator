import { City, Round } from '../../../utils/ChampionshipManager';

// Simulation is needed for narrative reordering
// This duplicates logic from ChampionshipManager/BattleVideo but for pre-calculation
export function simulateMatch(cityA: City, cityB: City, rounds: Round[]) {
    const formatValue = (val: number, format: string) => {
        // Simple formatting for comparison, assuming consistency with main logic
        if (format === 'compact') return new Intl.NumberFormat('pt-BR', { notation: "compact" }).format(val);
        if (format === 'currency') return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumSignificantDigits: 3 }).format(val);
        if (format === 'percent') return val.toFixed(1);
        return val.toFixed(format === 'decimal3' ? 3 : 1);
    };

    let winsA = 0;
    let winsB = 0;

    rounds.forEach((round) => {
        const vA = cityA.data[round.field];
        const vB = cityB.data[round.field];

        // We simulate visual tie logic
        const fA = formatValue(vA, round.format);
        const fB = formatValue(vB, round.format);

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

    let result: "win" | "loss" | "tie";
    if (winsA > winsB) result = 'win';
    else if (winsB > winsA) result = 'loss';
    else result = 'tie';

    return { result, scoreA: winsA, scoreB: winsB };
}
