import { CampaignOneVsManyInput } from '../types';
import { calculateCampaignSchedule } from './scheduler';

export function calculateCampaignTotalDuration(input: CampaignOneVsManyInput): number {
    const { totalDuration } = calculateCampaignSchedule(input);
    return totalDuration;
}
