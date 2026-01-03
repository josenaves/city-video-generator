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
import assisBauruData from "./data/assis-bauru.json";
// @ts-ignore
import londrinaMaringaData from "./data/londrina-maringa.json";
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
import barueriSaoCaetanoData from "./data/barueri-sao-caetano-do-sul.json";
// @ts-ignore
import barueriCarapicuibaData from "./data/barueri-carapicuiba.json";
// @ts-ignore
import barueriOsascoData from "./data/barueri-osasco.json";
// @ts-ignore
import barueriSantanaParnaibaData from "./data/barueri-santana-do-parnaiba.json";
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
// @ts-ignore
import mariliaPrudenteData from "./data/marilia-prudente.json";
// @ts-ignore
import goianiaCampoGrandeData from "./data/goiania-campo-grande.json";
// @ts-ignore
import guaxupeTapiratibaData from "./data/guaxupe-tapiratiba.json";
// @ts-ignore
import guaxupeMococaData from "./data/guaxupe-mococa.json";
// @ts-ignore
import pelotasBageData from "./data/pelotas-bage.json";
// @ts-ignore
import pontaPoraDouradosData from "./data/ponta-pora-dourados.json";
// @ts-ignore
import mariliaAssisData from "./data/marilia-assis.json";
// @ts-ignore
import maringaPontaGrossaData from "./data/maringa-ponta-grossa.json";
// @ts-ignore
import pontaGrossaLondrinaData from "./data/ponta-grossa-londrina.json";
// @ts-ignore
import joaoPessoaMaceioData from "./data/joao-pessoa-maceio.json";
// @ts-ignore
import joaoPessoaNatalData from "./data/joao-pessoa-natal.json";
// @ts-ignore
import joaoPessoaRecifeData from "./data/joao-pessoa-recife.json";
// @ts-ignore
import francoDaRochaJundiaiData from "./data/franco-da-rocha-jundiai.json";
// @ts-ignore
import francoDaRochaFranciscoMoratoData from "./data/franco-da-rocha-francisco-morato.json";
// @ts-ignore
import caieirasFrancoDaRochaData from "./data/caieiras-franco-da-rocha.json";
// @ts-ignore
import presidentePrudenteLondrinaData from "./data/presidente-prudente-londrina.json";






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
          image1: "campo-grande.jpg",
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

      {/* New battle Barueri vs São Caetano do Sul */}
      <Composition
        id="BattleBarueriSaoCaetano"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: barueriSaoCaetanoData,
          image1: "barueri.jpg",
          image2: "sao-caetano-do-sul.jpeg",
        }}
      />

      <Composition
        id="BattleBarueriCarapicuiba"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: barueriCarapicuibaData,
          image1: "barueri.jpg",
          image2: "carapicuiba.jpg",
        }}
      />

      <Composition
        id="BattleBarueriOsasco"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: barueriOsascoData,
          image1: "barueri.jpg",
          image2: "osasco.jpg",
        }}
      />
      <Composition
        id="BattleBarueriSantanaParnaiba"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: barueriSantanaParnaibaData,
          image1: "barueri.jpg",
          image2: "santana-do-parnaiba.webp",
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
      <Composition
        id="BattleMariliaPrudente"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: mariliaPrudenteData,
          image1: 'marilia.jpg',
          image2: 'presidente-prudente.jpg',
        }}
      />
      <Composition
        id="BattleGoianiaCampoGrande"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: goianiaCampoGrandeData,
          image1: 'goiania.jpg',
          image2: 'campo-grande.jpg',
        }}
      />
      <Composition
        id="BattleGuaxupeTapiratiba"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: guaxupeTapiratibaData,
          image1: 'guaxupe.jpeg',
          image2: 'tapiratiba.jpg',
        }}
      />
      <Composition
        id="BattleGuaxupeMococa"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: guaxupeMococaData,
          image1: 'guaxupe.jpeg',
          image2: 'mococa.jpg',
        }}
      />
      <Composition
        id="BattleGuaxupeMococaHorizontal"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          battleData: guaxupeMococaData,
          image1: 'guaxupe.jpeg',
          image2: 'mococa.jpg',
        }}
      />
      <Composition
        id="BattlePelotasBage"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: pelotasBageData,
          image1: 'pelotas.png',
          image2: 'bage.webp',
        }}
      />
      <Composition
        id="BattlePontaPoraDourados"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: pontaPoraDouradosData,
          image1: 'ponta-pora.jpg',
          image2: 'dourados.jpg',
        }}
      />
      <Composition
        id="BattleMariliaAssis"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: mariliaAssisData,
          image1: 'marilia.jpg',
          image2: 'assis.jpg',
        }}
      />
      <Composition
        id="BattleAssisBauru"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: assisBauruData,
          image1: 'assis.jpg',
          image2: 'bauru.jpg',
        }}
      />
      <Composition
        id="BattleLondrinaMaringa"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: londrinaMaringaData,
          image1: 'londrina.jpg',
          image2: 'maringa.jpg',
        }}
      />
      <Composition
        id="BattleMaringaPontaGrossa"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: maringaPontaGrossaData,
          image1: 'maringa.jpg',
          image2: 'ponta-grossa.jpeg',
        }}
      />
      <Composition
        id="BattlePontaGrossaLondrina"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: pontaGrossaLondrinaData,
          image1: 'ponta-grossa.jpeg',
          image2: 'londrina.jpg',
        }}
      />
      <Composition
        id="BattleJoaoPessoaMaceio"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: joaoPessoaMaceioData,
          image1: 'joao-pessoa.jpg',
          image2: 'maceio.jpg',
        }}
      />
      <Composition
        id="BattleJoaoPessoaNatal"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: joaoPessoaNatalData,
          image1: 'joao-pessoa.jpg',
          image2: 'natal.jpg',
        }}
      />
      <Composition
        id="BattleJoaoPessoaRecife"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: joaoPessoaRecifeData,
          image1: 'joao-pessoa.jpg',
          image2: 'recife.jpg',
        }}
      />
      <Composition
        id="BattleFrancoDaRochaJundiai"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: francoDaRochaJundiaiData,
          image1: 'franco-da-rocha.jpg',
          image2: 'jundiai.jpg',
        }}
      />
      <Composition
        id="BattleFrancoDaRochaFranciscoMorato"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: francoDaRochaFranciscoMoratoData,
          image1: 'franco-da-rocha.jpg',
          image2: 'francisco-morato.jpg',
        }}
      />
      <Composition
        id="BattleCaieirasFrancoDaRocha"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: caieirasFrancoDaRochaData,
          image1: 'caieiras.jpg',
          image2: 'franco-da-rocha.jpg',
        }}
      />
      <Composition
        id="BattlePresidentePrudenteLondrina"
        component={BattleVideo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: presidentePrudenteLondrinaData,
          image1: 'presidente-prudente.jpg',
          image2: 'londrina.jpg',
        }}
      />
    </>
  );
};