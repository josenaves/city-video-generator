import React, { useMemo } from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { ChampionshipManager, City, Round, Standing } from './utils/ChampionshipManager';
import { ChampionshipOpening, ChampionshipLeaderboard, ChampionshipChampion, ChampionshipCampaign } from './components/ChampionshipComponents';
import { BattleIntro } from './components/BattleIntro';
import { BattleRound } from './components/BattleRound';
import { BattleWinner } from './components/BattleWinner';
import { framesPerBeat } from './BattleVideo';

type ChampionshipVideoProps = {
    championshipName: string;
    cities: City[];
    rounds: Round[];
};

// Strict pace for Championship to fit 2:47 music (5010 frames)
// Calculation for 4 cities (6 matches) and 6 rounds:
// 12 + 6 * (4 + 6*6 + 4 + 8) + 14 + 18 = 356 beats = 5006 frames = 2:46.8
export const CHAMP_INTRO_DURATION = Math.round(framesPerBeat * 4);
export const CHAMP_ROUND_DURATION = Math.round(framesPerBeat * 6);
export const CHAMP_FINAL_DURATION = Math.round(framesPerBeat * 4);

export const CHAMP_OPENING_DURATION = Math.round(framesPerBeat * 12);
export const CHAMP_LEADERBOARD_DURATION = Math.round(framesPerBeat * 8);
export const CHAMP_CHAMPION_DURATION = Math.round(framesPerBeat * 14);
export const CHAMP_CAMPAIGN_DURATION = Math.round(framesPerBeat * 18);

