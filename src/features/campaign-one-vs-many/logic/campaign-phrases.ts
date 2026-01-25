import { CampaignState } from "./state";
import { City } from "../../../utils/ChampionshipManager";

export type CampaignPhraseCategory = 
  | "dominant"    // 70%+ win rate
  | "competitive" // 50-69% win rate  
  | "balanced"    // 30-49% win rate
  | "underdog"    // 0-29% win rate
  | "perfect"     // 100% win rate
  | "struggling"  // 0% win rate
  | "comeback"    // Winning after being behind
  | "collapse";   // Losing after being ahead

export interface CampaignPhrase {
  category: CampaignPhraseCategory;
  text: string;
  emoji: string;
  tone: "celebratory" | "neutral" | "reflective" | "dramatic";
}

export interface CampaignPhraseLibrary {
  phrases: CampaignPhrase[];
  getPhrase: (category: CampaignPhraseCategory) => CampaignPhrase;
  getPhraseForCampaign: (mainCity: City, state: CampaignState) => CampaignPhrase;
}

// Default phrase library for Brazilian city campaigns
export const defaultCampaignPhrases: CampaignPhraseLibrary = {
  phrases: [
    // Dominant campaigns (70%+ win rate)
    {
      category: "dominant",
      text: "Uma campanha histórica! {city} mostrou sua força e dominou a região com autoridade.",
      emoji: "👑",
      tone: "celebratory"
    },
    {
      category: "dominant", 
      text: "Domínio absoluto! {city} provou ser a força máxima do circuito.",
      emoji: "⚡",
      tone: "celebratory"
    },
    
    // Competitive campaigns (50-69% win rate)
    {
      category: "competitive",
      text: "Campanha vitoriosa! {city} enfrentou grandes adversários e saiu fortalecida.",
      emoji: "🏆",
      tone: "celebratory"
    },
    {
      category: "competitive",
      text: "Resultado positivo! {city} mostrou competitividade e conquistou seu espaço.",
      emoji: "💪",
      tone: "neutral"
    },
    
    // Balanced campaigns (30-49% win rate)
    {
      category: "balanced",
      text: "Jornada equilibrada! {city} enfrentou desafios e mostrou resiliência.",
      emoji: "⚖️",
      tone: "neutral"
    },
    {
      category: "balanced",
      text: "Campanha de aprendizado! {city} cresceu com cada batalha enfrentada.",
      emoji: "📈",
      tone: "reflective"
    },
    
    // Underdog campaigns (0-29% win rate)
    {
      category: "underdog",
      text: "Espírito guerreiro! {city} enfrentou gigantes e mostrou coragem.",
      emoji: "🛡️",
      tone: "reflective"
    },
    {
      category: "underdog",
      text: "Jornada de superação! {city} não mediu esforços contra adversários poderosos.",
      emoji: "🔥",
      tone: "dramatic"
    },
    
    // Special cases
    {
      category: "perfect",
      text: "CAMPANHA PERFEITA! {city} venceu TODAS as batalhas em uma demonstração de supremacia absoluta!",
      emoji: "🌟",
      tone: "celebratory"
    },
    {
      category: "struggling",
      text: "Campanha desafiadora! {city} enfrentou adversidades mas nunca desistiu.",
      emoji: "💫",
      tone: "reflective"
    },
    {
      category: "comeback",
      text: "VIrada histórica! {city} se recuperou de derrotas iniciais e terminou com chave de ouro!",
      emoji: "🔄",
      tone: "dramatic"
    },
    {
      category: "collapse",
      text: "Queda dramática! {city} começou bem mas não sustentou o ritmo até o final.",
      emoji: "📉",
      tone: "dramatic"
    }
  ],

  getPhrase: function(category: CampaignPhraseCategory): CampaignPhrase {
    const filtered = this.phrases.filter(p => p.category === category);
    // Return first phrase from the category (deterministic for Remotion)
    // In a real implementation, you might want to use Remotion's random() API
    return filtered[0] || this.phrases[0];
  },

  getPhraseForCampaign: function(mainCity: City, state: CampaignState): CampaignPhrase {
    const totalBattles = state.wins + state.losses + state.ties;
    const winRate = totalBattles > 0 ? (state.wins / totalBattles) * 100 : 0;
    
    // Check for special cases first
    if (winRate === 100 && totalBattles > 0) {
      return this.getPhrase("perfect");
    }
    
    if (winRate === 0 && totalBattles > 0) {
      return this.getPhrase("struggling");
    }
    
    // Check for comeback/collapse based on battle sequence
    if (state.battles.length >= 3) {
      const firstHalf = Math.floor(state.battles.length / 2);
      const secondHalf = state.battles.length - firstHalf;
      
      let firstHalfWins = 0;
      let secondHalfWins = 0;
      
      for (let i = 0; i < firstHalf; i++) {
        if (state.battles[i].result === "win") firstHalfWins++;
      }
      
      for (let i = firstHalf; i < state.battles.length; i++) {
        if (state.battles[i].result === "win") secondHalfWins++;
      }
      
      const firstHalfRate = (firstHalfWins / firstHalf) * 100;
      const secondHalfRate = (secondHalfWins / secondHalf) * 100;
      
      if (firstHalfRate < 30 && secondHalfRate > 70) {
        return this.getPhrase("comeback");
      }
      
      if (firstHalfRate > 70 && secondHalfRate < 30) {
        return this.getPhrase("collapse");
      }
    }
    
    // Standard categories based on win rate
    if (winRate >= 70) return this.getPhrase("dominant");
    if (winRate >= 50) return this.getPhrase("competitive");
    if (winRate >= 30) return this.getPhrase("balanced");
    return this.getPhrase("underdog");
  }
};

// Helper function to format phrase with city name
export function formatCampaignPhrase(phrase: CampaignPhrase, cityName: string): string {
  return phrase.text.replace("{city}", cityName);
}

// Helper function to get formatted phrase for a campaign
export function getFormattedCampaignPhrase(
  mainCity: City, 
  state: CampaignState, 
  library: CampaignPhraseLibrary = defaultCampaignPhrases
): string {
  const phrase = library.getPhraseForCampaign(mainCity, state);
  return formatCampaignPhrase(phrase, mainCity.name);
}

// Create custom phrase library for specific campaigns
export function createCustomCampaignPhrases(customPhrases: CampaignPhrase[]): CampaignPhraseLibrary {
  const baseLibrary = { ...defaultCampaignPhrases };
  baseLibrary.phrases = [...baseLibrary.phrases, ...customPhrases];
  return baseLibrary;
}