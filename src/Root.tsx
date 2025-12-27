import "./index.css";
import { Composition } from "remotion";
import { BattleVideo } from "./BattleVideo";

// @ts-ignore
import uberlandiaUberabaData from "./data/uberlandia-uberaba.json";
// @ts-ignore
import campoGrandeCuiabaData from "./data/campo-grande-cuiaba.json";
// @ts-ignore
import arceburgoGuaranesiaData from "./data/arceburgo-guaranesia.json";
// @ts-ignore
import saoJoseRioPardoMococaData from "./data/sao-jose-rio-pardo-mococa.json";
// @ts-ignore
import extremaPousoAlegreData from "./data/extrema-pouso-alegre.json";
// @ts-ignore
import bauruRibeiraoPretoData from "./data/bauru-ribeirao-preto.json";
// @ts-ignore
import alfenasGuaxupeData from "./data/alfenas-guaxupe.json";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BattleUberlandiaUberaba"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: uberlandiaUberabaData,
          image1: "uberlandia.jpg",
          image2: "uberaba.jpg",
        }}
      />

      <Composition
        id="BattleCampoGrandeCuiaba"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: campoGrandeCuiabaData,
          image1: "campo_grande.jpg",
          image2: "cuiaba.jpg",
        }}
      />

      <Composition
        id="BattleArceburgoGuaranesia"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: arceburgoGuaranesiaData,
          image1: "arceburgo.jpg",
          image2: "guaranesia.jpg",
        }}
      />

      <Composition
        id="BattleSaoJoseRioPardoMococa"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: saoJoseRioPardoMococaData,
          image1: "sao-jose-do-rio-pardo.png",
          image2: "mococa.jpg",
        }}
      />

      {/* Horizontal format for YouTube (1920x1080) */}
      <Composition
        id="BattleExtremaPousoAlegre"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          battleData: extremaPousoAlegreData,
          image1: "extrema.jpg",
          image2: "pouso-alegre.jpg",
        }}
      />

      <Composition
        id="BattleBauruRibeiraoPreto"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: bauruRibeiraoPretoData,
          image1: "bauru.jpg",
          image2: "ribeirao-preto.jpg",
        }}
      />
      <Composition
        id="BattleAlfenasGuaxupe"
        component={BattleVideo}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: alfenasGuaxupeData,
          image1: "alfenas.jpg",
          image2: "guaxupe.jpeg",
        }}
      />
    </>
  );
};

