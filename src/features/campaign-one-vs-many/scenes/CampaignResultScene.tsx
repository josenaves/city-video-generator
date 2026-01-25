import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  staticFile,
} from "remotion";
import { CampaignState } from "../logic/state";
import { City } from "../../../utils/ChampionshipManager";
import { getFormattedCampaignPhrase } from "../logic/campaign-phrases";

export type CampaignResultSceneProps = {
  mainCity: City;
  state: CampaignState;
  durationInFrames: number;
};

export const CampaignResultScene: React.FC<CampaignResultSceneProps> = ({
  mainCity,
  state,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleScale = interpolate(frame, [10, 40], [0.9, 1], {
    extrapolateRight: "clamp",
  });

  const totalBattles = state.wins + state.losses + state.ties;
  const winRate = totalBattles > 0 ? (state.wins / totalBattles) * 100 : 0;

  // Get dynamic comment from reusable utility
  const dynamicComment = getFormattedCampaignPhrase(mainCity, state);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        opacity,
        fontFamily: "Outfit, sans-serif",
      }}
    >
      {/* Background Image with blur */}
      <img
        src={staticFile(mainCity.visual.image)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.2) blur(8px)",
          position: "absolute",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#FFF",
          padding: "50px",
        }}
      >
        <div style={{ transform: `scale(${titleScale})` }}>
          <h2
            style={{
              fontSize: "40px",
              color: "#AAA",
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "8px",
            }}
          >
            Resultado Final
          </h2>
          <h1
            style={{
              fontSize: "100px",
              margin: "20px 0",
              textShadow: `0 0 40px ${mainCity.visual.primaryColor}`,
              fontWeight: "800",
            }}
          >
            {mainCity.name}
          </h1>
          <div
            style={{
              display: "flex",
              gap: "120px",
              marginTop: "80px",
            }}
          >
            <div
              style={{ fontSize: "30px", color: "#AAA", marginBottom: "10px" }}
            >
              BATALHAS
            </div>
            <div
              style={{
                fontSize: "90px",
                fontWeight: "bold",
                color: "#4CAF50",
                marginBottom: "10px",
              }}
            >
              {totalBattles}
            </div>
            <div
              style={{
                fontSize: "90px",
                fontWeight: "bold",
                color: "#F44336",
                marginBottom: "10px",
              }}
            >
              VITÓRIAS
            </div>
            <div
              style={{
                fontSize: "90px",
                fontWeight: "bold",
                color: "#4CAF50",
                marginBottom: "10px",
              }}
            >
              {state.wins}
            </div>
            <div
              style={{
                fontSize: "90px",
                fontWeight: "bold",
                color: "#F44336",
                marginBottom: "10px",
              }}
            >
              {state.losses}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "100px",
            fontSize: "40px",
            color: "#EEE",
            maxWidth: "800px",
            lineHeight: "1.4",
            fontWeight: "300",
          }}
        >
          {dynamicComment}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
