import { CampaignOneVsManyInput } from '../types';
import { CampaignState } from '../logic/state';
import { getBattlePacing, getCampaignPhase, getMomentum, getPacingMultiplier } from '../logic/pacing';
import { simulateMatch } from '../logic/utils';
import { orderBattlesForNarrative } from '../logic/narrative';
import { beatsToFrames } from '../logic/beat';

// Base Beats per Scene (from Spec)
const BASE_BEATS = {
    INTRO: 16,
    SPONSORSHIP: 8,
    BATTLE: 24,
    STATUS: 12,
    RESULT: 24
};

// We need to calculate the schedule BEFORE rendering because Remotion needs absolute frames
// This function returns the sequence of scenes and the total duration
export function calculateCampaignSchedule(props: CampaignOneVsManyInput) {
    const { mainCity, opponentCities: initialOpponents, rounds, sponsorship, video } = props;
    const bpm = video.soundtrack.bpm;

    // 1. Narrative Reordering
    const opponentCities = orderBattlesForNarrative(mainCity, initialOpponents, rounds);

    let currentFrame = 0;
    const steps: any[] = [];

    // Initial State
    const state: CampaignState = {
        battles: [],
        wins: 0,
        losses: 0,
        ties: 0
    };

    // --- Intro Scene ---
    const introDuration = beatsToFrames(BASE_BEATS.INTRO, bpm);
    steps.push({
        type: 'intro',
        from: currentFrame,
        duration: introDuration
    });
    currentFrame += introDuration;

    // --- Sponsorship Scene (Optional) ---
    if (sponsorship?.enabled) {
        const sponsorDuration = beatsToFrames(BASE_BEATS.SPONSORSHIP, bpm);
        steps.push({
            type: 'sponsorship',
            from: currentFrame,
            duration: sponsorDuration
        });
        currentFrame += sponsorDuration;
    }

    // --- Battle Loop ---
    opponentCities.forEach((opponent, index) => {
        // Calculate Pacing
        const phase = getCampaignPhase(index, opponentCities.length);
        const momentum = getMomentum(state);
        const multiplier = getPacingMultiplier(phase, momentum);

        // Duration Calculation based on Multiplier
        // BattleScene base beats = 24.
        // We assume 24 beats covers the WHOLE battle (Intro + Rounds + Verdict) 
        // OR we might need to split it if BattleScene takes sub-props for internal timing.
        // The Spec says: "Beats base: 24". Let's apply multiplier to this total.
        // Wait, BattleScene reuses existing components which have fixed internal logic usually?
        // No, current BattleScene wrapper takes introDuration, roundDuration, finalDuration.
        // We need to distribute the calculated total battle beats into these 3 parts.

        const totalBattleBeats = Math.round(BASE_BEATS.BATTLE * multiplier);
        const totalBattleFrames = beatsToFrames(totalBattleBeats, bpm);

        // Distribute frames internal to battle (approximate ratios: Intro 20%, Rounds 60%, Final 20%)
        // Rounds length depends on N rounds. 
        // Let's refine distribution:
        // Intro: 4 beats
        // Rounds: Remaining beats
        // Winner: 4 beats
        // If multiplier makes it super short, we scale everything.

        const beatUnit = totalBattleFrames / BASE_BEATS.BATTLE; // frames per base beat equivalent (scaled)
        // Or simpler: just use ratios of the calculated duration

        // Simulating result for state update
        const matchResult = simulateMatch(mainCity, opponent, rounds);

        // Determine internal durations for BattleScene props
        // We ideally want them to be on beats too if possible, but strict alignment of TOTAL is key.
        // Let's split roughly: Intro (4 beats scaled), each Round (equal share of ~16 beats scaled), Winner (4 beats scaled)
        const roundsPartScale = 16 / 24;
        const introPartScale = 4 / 24;
        const winnerPartScale = 4 / 24;

        const battleIntroFrames = Math.round(totalBattleFrames * introPartScale);
        const battleWinnerFrames = Math.round(totalBattleFrames * winnerPartScale);
        const battleRoundsTotalFrames = totalBattleFrames - battleIntroFrames - battleWinnerFrames;
        const battleRoundFrames = Math.round(battleRoundsTotalFrames / rounds.length); // Per round

        // Adjust rounding error in rounds
        const actualTotal = battleIntroFrames + (battleRoundFrames * rounds.length) + battleWinnerFrames;
        const correction = totalBattleFrames - actualTotal;

        steps.push({
            type: 'battle',
            from: currentFrame,
            duration: totalBattleFrames,
            opponent,
            battleProps: {
                introDuration: battleIntroFrames,
                roundDuration: battleRoundFrames,
                finalDuration: battleWinnerFrames + correction // Dump correction in final
            }
        });
        currentFrame += totalBattleFrames;

        // Update State
        state.battles.push({
            opponent,
            result: matchResult.result,
            scoreA: matchResult.scoreA,
            scoreB: matchResult.scoreB
        });
        if (matchResult.result === 'win') state.wins++;
        else if (matchResult.result === 'loss') state.losses++;
        else state.ties++;
        state.lastResult = matchResult.result;

        // --- Status Scene ---
        // Not shown after valid last battle? Spec says "Loop de Campanha", implicit.
        // Usually we show status after every battle to see updated score.
        // Should we show it after the LAST battle? Spec lists CampaignResultScene after the loop.
        // So Status Scene is typically INTERMEDIATE. Maybe skip after the very last one?
        // Let's keep it for pacing unless it feels redundant with Result.
        // Let's skip status after the last battle because Result follows immediately.

        if (index < opponentCities.length - 1) {
            const statusDuration = beatsToFrames(BASE_BEATS.STATUS, bpm);
            steps.push({
                type: 'status',
                from: currentFrame,
                duration: statusDuration,
                stateSnapshot: JSON.parse(JSON.stringify(state)) // Deep copy
            });
            currentFrame += statusDuration;
        }
    });

    // --- Result Scene ---
    const resultDuration = beatsToFrames(BASE_BEATS.RESULT, bpm);
    steps.push({
        type: 'result',
        from: currentFrame,
        duration: resultDuration,
        finalState: state
    });
    currentFrame += resultDuration;

    return { steps, totalDuration: currentFrame, finalState: state, opponentCities }; // Return reordered opponents if needed
}
