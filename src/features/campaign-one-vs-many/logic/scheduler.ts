import { CampaignOneVsManyInput } from "../types";
import { CampaignState } from "../logic/state";
import { orderBattlesForNarrative } from "../logic/narrative";
import { beatsToFrames, snapToBeat, snapDownToBeat } from "../logic/beat";
import { simulateMatch } from "../logic/utils";

// Beats per Scene - Dynamic calculation based on number of battles
const BASE_BEATS = {
  INTRO: 12, // Reduced from 16 to save time
  SPONSORSHIP: 8,
  BATTLE: 20, // Will be dynamically adjusted
  STATUS: 8, // Reduced from 12 to save time
  RESULT: 16, // Reduced from 24 to save time
};

export function calculateCampaignSchedule(props: CampaignOneVsManyInput) {
  const {
    mainCity,
    opponentCities: initialOpponents,
    rounds,
    sponsorship,
    video,
  } = props;
  const bpm = video.soundtrack.bpm;

  // 1. Narrative Reordering
  const opponentCities = orderBattlesForNarrative(
    mainCity,
    initialOpponents,
    rounds,
  );

  // 2. Calculate maximum allowed frames (4:55 = 295s = 8850 frames at 30fps)
  const maxTotalFrames = Math.floor((4 * 60 + 55) * 30); // 8850 frames

  // 3. Calculate fixed overhead
  const introFrames = beatsToFrames(BASE_BEATS.INTRO, bpm);
  const resultFrames = beatsToFrames(BASE_BEATS.RESULT, bpm);
  const sponsorFrames = sponsorship?.enabled ? beatsToFrames(BASE_BEATS.SPONSORSHIP, bpm) : 0;

  // 4. Calculate available frames for battles and status scenes
  const numBattles = opponentCities.length;
  const numStatusScenes = numBattles - 1; // Status between battles, not after last
  const fixedOverhead = introFrames + resultFrames + sponsorFrames;
  const availableFrames = maxTotalFrames - fixedOverhead;

  // 5. Distribute frames (battles get 75%, status gets 25%)
  const totalBattleFrames = Math.floor(availableFrames * 0.75);
  const totalStatusFrames = availableFrames - totalBattleFrames;

  // Snap major units DOWN to beat — rounding up here accumulated over
  // N battles + N-1 status scenes and exceeded maxTotalFrames.
  // Leftover slack is absorbed by the result scene at the end.
  const framesPerBattle = snapDownToBeat(Math.floor(totalBattleFrames / numBattles), bpm);
  const framesPerStatus = numStatusScenes > 0
    ? snapDownToBeat(Math.floor(totalStatusFrames / numStatusScenes), bpm)
    : 0;

  let currentFrame = 0;
  const steps: any[] = [];

  // Initial State
  const state: CampaignState = {
    battles: [],
    wins: 0,
    losses: 0,
    ties: 0,
  };

  // --- Intro Scene ---
  steps.push({
    type: "intro",
    from: currentFrame,
    duration: introFrames,
  });
  currentFrame += introFrames;

  // --- Sponsorship Scene (Optional) ---
  if (sponsorship?.enabled) {
    steps.push({
      type: "sponsorship",
      from: currentFrame,
      duration: sponsorFrames,
    });
    currentFrame += sponsorFrames;
  }

  // --- Battle Loop ---
  opponentCities.forEach((opponent, index) => {
    // Distribute battle frames to sub-scenes and snap each to beat
    const battleIntroFrames = snapToBeat(Math.floor(framesPerBattle * 0.15), bpm);
    const battleWinnerFrames = snapToBeat(Math.floor(framesPerBattle * 0.15), bpm);
    const battleRoundsFrames = framesPerBattle - battleIntroFrames - battleWinnerFrames;
    const battleRoundFrames = snapToBeat(Math.floor(battleRoundsFrames / rounds.length), bpm);

    // Simulate result for state update
    const matchResult = simulateMatch(mainCity, opponent, rounds);

    steps.push({
      type: "battle",
      from: currentFrame,
      duration: framesPerBattle,
      opponent,
      battleProps: {
        introDuration: battleIntroFrames,
        roundDuration: battleRoundFrames,
        finalDuration: battleWinnerFrames,
      },
    });
    currentFrame += framesPerBattle;

    // Update State
    state.battles.push({
      opponent,
      result: matchResult.result,
      scoreA: matchResult.scoreA,
      scoreB: matchResult.scoreB,
    });
    if (matchResult.result === "win") state.wins++;
    else if (matchResult.result === "loss") state.losses++;
    else state.ties++;
    state.lastResult = matchResult.result;

    // --- Status Scene (between battles, not after last) ---
    if (index < opponentCities.length - 1) {
      steps.push({
        type: "status",
        from: currentFrame,
        duration: framesPerStatus,
        stateSnapshot: JSON.parse(JSON.stringify(state)),
      });
      currentFrame += framesPerStatus;
    }
  });

  // --- Result Scene (absorbs rounding slack so total lands exactly on cap) ---
  const resultStep = {
    type: "result",
    from: currentFrame,
    duration: resultFrames,
    finalState: state,
  };
  steps.push(resultStep);
  currentFrame += resultFrames;

  const slack = maxTotalFrames - currentFrame;
  if (slack > 0) {
    resultStep.duration += slack;
    currentFrame += slack;
  }

  // 🔥 FINAL SAFETY CHECK: Ensure we don't exceed maxTotalFrames
  if (currentFrame > maxTotalFrames) {
    console.warn(
      `⚠️  Video duration (${currentFrame} frames) exceeds maximum (${maxTotalFrames} frames). ` +
      `This should not happen with proper calculation. Please review the scheduler logic.`
    );
  }

  return {
    steps,
    totalDuration: Math.min(currentFrame, maxTotalFrames),
    finalState: state,
    opponentCities, // Return reordered opponents
  };
}
