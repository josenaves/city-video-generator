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
import jundiaiSorocabaData from "./data/jundiai-sorocaba.json";
// @ts-ignore
import extremaPousoAlegreData from "./data/extrema-pouso-alegre.json";
// @ts-ignore
import bauruRibeiraoPretoData from "./data/bauru-ribeirao-preto.json";
// @ts-ignore
import alfenasGuaxupeData from "./data/alfenas-guaxupe.json";
// @ts-ignore
import lemeArarasData from "./data/leme-araras.json";
// @ts-ignore
import santaMariaPelotasData from "./data/santa-maria-pelotas.json";
// @ts-ignore
import joinvilleBlumenauData from "./data/joinville-blumenau.json";
// @ts-ignore
import itajaiJoinvilleData from "./data/itajai-joinville.json";
// @ts-ignore
import ribeiraoPretoSJRioPretoData from "./data/ribeirao-preto-sj-rio-preto.json";
// @ts-ignore
import bauruMariliaData from "./data/bauru-marilia.json";
// @ts-ignore
import saoSebastiaoPassosData from "./data/sao-sebastiao-passos.json";
// @ts-ignore
import francaSaoSebastiaoData from "./data/franca-sao-sebastiao.json";
// @ts-ignore
import tubaraoCriciumaData from "./data/tubarao-criciuma.json";
// @ts-ignore
import curitibaCampinasData from "./data/curitiba-campinas.json";
// @ts-ignore
import barueriItapeviData from "./data/barueri-itapevi.json";
// @ts-ignore
import portoUniaoUniaoDaVitoriaData from "./data/porto-uniao-uniao-da-vitoria.json";
// @ts-ignore
import mococaParaisoData from "./data/mococa-paraiso.json";
// @ts-ignore
import aracajuMaceioData from "./data/aracaju-maceio.json";
// @ts-ignore
import santaMariaPassoFundoData from "./data/santa-maria-passo-fundo.json";
// @ts-ignore
import muzambinhoArceburgoData from "./data/muzambinho-arceburgo.json";
// @ts-ignore
import ribeiraoSaoCarlosData from "./data/ribeirao-sao-carlos.json";




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

      <Composition
        id="BattleJundiaiSorocaba"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: jundiaiSorocabaData,
          image1: "jundiai.jpg",
          image2: "sorocaba.webp",
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
      <Composition
        id="BattleLemeAraras"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: lemeArarasData,
          image1: "leme.jpeg",
          image2: "araras.jpg",
        }}
      />
      <Composition
        id="BattleSantaMariaPelotas"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: santaMariaPelotasData,
          image1: 'santa-maria.png',
          image2: 'pelotas.png',
        }}
      />
      <Composition
        id="BattleJoinvilleBlumenau"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: joinvilleBlumenauData,
          image1: 'joinvile.webp',
          image2: 'blumenau.jpg',
        }}
      />
      <Composition
        id="BattleItajaiJoinville"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: itajaiJoinvilleData,
          image1: 'itajai.jpg',
          image2: 'joinvile.webp',
        }}
      />
      <Composition
        id="BattleRibeiraoPretoSJRioPreto"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: ribeiraoPretoSJRioPretoData,
          image1: 'ribeirao-preto.jpg',
          image2: 'sao-jose-do-rio-preto.jpg',
        }}
      />
      <Composition
        id="BattleBauruMarilia"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: bauruMariliaData,
          image1: 'bauru.jpg',
          image2: 'marilia.jpg',
        }}
      />
      <Composition
        id="BattleSaoSebastiaoPassos"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: saoSebastiaoPassosData,
          image1: 'sao-sebastiao-do-paraiso.jpeg',
          image2: 'passos.jpg',
        }}
      />
      <Composition
        id="BattleFrancaSaoSebastiao"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: francaSaoSebastiaoData,
          image1: 'franca.webp',
          image2: 'sao-sebastiao-do-paraiso.jpeg',
        }}
      />
      <Composition
        id="BattleTubaraoCriciuma"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: tubaraoCriciumaData,
          image1: 'tubarao.jpg',
          image2: 'criciuma.webp',
        }}
      />
      <Composition
        id="BattleCuritibaCampinas"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: curitibaCampinasData,
          image1: 'curitiba.webp',
          image2: 'campinas.jpg',
        }}
      />
      <Composition
        id="BattleBarueriItapevi"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: barueriItapeviData,
          image1: 'barueri.jpg',
          image2: 'itapevi.jpg',
        }}
      />
      <Composition
        id="BattlePortoUniaoUniaoDaVitoria"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: portoUniaoUniaoDaVitoriaData,
          image1: 'porto-uniao.jpg',
          image2: 'uniao-da-vitoria.jpg',
        }}
      />
      <Composition
        id="BattleMococaParaiso"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: mococaParaisoData,
          image1: 'mococa.jpg',
          image2: 'sao-sebastiao-do-paraiso.jpeg',
        }}
      />
      <Composition
        id="BattleAracajuMaceio"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: aracajuMaceioData,
          image1: 'aracaju.jpg',
          image2: 'maceio.jpg',
        }}
      />
      <Composition
        id="BattleSantaMariaPassoFundo"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: santaMariaPassoFundoData,
          image1: 'santa-maria.png',
          image2: 'passo-fundo.webp',
        }}
      />
      <Composition
        id="BattleMuzambinhoArceburgo"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: muzambinhoArceburgoData,
          image1: 'muzambinho.jpg',
          image2: 'arceburgo.jpg',
        }}
      />
      <Composition
        id="BattleRibeiraoSaoCarlos"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: ribeiraoSaoCarlosData,
          image1: 'ribeirao-preto.jpg',
          image2: 'sao-carlos.webp',
        }}
      />
    </>
  );
};