import { City, Round } from '../../../utils/ChampionshipManager';
import { simulateMatch } from './utils';

type BattleOutcome = {
    opponent: City;
    result: "win" | "loss" | "tie";
};

export function orderBattlesForNarrative(
    mainCity: City,
    opponentCities: City[],
    rounds: Round[]
): City[] {
    // Guardrail: Minimum battles
    if (opponentCities.length < 4) {
        return opponentCities;
    }

    // Pre-process outcomes
    const outcomes: BattleOutcome[] = opponentCities.map(opponent => {
        const { result } = simulateMatch(mainCity, opponent, rounds);
        return { opponent, result };
    });

    // Segment
    const wins = outcomes.filter(b => b.result === "win");
    const losses = outcomes.filter(b => b.result === "loss");
    const ties = outcomes.filter(b => b.result === "tie");

    // Guardrail: Homogeneous results
    if (wins.length <= 1 || losses.length <= 1) {
        return opponentCities;
    }

    // Hero Journey Construction: [Win] -> [Losses/Ties] -> [Wins] -> [Final Wins]

    // 1. Opening Win
    const openingWin = wins.shift()!;

    // 2. Final Wins (Climax) - up to 2
    const finalWinsCount = Math.min(2, wins.length);
    const finalWins = wins.splice(-finalWinsCount);

    // 3. Middle Section: Losses early (Crisis), mixed with Ties
    // Order: Opening Win -> Losses -> Ties -> Remaining Wins -> Final Wins

    const orderedOutcomes = [
        openingWin,
        ...losses,
        ...ties,
        ...wins,
        ...finalWins
    ];

    return orderedOutcomes.map(o => o.opponent);
}