export const ChampionshipVideo: React.FC<ChampionshipVideoProps> = ({ championshipName, cities, rounds }) => {
    // 1. Initialize Championship logic
    const manager = useMemo(() => new ChampionshipManager(championshipName, cities, rounds), [championshipName, cities, rounds]);

    // 2. Pre-calculate matches and standings for EACH step of the championship
    // We want to show the leaderboard AFTER each match with the cumulative results up to that point.
    const championshipSteps = useMemo(() => {
        const steps: any[] = [];

        // Reset matches to run them one by one and record standings
        // Re-initialize standings

        // Internal method to re-run matches one by one to capture incremental standings
        // We'll use the already generated matches from the real manager but calculate standings step by step
        const allMatches = manager.matches;
        const incrementalStandings: Map<string, Standing> = new Map();
        cities.forEach(c => incrementalStandings.set(c.name, {
            city: c, points: 0, matchesPlayed: 0, wins: 0, draws: 0, losses: 0, roundsFor: 0, roundsAgainst: 0, roundBalance: 0
        }));

        allMatches.forEach((match) => {
            // Update incremental standings
            const sA = incrementalStandings.get(match.cityA.name)!;
            const sB = incrementalStandings.get(match.cityB.name)!;

            sA.matchesPlayed++;
            sB.matchesPlayed++;
            sA.roundsFor += match.scoreA;
            sA.roundsAgainst += match.scoreB;
            sA.roundBalance = sA.roundsFor - sA.roundsAgainst;
            sB.roundsFor += match.scoreB;
            sB.roundsAgainst += match.scoreA;
            sB.roundBalance = sB.roundsFor - sB.roundsAgainst;

            if (match.winner === 'cityA') {
                sA.points += 1;
                sA.wins++;
                sB.losses++;
            } else if (match.winner === 'cityB') {
                sB.points += 1;
                sB.wins++;
                sA.losses++;
            } else {
                sA.draws++;
                sB.draws++;
            }

            steps.push({
                match,
                standings: Array.from(incrementalStandings.values())
                    .map(s => ({ ...s }))
                    .sort((a, b) => {
                        if (b.points !== a.points) return b.points - a.points;
                        return b.roundBalance - a.roundBalance;
                    })
            });
        });

        return steps;
    }, [manager, cities]);

    const battleDuration = CHAMP_INTRO_DURATION + (rounds.length * CHAMP_ROUND_DURATION) + CHAMP_FINAL_DURATION;

    let currentFrame = 0;

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            <Audio src={staticFile('audio/Beat Your Competition - Vibe Tracks.mp3')} volume={0.5} />

            {/* Opening Scene */}
            <Sequence from={currentFrame} durationInFrames={CHAMP_OPENING_DURATION}>
                <ChampionshipOpening name={championshipName} cities={cities.map(c => c.name)} />
            </Sequence>
            {currentFrame += CHAMP_OPENING_DURATION}

            {/* Battle Loop */}
            {championshipSteps.map((step, stepIndex) => {
                const { match, standings } = step;
                const battleStart = currentFrame;

                const battleContent = (
                    <>
                        {/* 1. Battle Intro */}
                        <Sequence durationInFrames={CHAMP_INTRO_DURATION}>
                            <BattleIntro
                                city1Name={match.cityA.name}
                                city2Name={match.cityB.name}
                                city1Nickname={match.cityA.nickname}
                                city2Nickname={match.cityB.nickname}
                                image1={staticFile(match.cityA.visual.image)}
                                image2={staticFile(match.cityB.visual.image)}
                            />
                        </Sequence>

                        {/* 2. Rounds */}
                        {rounds.map((round, roundIndex) => (
                            <Sequence
                                key={round.id}
                                from={CHAMP_INTRO_DURATION + (roundIndex * CHAMP_ROUND_DURATION)}
                                durationInFrames={CHAMP_ROUND_DURATION}
                            >
                                <BattleRound
                                    title={round.title}
                                    city1Name={match.cityA.name}
                                    city2Name={match.cityB.name}
                                    city1Value={match.cityA.data[round.field]}
                                    city2Value={match.cityB.data[round.field]}
                                    city1Color={match.cityA.visual.primaryColor}
                                    city2Color={match.cityB.visual.primaryColor}
                                    unit={round.unit}
                                    format={round.format}
                                    type={round.type}
                                    inverse={round.inverse}
                                    backgroundImage1={staticFile(match.cityA.visual.image)}
                                    backgroundImage2={staticFile(match.cityB.visual.image)}
                                />
                            </Sequence>
                        ))}

                        {/* 3. Battle Winner */}
                        <Sequence
                            from={CHAMP_INTRO_DURATION + (rounds.length * CHAMP_ROUND_DURATION)}
                            durationInFrames={CHAMP_FINAL_DURATION}
                        >
                            <BattleWinner
                                winnerName={match.winner === 'tie' ? 'EMPATE' : (match.winner === 'cityA' ? match.cityA.name : match.cityB.name)}
                                winnerColor={match.winner === 'tie' ? '#FFFFFF' : (match.winner === 'cityA' ? match.cityA.visual.primaryColor : match.cityB.visual.primaryColor)}
                                score={`${match.scoreA} x ${match.scoreB}`}
                                backgroundImage1={staticFile(match.cityA.visual.image)}
                                backgroundImage2={staticFile(match.cityB.visual.image)}
                                result={match.winner === 'cityA' ? 'city1' : (match.winner === 'cityB' ? 'city2' : 'tie')}
                            />
                        </Sequence>
                    </>
                );

                const currentBattleSequence = (
                    <Sequence key={`battle-${stepIndex}`} from={battleStart} durationInFrames={battleDuration}>
                        {battleContent}
                    </Sequence>
                );

                currentFrame += battleDuration;

                const currentLeaderboardSequence = (
                    <Sequence key={`leaderboard-${stepIndex}`} from={currentFrame} durationInFrames={CHAMP_LEADERBOARD_DURATION}>
                        <ChampionshipLeaderboard standings={standings} title={`CLASSIFICAÇÃO - JOGO ${stepIndex + 1}`} />
                    </Sequence>
                );

                currentFrame += CHAMP_LEADERBOARD_DURATION;

                return (
                    <React.Fragment key={`step-${stepIndex}`}>
                        {currentBattleSequence}
                        {currentLeaderboardSequence}
                    </React.Fragment>
                );
            })}

            {/* Final Scenes */}
            <Sequence from={currentFrame} durationInFrames={CHAMP_CHAMPION_DURATION}>
                <ChampionshipChampion city={manager.getChampion()} />
            </Sequence>
            {currentFrame += CHAMP_CHAMPION_DURATION}

            <Sequence from={currentFrame} durationInFrames={CHAMP_CAMPAIGN_DURATION}>
                <ChampionshipCampaign city={manager.getChampion()} matches={manager.getChampionCampaign()} />
            </Sequence>
        </AbsoluteFill>
    );
};
