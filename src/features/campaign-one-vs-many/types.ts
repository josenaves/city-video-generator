import { City, Round } from '../../utils/ChampionshipManager';

export type CampaignOneVsManyInput = {
    feature: "campaign_one_vs_many";

    mainCity: City;
    opponentCities: City[];
    rounds: Round[];

    sponsorship?: {
        enabled: boolean;
        title?: string;
        items: {
            type: "logo" | "qrcode";
            src: string;
            label?: string;
        }[];
    };

    video: {
        aspectRatio: "16:9";
        title?: string;
        soundtrack: {
            src: string;
            bpm: number;
            offsetBeats?: number;
        };
    };
};
