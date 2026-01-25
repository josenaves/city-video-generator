// Duration Calculation Verification for jacui-vs-10.json
// ======================================================

// Configuration
const BPM = 85;
const FPS = 30;
const MAX_DURATION_SECONDS = 3 * 60 + 18; // 3:18 = 198 seconds
const MAX_TOTAL_FRAMES = MAX_DURATION_SECONDS * FPS; // 5940 frames

// Helper function
function beatsToFrames(beats: number, bpm: number): number {
    const secondsPerBeat = 60 / bpm;
    const totalSeconds = beats * secondsPerBeat;
    return Math.floor(totalSeconds * FPS);
}

// Base beats (reduced to fit more battles)
const BASE_BEATS = {
    INTRO: 12,
    SPONSORSHIP: 8,
    BATTLE: 20,
    STATUS: 8,
    RESULT: 16,
};

// Calculate for 10 opponents
const numBattles = 10;
const numStatusScenes = numBattles - 1; // 9 status scenes
const sponsorshipEnabled = false;

// Fixed overhead
const introFrames = beatsToFrames(BASE_BEATS.INTRO, BPM);
const resultFrames = beatsToFrames(BASE_BEATS.RESULT, BPM);
const sponsorFrames = sponsorshipEnabled ? beatsToFrames(BASE_BEATS.SPONSORSHIP, BPM) : 0;
const fixedOverhead = introFrames + resultFrames + sponsorFrames;

// Available frames
const availableFrames = MAX_TOTAL_FRAMES - fixedOverhead;

// Distribution (75% battles, 25% status)
const totalBattleFrames = Math.floor(availableFrames * 0.75);
const totalStatusFrames = availableFrames - totalBattleFrames;
const framesPerBattle = Math.floor(totalBattleFrames / numBattles);
const framesPerStatus = Math.floor(totalStatusFrames / numStatusScenes);

// Calculate total
const calculatedTotal =
    introFrames +
    sponsorFrames +
    (framesPerBattle * numBattles) +
    (framesPerStatus * numStatusScenes) +
    resultFrames;

// Results
console.log("=== DURATION CALCULATION VERIFICATION ===\n");
console.log(`Configuration:`);
console.log(`  - BPM: ${BPM}`);
console.log(`  - Max Duration: ${MAX_DURATION_SECONDS}s (${MAX_TOTAL_FRAMES} frames)`);
console.log(`  - Number of Battles: ${numBattles}`);
console.log(`  - Number of Status Scenes: ${numStatusScenes}\n`);

console.log(`Fixed Overhead:`);
console.log(`  - Intro: ${introFrames} frames (${(introFrames / FPS).toFixed(2)}s)`);
console.log(`  - Result: ${resultFrames} frames (${(resultFrames / FPS).toFixed(2)}s)`);
console.log(`  - Sponsor: ${sponsorFrames} frames (${(sponsorFrames / FPS).toFixed(2)}s)`);
console.log(`  - Total Fixed: ${fixedOverhead} frames (${(fixedOverhead / FPS).toFixed(2)}s)\n`);

console.log(`Dynamic Distribution:`);
console.log(`  - Available Frames: ${availableFrames} frames (${(availableFrames / FPS).toFixed(2)}s)`);
console.log(`  - Total Battle Frames (75%): ${totalBattleFrames} frames`);
console.log(`  - Total Status Frames (25%): ${totalStatusFrames} frames`);
console.log(`  - Frames per Battle: ${framesPerBattle} frames (${(framesPerBattle / FPS).toFixed(2)}s)`);
console.log(`  - Frames per Status: ${framesPerStatus} frames (${(framesPerStatus / FPS).toFixed(2)}s)\n`);

console.log(`Total Calculation:`);
console.log(`  - Calculated Total: ${calculatedTotal} frames (${(calculatedTotal / FPS).toFixed(2)}s)`);
console.log(`  - Maximum Allowed: ${MAX_TOTAL_FRAMES} frames (${MAX_DURATION_SECONDS}s)`);
console.log(`  - Difference: ${MAX_TOTAL_FRAMES - calculatedTotal} frames (${((MAX_TOTAL_FRAMES - calculatedTotal) / FPS).toFixed(2)}s)`);
console.log(`  - Status: ${calculatedTotal <= MAX_TOTAL_FRAMES ? '✅ WITHIN LIMIT' : '❌ EXCEEDS LIMIT'}\n`);

console.log(`Per Battle Breakdown:`);
console.log(`  - Battle Intro (15%): ${Math.floor(framesPerBattle * 0.15)} frames`);
console.log(`  - Battle Winner (15%): ${Math.floor(framesPerBattle * 0.15)} frames`);
console.log(`  - Battle Rounds (70%): ${framesPerBattle - Math.floor(framesPerBattle * 0.15) * 2} frames`);
console.log(`  - Frames per Round (6 rounds): ${Math.floor((framesPerBattle - Math.floor(framesPerBattle * 0.15) * 2) / 6)} frames`);
