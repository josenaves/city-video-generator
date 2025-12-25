import "./index.css";
import { Composition } from "remotion";
import { CityComparison } from "./CityComparison";
import { CityComparisonPortrait } from "./CityComparisonPortrait";
import { BattleCityPortrait } from "./BattleCityPortrait";
import { BattleCampoGrandeCuiaba } from "./BattleCampoGrandeCuiaba";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CityComparison"
        component={CityComparison}
        durationInFrames={1500}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="CityComparisonPortrait"
        component={CityComparisonPortrait}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="BattleCityPortrait"
        component={BattleCityPortrait}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="BattleCampoGrandeCuiaba"
        component={BattleCampoGrandeCuiaba}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
