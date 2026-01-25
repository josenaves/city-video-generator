import { CampaignState } from "./state";

export type PacingMultiplier = number;

export function getCampaignPhase(
  index: number,
  total: number,
): "opening" | "midgame" | "endgame" {
  if (index < 1) return "opening"; // First battle
  if (index >= total - 2) return "endgame"; // Last 2 battles
  return "midgame";
}

export function getMomentum(
  state: CampaignState,
): "neutral" | "winning_streak" | "losing_streak" | "comeback" | "collapse" {
  const { wins, losses, lastResult } = state;
  const diff = wins - losses;

  if (!lastResult) return "neutral";

  // Check recent history if possible, but state only tracks totals and lastResult.
  // We can infer streaks simplistically or track history better.
  // Spec says: "Winning streak -> acelera", "Losing streak -> desacelera".
  // Let's rely on 'diff' and 'lastResult' as proxies for now as per previous logic.

  if (lastResult === "win" && diff >= 2) return "winning_streak";
  if (lastResult === "loss" && diff <= -2) return "losing_streak";

  // Comeback: Was losing (or tied/close), now won? Or specifically turning the tide.
  // Spec says: "Comeback -> desacelera + destaque".
  // Let's define comeback as: Last was win, and diff is close to 0 (meaning we were losing).
  if (lastResult === "win" && diff === 0) return "comeback";

  // Collapse: Last was loss, diff close to 0 (meaning we were winning).
  if (lastResult === "loss" && diff === 0) return "collapse";

  return "neutral";
}

// 🔥 DEPRECATED FUNCTION - REPLACED BY CALCULATION IN SCHEDULER
// Legacy function - calculations now done directly in scheduler.ts
