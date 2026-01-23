import React, { useMemo } from 'react';
import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import { CampaignOneVsManyInput } from './types';
import { calculateCampaignSchedule } from './logic/scheduler';
import { IntroScene } from './scenes/IntroScene';
import { SponsorshipScene } from './scenes/SponsorshipScene';
import { BattleScene } from './scenes/BattleScene';
import { CampaignStatusScene } from './scenes/CampaignStatusScene';
import { CampaignResultScene } from './scenes/CampaignResultScene';

export const CampaignVideo: React.FC<CampaignOneVsManyInput> = (props) => {
    const { mainCity, rounds, sponsorship, video } = props;

    // Calculate the entire timeline schedule upfront
    // This is deterministic based on props
    const { steps } = useMemo(() => calculateCampaignSchedule(props), [props]);

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            <Audio
                src={staticFile(video.soundtrack.src)}
            // We might need to handle looping if the track is shorter than totalDuration
            // Remotion <Audio> loops by default? No, it doesn't.
            // But for now let's assume track is long enough or we rely on just playing it.
            // If precise looping is needed, we'd need loop props or multiple Audio tags.
            />

            {steps.map((step: any, idx: number) => {
                if (step.type === 'intro') {
                    return (
                        <Sequence key={`intro-${idx}`} from={step.from} durationInFrames={step.duration}>
                            <IntroScene
                                mainCity={mainCity}
                                numOpponents={props.opponentCities.length}
                                durationInFrames={step.duration}
                                title={video.title}
                            />
                        </Sequence>
                    );
                }

                if (step.type === 'sponsorship') {
                    return (
                        <Sequence key={`sponsor-${idx}`} from={step.from} durationInFrames={step.duration}>
                            <SponsorshipScene sponsorship={sponsorship!} durationInFrames={step.duration} />
                        </Sequence>
                    );
                }

                if (step.type === 'battle') {
                    return (
                        <Sequence key={`battle-${idx}`} from={step.from} durationInFrames={step.duration}>
                            <BattleScene
                                cityA={mainCity}
                                cityB={step.opponent}
                                rounds={rounds}
                                introDuration={step.battleProps.introDuration}
                                roundDuration={step.battleProps.roundDuration}
                                finalDuration={step.battleProps.finalDuration}
                            />
                        </Sequence>
                    );
                }

                if (step.type === 'status') {
                    return (
                        <Sequence key={`status-${idx}`} from={step.from} durationInFrames={step.duration}>
                            <CampaignStatusScene
                                mainCity={mainCity}
                                state={step.stateSnapshot}
                                durationInFrames={step.duration}
                            />
                        </Sequence>
                    );
                }

                if (step.type === 'result') {
                    return (
                        <Sequence key={`result-${idx}`} from={step.from} durationInFrames={step.duration}>
                            <CampaignResultScene
                                mainCity={mainCity}
                                state={step.finalState}
                                durationInFrames={step.duration}
                            />
                        </Sequence>
                    );
                }

                return null;
            })}
        </AbsoluteFill>
    );
};
