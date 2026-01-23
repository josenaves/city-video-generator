import { City } from '../../utils/ChampionshipManager';

export type CampaignBattleResult = "win" | "loss" | "tie";

export type CampaignState = {
    battles: {
        opponent: City;
        result: CampaignBattleResult;
        scoreA: number;
        scoreB: number;
    }[];
    wins: number;
    losses: number;
    ties: number;
    lastResult?: CampaignBattleResult;
};
