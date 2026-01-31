import "./index.css";
import { Composition } from "remotion";
import { BattleVideo, getDynamicTiming, getTiming } from "./BattleVideo";
import {
  ChampionshipVideo,
  CHAMP_INTRO_DURATION,
  CHAMP_ROUND_DURATION,
  CHAMP_FINAL_DURATION,
  CHAMP_OPENING_DURATION,
  CHAMP_LEADERBOARD_DURATION,
  CHAMP_CHAMPION_DURATION,
  CHAMP_CAMPAIGN_DURATION,
} from "./ChampionshipVideo";

// @ts-ignore
import uberlandiaUberabaData from "./data/uberlandia-uberaba.json";
import {
  CampaignVideo,
  calculateCampaignTotalDuration,
} from "./features/campaign-one-vs-many";
import {
  Top10CidadesVideo,
  calculateTop10Duration,
} from "./features/top-10-cidades/Top10CidadesVideo";

// @ts-ignore
import campaignTestData from "./data/campaign-test.json";

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
import cabreuvaItupevaData from "./data/cabreuva-itupeva.json";
// @ts-ignore
import itupevaLouveiraData from "./data/itupeva-louveira.json";
// @ts-ignore
import vinhedoValinhosData from "./data/vinhedo-valinhos.json";
// @ts-ignore
import tresCoracoesVarginhaData from "./data/tres-coracoes-varginha.json";
// @ts-ignore
import mogiGuacuMogiMirimData from "./data/mogi-guacu-mogi-mirim.json";
// @ts-ignore
import saoJoseDosPinhaisCuritibaData from "./data/sao-jose-dos-pinhais-curitiba.json";
// @ts-ignore
import saoJoseDosPinhaisPontaGrossaData from "./data/sao-jose-dos-pinhais-ponta-grossa.json";
// @ts-ignore
import saoJoseDosPinhaisAraucariaData from "./data/sao-jose-dos-pinhais-araucaria.json";
// @ts-ignore
import joanopolisPiracaiaData from "./data/joanopolis-piracaia.json";
// @ts-ignore
import itapiraEstivaGerbiData from "./data/itapira-estiva-gerbi.json";
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
import guaxupeMuzambinhoData from "./data/guaxupe-muzambinho.json";
// @ts-ignore
import caieirasFrancoDaRochaData from "./data/caieiras-franco-da-rocha.json";
// @ts-ignore
import presidentePrudenteLondrinaData from "./data/presidente-prudente-londrina.json";
// @ts-ignore
import betimContagemData from "./data/betim-contagem.json";
// @ts-ignore
import aiuruocaCaxambuData from "./data/aiuruoca-caxambu.json";
// @ts-ignore
import tombosFariaLemosData from "./data/tombos-faria-lemos.json";
// @ts-ignore
import cacondeTapiratibaData from "./data/caconde-tapiratiba.json";
// @ts-ignore
import campinaGrandeDoSulQuatroBarrasData from "./data/campina-grande-do-sul-quatro-barras.json";
// @ts-ignore
import juruaiaMuzambinhoData from "./data/juruaia-muzambinho.json";
// @ts-ignore
import guaranesiaJuruaiaData from "./data/guaranesia-juruaia.json";
// @ts-ignore
import guaxupeGuaranesiaData from "./data/guaxupe-guaranesia.json";
// @ts-ignore
import cananeiaIlhaCompridaData from "./data/cananeia-ilha-comprida.json";
// @ts-ignore
import gaviaoPeixotoSaoJoseDosCamposData from "./data/gaviao-peixoto-sao-jose-dos-campos.json";
// @ts-ignore
import jundiaiItuData from "./data/jundiai-itu.json";
// @ts-ignore
import uberabaSacramentoData from "./data/uberaba-sacramento.json";
// @ts-ignore
import brusqueBlumenauData from "./data/brusque-blumenau.json";
// @ts-ignore
import varginhaPousoAlegreData from "./data/varginha-pouso-alegre.json";
// @ts-ignore
import aguasDeLindoiaSerraNegraData from "./data/aguas-de-lindoia-serra-negra.json";
// @ts-ignore
import jundiaiIndaiatubaData from "./data/jundiai-indaiatuba.json";
// @ts-ignore
import mococaSaoJoseRioPardoData from "./data/mococa-sao-jose-do-rio-pardo.json";
// @ts-ignore
import santaCruzDoSulLajeadoData from "./data/santa-cruz-do-sul-lajeado.json";
// @ts-ignore
import parintinsSantaremData from "./data/parintins-santarem.json";
// @ts-ignore
import novaRodelasPauloAfonsoData from "./data/nova-rodelas-paulo-afonso.json";
// @ts-ignore
import guaxupeRegiaoData from "./data/guaxupe-regiao-1v10.json";

// @ts-ignore
import caxambuSaoLourencoData from "./data/caxambu-sao-lourenco.json";

// @ts-ignore
import caxambuCampaignData from "./data/caxambu-campaign.json";

// @ts-ignore
import caxambuVs10Data from "./data/caxambu-vs-10.json";

// @ts-ignore
import jacuiVs10Data from "./data/jacui-vs-10.json";

// @ts-expect-error JSON import without type definitions
import mariliaVs10Data from "./data/marilia-vs-10.json";
// @ts-ignore
import tubaraoVs10Data from "./data/tubarao-vs-10.json";

// @ts-ignore
import caxiasDoSulPassoFundoData from "./data/caxias-do-sul-passo-fundo.json";

// @ts-ignore
import caxiasDoSulVs10Data from "./data/caxias-do-sul-vs-10.json";

// @ts-ignore
import tombosRessaquinhaData from "./data/tombos-ressaquinha.json";
// @ts-ignore
import mirassolVotuporangaData from "./data/mirassol-votuporanga.json";
// @ts-ignore
import atibaiaBragancaData from "./data/atibaia-braganca.json";
// @ts-ignore
import alfenasVarginhaData from "./data/alfenas-varginha.json";
// @ts-ignore
import varginhaTresCoracoesData from "./data/varginha-tres-coracoes.json";
// @ts-ignore
import gvIpatingaData from "./data/gv-ipatinga.json";
// @ts-ignore
import recifeOlindaData from "./data/recife-olinda.json";
// @ts-ignore
import juruaiaGuaxupeData from "./data/juruaia-guaxupe.json";

// @ts-expect-error JSON import without type definitions
import top10PopulosasData from "./data/top-10/cidades-mais-populosas.json";

// @ts-expect-error JSON import without type definitions
import top10PobresMinhasData from "./data/top-10/cidades-mais-pobres-minas.json";

// @ts-expect-error JSON import without type definitions
import top10RicasSCData from "./data/top-10/cidades-mais-ricas-santa-catarina.json";

// @ts-expect-error JSON import without type definitions
import top10PobresSCData from "./data/top-10/cidades-mais-pobres-santa-catarina.json";

// Championships
// @ts-ignore
import mogiChampionshipData from "./data/championships/mogi.json";
// @ts-ignore
import oestePaulistaData from "./data/championships/oeste-paulista.json";
// @ts-ignore
import fronteiraMSData from "./data/championships/fronteira-ms.json";
// @ts-ignore
import capitaisSudesteData from "./data/championships/capitais-sudeste.json";

// Each <Composition> is an entry in the sidebar!

const calculateDuration = (
  data: any,
  beatsOverride?: number,
  bpm = 128,
  useDynamicTiming = false,
  isLong = false,
) => {
  if (useDynamicTiming) {
    const timing = getDynamicTiming(data.rounds.length, bpm, isLong);
    return timing.totalFrames;
  }
  const timing = getTiming(
    beatsOverride || data.timing?.beatsPerTransition || 3,
    bpm,
  );
  return timing.intro + data.rounds.length * timing.round + timing.final;
};

const calculateChampionshipDuration = (
  numCities: number,
  numRounds: number,
) => {
  const numMatches = (numCities * (numCities - 1)) / 2;
  const battleDuration =
    CHAMP_INTRO_DURATION +
    numRounds * CHAMP_ROUND_DURATION +
    CHAMP_FINAL_DURATION;
  return (
    CHAMP_OPENING_DURATION +
    numMatches * (battleDuration + CHAMP_LEADERBOARD_DURATION) +
    CHAMP_CHAMPION_DURATION +
    CHAMP_CAMPAIGN_DURATION
  );
};

export const RemotionRoot: React.FC = () => {
  const championships = [
    { id: "ChampionshipMogi", data: mogiChampionshipData },
    { id: "ChampionshipWestPaulista", data: oestePaulistaData },
    { id: "ChampionshipFronteiraMS", data: fronteiraMSData },
    { id: "ChampionshipCapitaisSudeste", data: capitaisSudesteData },
  ];

  return (
    <>
      <Composition
        id="CampaignOneVsManyTest"
        component={CampaignVideo}
        durationInFrames={calculateCampaignTotalDuration(campaignTestData)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={campaignTestData as any}
      />
      <Composition
        id="GuaxupeRegiaoCampaign"
        component={CampaignVideo}
        durationInFrames={calculateCampaignTotalDuration(
          guaxupeRegiaoData as any,
        )}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={guaxupeRegiaoData as any}
      />
      <Composition
        id="CaxambuCampaign"
        component={CampaignVideo}
        durationInFrames={calculateCampaignTotalDuration(caxambuCampaignData)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={caxambuCampaignData as any}
      />
      <Composition
        id="CaxambuVs10Campaign"
        component={CampaignVideo}
        durationInFrames={calculateCampaignTotalDuration(caxambuVs10Data)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={caxambuVs10Data as any}
      />
      <Composition
        id="JacuiVs10Campaign"
        component={CampaignVideo}
        durationInFrames={calculateCampaignTotalDuration(jacuiVs10Data)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={jacuiVs10Data as any}
      />
      <Composition
        id="MariliaVs10Campaign"
        component={CampaignVideo}
        durationInFrames={calculateCampaignTotalDuration(mariliaVs10Data)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={mariliaVs10Data as any}
      />
      <Composition
        id="TubaraoVs10Campaign"
        component={CampaignVideo}
        durationInFrames={calculateCampaignTotalDuration(tubaraoVs10Data)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={tubaraoVs10Data as any}
      />
      <Composition
        id="CaxiasDoSulVs10Campaign"
        component={CampaignVideo}
        durationInFrames={calculateCampaignTotalDuration(caxiasDoSulVs10Data)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={caxiasDoSulVs10Data as any}
      />

      {championships.map((champ) => {
        if (!champ.data || !champ.data.cities || !champ.data.rounds)
          return null;
        return (
          <Composition
            key={champ.id}
            id={champ.id}
            component={ChampionshipVideo}
            durationInFrames={calculateChampionshipDuration(
              champ.data.cities.length,
              champ.data.rounds.length,
            )}
            fps={30}
            width={1920}
            height={1080}
            defaultProps={{
              championshipName: champ.data.name,
              cities: champ.data.cities,
              rounds: champ.data.rounds,
            }}
          />
        );
      })}

      <Composition
        id="BattleUberlandiaUberaba"
        component={BattleVideo}
        durationInFrames={calculateDuration(uberlandiaUberabaData)}
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
        durationInFrames={calculateDuration(campoGrandeCuiabaData)}
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
        durationInFrames={calculateDuration(arceburgoGuaranesiaData)}
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
        durationInFrames={calculateDuration(saoJoseRioPardoMococaData)}
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
        durationInFrames={calculateDuration(jundiaiSorocabaData)}
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
        durationInFrames={calculateDuration(extremaPousoAlegreData)}
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
        durationInFrames={calculateDuration(bauruRibeiraoPretoData)}
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
        durationInFrames={calculateDuration(alfenasGuaxupeData)}
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
        durationInFrames={calculateDuration(lemeArarasData)}
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
        durationInFrames={calculateDuration(santaMariaPelotasData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: santaMariaPelotasData,
          image1: "santa-maria.png",
          image2: "pelotas.png",
        }}
      />
      <Composition
        id="BattleJoinvilleBlumenau"
        component={BattleVideo}
        durationInFrames={calculateDuration(joinvilleBlumenauData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: joinvilleBlumenauData,
          image1: "joinvile.webp",
          image2: "blumenau.jpg",
        }}
      />
      <Composition
        id="BattleItajaiJoinville"
        component={BattleVideo}
        durationInFrames={calculateDuration(itajaiJoinvilleData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: itajaiJoinvilleData,
          image1: "itajai.jpg",
          image2: "joinvile.webp",
        }}
      />
      <Composition
        id="BattleRibeiraoPretoSJRioPreto"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: ribeiraoPretoSJRioPretoData,
          image1: "ribeirao-preto.jpg",
          image2: "sao-jose-do-rio-preto.jpg",
        }}
      />
      <Composition
        id="BattleBauruMarilia"
        component={BattleVideo}
        durationInFrames={calculateDuration(bauruMariliaData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: bauruMariliaData,
          image1: "bauru.jpg",
          image2: "marilia.jpg",
        }}
      />
      <Composition
        id="BattleSaoSebastiaoPassos"
        component={BattleVideo}
        durationInFrames={calculateDuration(saoSebastiaoPassosData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: saoSebastiaoPassosData,
          image1: "sao-sebastiao-do-paraiso.jpeg",
          image2: "passos.jpg",
        }}
      />
      <Composition
        id="BattleFrancaSaoSebastiao"
        component={BattleVideo}
        durationInFrames={calculateDuration(francaSaoSebastiaoData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: francaSaoSebastiaoData,
          image1: "franca.webp",
          image2: "sao-sebastiao-do-paraiso.jpeg",
        }}
      />
      <Composition
        id="BattleTubaraoCriciuma"
        component={BattleVideo}
        durationInFrames={calculateDuration(tubaraoCriciumaData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: tubaraoCriciumaData,
          image1: "tubarao.jpg",
          image2: "criciuma.webp",
        }}
      />
      <Composition
        id="BattleCuritibaCampinas"
        component={BattleVideo}
        durationInFrames={calculateDuration(curitibaCampinasData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: curitibaCampinasData,
          image1: "curitiba.webp",
          image2: "campinas.jpg",
        }}
      />
      <Composition
        id="BattleBarueriItapevi"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: barueriItapeviData,
          image1: "barueri.jpg",
          image2: "itapevi.jpg",
        }}
      />

      {/* New battle Barueri vs São Caetano do Sul */}
      <Composition
        id="BattleBarueriSaoCaetano"
        component={BattleVideo}
        durationInFrames={690}
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
        durationInFrames={690}
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
        durationInFrames={690}
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
        durationInFrames={690}
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
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: portoUniaoUniaoDaVitoriaData,
          image1: "porto-uniao.jpg",
          image2: "uniao-da-vitoria.jpg",
        }}
      />
      <Composition
        id="BattleMococaParaiso"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: mococaParaisoData,
          image1: "mococa.jpg",
          image2: "sao-sebastiao-do-paraiso.jpeg",
        }}
      />
      <Composition
        id="BattleAracajuMaceio"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: aracajuMaceioData,
          image1: "aracaju.jpg",
          image2: "maceio.jpg",
        }}
      />
      <Composition
        id="BattleSantaMariaPassoFundo"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: santaMariaPassoFundoData,
          image1: "santa-maria.png",
          image2: "passo-fundo.webp",
        }}
      />
      <Composition
        id="BattleMuzambinhoArceburgo"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: muzambinhoArceburgoData,
          image1: "muzambinho.jpg",
          image2: "arceburgo.jpg",
        }}
      />
      <Composition
        id="BattleRibeiraoSaoCarlos"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: ribeiraoSaoCarlosData,
          image1: "ribeirao-preto.jpg",
          image2: "sao-carlos.webp",
        }}
      />
      <Composition
        id="BattleMariliaPrudente"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: mariliaPrudenteData,
          image1: "marilia.jpg",
          image2: "presidente-prudente.jpg",
        }}
      />
      <Composition
        id="BattleMariliaPrudenteHorizontal"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          battleData: mariliaPrudenteData,
          image1: "marilia.jpg",
          image2: "presidente-prudente.jpg",
        }}
      />
      <Composition
        id="BattleGoianiaCampoGrande"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: goianiaCampoGrandeData,
          image1: "goiania.jpg",
          image2: "campo-grande.jpg",
        }}
      />
      <Composition
        id="BattleGuaxupeTapiratiba"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: guaxupeTapiratibaData,
          image1: "guaxupe.jpeg",
          image2: "tapiratiba.jpg",
        }}
      />
      <Composition
        id="BattleRecifeOlinda"
        component={BattleVideo}
        durationInFrames={calculateDuration(recifeOlindaData, 2)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: recifeOlindaData,
          image1: "recife.jpg",
          image2: "olinda.webp",
          overrideBeatsPerTransition: 2,
        }}
      />
      <Composition
        id="BattleRecifeOlindaHorizontal"
        component={BattleVideo}
        durationInFrames={calculateDuration(recifeOlindaData)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          battleData: recifeOlindaData,
          image1: "recife.jpg",
          image2: "olinda.webp",
        }}
      />
      <Composition
        id="BattleGuaxupeMococa"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: guaxupeMococaData,
          image1: "guaxupe.jpeg",
          image2: "mococa.jpg",
        }}
      />
      <Composition
        id="BattleGuaxupeMococaHorizontal"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          battleData: guaxupeMococaData,
          image1: "guaxupe.jpeg",
          image2: "mococa.jpg",
        }}
      />
      <Composition
        id="BattlePelotasBage"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: pelotasBageData,
          image1: "pelotas.png",
          image2: "bage.webp",
        }}
      />
      <Composition
        id="BattlePontaPoraDourados"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: pontaPoraDouradosData,
          image1: "ponta-pora.jpg",
          image2: "dourados.jpg",
        }}
      />
      <Composition
        id="BattleMariliaAssis"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: mariliaAssisData,
          image1: "marilia.jpg",
          image2: "assis.jpg",
        }}
      />
      <Composition
        id="BattleAssisBauru"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: assisBauruData,
          image1: "assis.jpg",
          image2: "bauru.jpg",
        }}
      />
      <Composition
        id="BattleLondrinaMaringa"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: londrinaMaringaData,
          image1: "londrina.jpg",
          image2: "maringa.jpg",
        }}
      />
      <Composition
        id="BattleMaringaPontaGrossa"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: maringaPontaGrossaData,
          image1: "maringa.jpg",
          image2: "ponta-grossa.jpeg",
        }}
      />
      <Composition
        id="BattlePontaGrossaLondrina"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: pontaGrossaLondrinaData,
          image1: "ponta-grossa.jpeg",
          image2: "londrina.jpg",
        }}
      />
      <Composition
        id="BattleJoaoPessoaMaceio"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: joaoPessoaMaceioData,
          image1: "joao-pessoa.jpg",
          image2: "maceio.jpg",
        }}
      />
      <Composition
        id="BattleJoaoPessoaNatal"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: joaoPessoaNatalData,
          image1: "joao-pessoa.jpg",
          image2: "natal.jpg",
        }}
      />

      <Composition
        id="BattleCaxiasDoSulPassoFundo"
        component={BattleVideo}
        durationInFrames={calculateDuration(caxiasDoSulPassoFundoData)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          battleData: caxiasDoSulPassoFundoData,
          image1: "caxias-do-sul.jpg",
          image2: "passo-fundo.jpg",
        }}
      />

      <Composition
        id="BattleCaxiasDoSulPassoFundoVertical"
        component={BattleVideo}
        durationInFrames={calculateDuration(caxiasDoSulPassoFundoData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: caxiasDoSulPassoFundoData,
          image1: "caxias-do-sul.jpg",
          image2: "passo-fundo.webp",
        }}
      />
      <Composition
        id="BattleJoaoPessoaRecife"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: joaoPessoaRecifeData,
          image1: "joao-pessoa.jpg",
          image2: "recife.jpg",
        }}
      />
      <Composition
        id="BattleFrancoDaRochaJundiai"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: francoDaRochaJundiaiData,
          image1: "franco-da-rocha.jpg",
          image2: "jundiai.jpg",
        }}
      />
      <Composition
        id="BattleFrancoDaRochaFranciscoMorato"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: francoDaRochaFranciscoMoratoData,
          image1: "franco-da-rocha.jpg",
          image2: "francisco-morato.jpg",
        }}
      />
      <Composition
        id="BattleCaieirasFrancoDaRocha"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: caieirasFrancoDaRochaData,
          image1: "caieiras.jpg",
          image2: "franco-da-rocha.jpg",
        }}
      />
      <Composition
        id="BattlePresidentePrudenteLondrina"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: presidentePrudenteLondrinaData,
          image1: "presidente-prudente.jpg",
          image2: "londrina.jpg",
        }}
      />
      <Composition
        id="BattleGuaxupeMuzambinhoHorizontal"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          battleData: guaxupeMuzambinhoData,
          image1: "guaxupe.jpeg",
          image2: "muzambinho.jpg",
        }}
      />
      <Composition
        id="BattleBetimContagem"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: betimContagemData,
          image1: "betim.jpg",
          image2: "contagem.jpg",
        }}
      />
      <Composition
        id="BattleAiuruocaCaxambu"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: aiuruocaCaxambuData,
          image1: "aiuruoca.jpg",
          image2: "caxambu.jpg",
        }}
      />
      <Composition
        id="BattleTombosFariaLemos"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: tombosFariaLemosData,
          image1: "tombos.jpg",
          image2: "faria-lemos.jpg",
        }}
      />
      <Composition
        id="BattleCacondeTapiratiba"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: cacondeTapiratibaData,
          image1: "caconde.jpg",
          image2: "tapiratiba.jpg",
        }}
      />
      <Composition
        id="BattleCampinaGrandeDoSulQuatroBarras"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: campinaGrandeDoSulQuatroBarrasData,
          image1: "campina-grande-do-sul.jpg",
          image2: "quatro-barras.jpg",
        }}
      />
      <Composition
        id="BattleJuruaiaMuzambinho"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: juruaiaMuzambinhoData,
          image1: "juruaia.jpg",
          image2: "muzambinho.jpg",
        }}
      />
      <Composition
        id="BattleGuaranesiaJuruaia"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: guaranesiaJuruaiaData,
          image1: "guaranesia.jpg",
          image2: "juruaia.jpg",
        }}
      />
      <Composition
        id="BattleGuaxupeGuaranesia"
        component={BattleVideo}
        durationInFrames={calculateDuration(guaxupeGuaranesiaData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: guaxupeGuaranesiaData,
          image1: "guaxupe.jpg",
          image2: "guaranesia.jpg",
        }}
      />
      <Composition
        id="BattleCananeiaIlhaComprida"
        component={BattleVideo}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: cananeiaIlhaCompridaData,
          image1: "cananeia.jpg",
          image2: "ilha-comprida.jpg",
        }}
      />
      <Composition
        id="BattleGaviaoPeixotoSaoJoseDosCampos"
        component={BattleVideo}
        durationInFrames={calculateDuration(gaviaoPeixotoSaoJoseDosCamposData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: gaviaoPeixotoSaoJoseDosCamposData,
          image1: "gaviao-peixoto.jpg",
          image2: "sao-jose-dos-campos.jpg",
        }}
      />
      <Composition
        id="BattleJundiaiItu"
        component={BattleVideo}
        durationInFrames={calculateDuration(jundiaiItuData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: jundiaiItuData,
          image1: "jundiai.jpg",
          image2: "itu.webp",
        }}
      />
      <Composition
        id="BattleUberabaSacramento"
        component={BattleVideo}
        durationInFrames={calculateDuration(uberabaSacramentoData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: uberabaSacramentoData,
          image1: "uberaba.jpg",
          image2: "sacramento.jpg",
        }}
      />
      <Composition
        id="BattleBrusqueBlumenau"
        component={BattleVideo}
        durationInFrames={calculateDuration(brusqueBlumenauData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: brusqueBlumenauData,
          image1: "brusque.jpg",
          image2: "blumenau.jpg",
        }}
      />
      <Composition
        id="BattleVarginhaPousoAlegre"
        component={BattleVideo}
        durationInFrames={calculateDuration(varginhaPousoAlegreData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: varginhaPousoAlegreData,
          image1: "varginha.jpg",
          image2: "pouso-alegre.jpg",
        }}
      />
      <Composition
        id="BattleAguasDeLindoiaSerraNegra"
        component={BattleVideo}
        durationInFrames={calculateDuration(aguasDeLindoiaSerraNegraData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: aguasDeLindoiaSerraNegraData,
          image1: "aguas-de-lindoia.jpg",
          image2: "serra-negra.jpg",
        }}
      />
      <Composition
        id="BattleJundiaiIndaiatuba"
        component={BattleVideo}
        durationInFrames={calculateDuration(jundiaiIndaiatubaData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: jundiaiIndaiatubaData,
          image1: "jundiai.jpg",
          image2: "indaiatuba.jpg",
        }}
      />
      <Composition
        id="BattleGuaxupeMuzambinho"
        component={BattleVideo}
        durationInFrames={calculateDuration(guaxupeMuzambinhoData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: guaxupeMuzambinhoData,
          image1: "guaxupe.jpeg",
          image2: "muzambinho.jpg",
        }}
      />
      <Composition
        id="BattleMococaSaoJoseRioPardo"
        component={BattleVideo}
        durationInFrames={calculateDuration(mococaSaoJoseRioPardoData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: mococaSaoJoseRioPardoData,
          image1: "mococa.jpg",
          image2: "sao-jose-do-rio-pardo.png",
        }}
      />
      <Composition
        id="BattleSantaCruzDoSulLajeado"
        component={BattleVideo}
        durationInFrames={calculateDuration(santaCruzDoSulLajeadoData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: santaCruzDoSulLajeadoData,
          image1: "santa-cruz-do-sul.jpg",
          image2: "lajeado.webp",
        }}
      />

      <Composition
        id="BattleParintinsSantarem"
        component={BattleVideo}
        durationInFrames={calculateDuration(parintinsSantaremData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: parintinsSantaremData,
          image1: "parintins.jpeg",
          image2: "santarem.avif",
        }}
      />
      <Composition
        id="BattleCabreuvaItupeva"
        component={BattleVideo}
        durationInFrames={calculateDuration(cabreuvaItupevaData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: cabreuvaItupevaData,
          image1: "cabreuva.jpg",
          image2: "itupeva.jpg",
        }}
      />
      <Composition
        id="BattleItupevaLouveira"
        component={BattleVideo}
        durationInFrames={calculateDuration(itupevaLouveiraData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: itupevaLouveiraData,
          image1: "itupeva.jpg",
          image2: "louveira.webp",
        }}
      />
      <Composition
        id="BattleVinhedoValinhos"
        component={BattleVideo}
        durationInFrames={calculateDuration(vinhedoValinhosData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: vinhedoValinhosData,
          image1: "vinhedo.jpg",
          image2: "valinhos.webp",
        }}
      />
      <Composition
        id="BattleTresCoracoesVarginha"
        component={BattleVideo}
        durationInFrames={calculateDuration(tresCoracoesVarginhaData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: tresCoracoesVarginhaData,
          image1: "tres-coracoes.webp",
          image2: "varginha.jpg",
        }}
      />
      <Composition
        id="BattleMogiGuacuMogiMirim"
        component={BattleVideo}
        durationInFrames={calculateDuration(mogiGuacuMogiMirimData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: mogiGuacuMogiMirimData,
          image1: "mogi-guacu.jpg",
          image2: "mogi-mirim.jpg",
        }}
      />
      <Composition
        id="BattleSaoJoseDosPinhaisCuritiba"
        component={BattleVideo}
        durationInFrames={calculateDuration(saoJoseDosPinhaisCuritibaData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: saoJoseDosPinhaisCuritibaData,
          image1: "sao-jose-dos-pinhais.jpg",
          image2: "curitiba.webp",
        }}
      />
      <Composition
        id="BattleSaoJoseDosPinhaisPontaGrossa"
        component={BattleVideo}
        durationInFrames={calculateDuration(saoJoseDosPinhaisPontaGrossaData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: saoJoseDosPinhaisPontaGrossaData,
          image1: "sao-jose-dos-pinhais.jpg",
          image2: "ponta-grossa.jpeg",
        }}
      />
      <Composition
        id="BattleSaoJoseDosPinhaisAraucaria"
        component={BattleVideo}
        durationInFrames={calculateDuration(saoJoseDosPinhaisAraucariaData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: saoJoseDosPinhaisAraucariaData,
          image1: "sao-jose-dos-pinhais.jpg",
          image2: "araucaria.jpg",
        }}
      />
      <Composition
        id="BattleJoanopolisPiracaia"
        component={BattleVideo}
        durationInFrames={calculateDuration(joanopolisPiracaiaData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: joanopolisPiracaiaData,
          image1: "joanopolis.jpg",
          image2: "piracaia.jpg",
        }}
      />
      <Composition
        id="BattleItapiraEstivaGerbi"
        component={BattleVideo}
        durationInFrames={calculateDuration(itapiraEstivaGerbiData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: itapiraEstivaGerbiData,
          image1: "itapira.jpg",
          image2: "estiva-gerbi.jpg",
        }}
      />

      <Composition
        id="BattleNovaRodelasPauloAfonso"
        component={BattleVideo}
        durationInFrames={calculateDuration(novaRodelasPauloAfonsoData)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          battleData: novaRodelasPauloAfonsoData,
          image1: "nova-rodelas.jpg",
          image2: "paulo-afonso.webp",
        }}
      />

      <Composition
        id="BattleTombosRessaquinha"
        component={BattleVideo}
        durationInFrames={calculateDuration(tombosRessaquinhaData)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          battleData: tombosRessaquinhaData,
          image1: "tombos.jpg",
          image2: "ressaquinha.jpg",
        }}
      />

      <Composition
        id="BattleMirassolVotuporanga"
        component={BattleVideo}
        durationInFrames={calculateDuration(mirassolVotuporangaData)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          battleData: mirassolVotuporangaData,
          image1: "mirassol.jpg",
          image2: "votuporanga.jpg",
        }}
      />

      <Composition
        id="BattleAtibaiaBraganca"
        component={BattleVideo}
        durationInFrames={calculateDuration(atibaiaBragancaData)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          battleData: atibaiaBragancaData,
          image1: "atibaia.jpg",
          image2: "braganca-paulista.jpg",
        }}
      />

      <Composition
        id="BattleCaxambuSaoLourenco"
        component={BattleVideo}
        durationInFrames={calculateDuration(caxambuSaoLourencoData)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          battleData: caxambuSaoLourencoData,
          image1: "caxambu.jpg",
          image2: "sao-lourenco.jpg",
        }}
      />

      <Composition
        id="BattleAlfenasVarginha"
        component={BattleVideo}
        durationInFrames={calculateDuration(alfenasVarginhaData)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: alfenasVarginhaData,
          image1: "alfenas.jpg",
          image2: "varginha.jpg",
        }}
      />

      <Composition
        id="BattleAlfenasVarginhaHorizontal"
        component={BattleVideo}
        durationInFrames={calculateDuration(alfenasVarginhaData)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          battleData: alfenasVarginhaData,
          image1: "alfenas.jpg",
          image2: "varginha.jpg",
        }}
      />
      <Composition
        id="BattleVarginhaTresCoracoesHorizontal"
        component={BattleVideo}
        durationInFrames={calculateDuration(varginhaTresCoracoesData)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          battleData: varginhaTresCoracoesData,
          image1: "varginha.jpg",
          image2: "tres-coracoes.webp",
        }}
      />
      <Composition
        id="BattleGVIpatingaHorizontal"
        component={BattleVideo}
        durationInFrames={calculateDuration(gvIpatingaData)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          battleData: gvIpatingaData,
          image1: "governador-valadares.jpg",
          image2: "ipatinga.jpg",
        }}
      />
      <Composition
        id="BattleJuruaiaGuaxupe"
        component={BattleVideo}
        durationInFrames={calculateDuration(
          {
            ...juruaiaGuaxupeData,
            rounds: juruaiaGuaxupeData.rounds.filter((r: any) =>
              [
                "populacao",
                "areaKm2",
                "pibPerCapita",
                "idh",
                "esgotamentoSanitario",
              ].includes(r.id),
            ),
          },
          3,
        )}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          battleData: {
            ...juruaiaGuaxupeData,
            rounds: juruaiaGuaxupeData.rounds.filter((r: any) =>
              [
                "populacao",
                "areaKm2",
                "pibPerCapita",
                "idh",
                "esgotamentoSanitario",
              ].includes(r.id),
            ),
          },
          image1: "juruaia.jpg",
          image2: "guaxupe.jpeg",
          overrideBeatsPerTransition: 3,
        }}
      />
      <Composition
        id="BattleJuruaiaGuaxupeHorizontal"
        component={BattleVideo}
        durationInFrames={calculateDuration(
          juruaiaGuaxupeData,
          3,
          85,
          true,
          true,
        )}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          battleData: juruaiaGuaxupeData,
          image1: "juruaia.jpg",
          image2: "guaxupe.jpeg",
          audioTrack: "audio/Come With Us - Nat Keefe & Hot Buttered Rum.mp3",
          bpm: 85,
          useDynamicTiming: true,
          isLong: true,
        }}
      />

      {/* Top 10 Cidades Videos */}
      <Composition
        id="Top10CidadesMaisPopulosas"
        component={Top10CidadesVideo}
        durationInFrames={1260} // 42 seconds for vertical format
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          videoData: top10PopulosasData,
        }}
      />
      <Composition
        id="Top10CidadesMaisPopulosasHorizontal"
        component={Top10CidadesVideo}
        durationInFrames={1950} // 65 seconds for horizontal format
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          videoData: {
            ...top10PopulosasData,
            format: "horizontal",
            videoId: "top-10-cidades-mais-populosas-brasil-horizontal",
          },
        }}
      />

      {/* Top 10 Cidades Mais Pobres de Minas */}
      <Composition
        id="Top10CidadesMaisPobresMinas"
        component={Top10CidadesVideo}
        durationInFrames={1260}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          videoData: top10PobresMinhasData,
        }}
      />
      <Composition
        id="Top10CidadesMaisPobresMinasHorizontal"
        component={Top10CidadesVideo}
        durationInFrames={1950}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          videoData: {
            ...top10PobresMinhasData,
            format: "horizontal",
            videoId: "top-10-cidades-mais-pobres-minas-horizontal",
          },
        }}
      />

      {/* Top 10 Cidades Mais Ricas de Santa Catarina */}
      <Composition
        id="Top10CidadesMaisRicasSC"
        component={Top10CidadesVideo}
        durationInFrames={1260}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          videoData: top10RicasSCData,
        }}
      />
      <Composition
        id="Top10CidadesMaisRicasSCHorizontal"
        component={Top10CidadesVideo}
        durationInFrames={1950}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          videoData: {
            ...top10RicasSCData,
            format: "horizontal",
            videoId: "top-10-cidades-mais-ricas-santa-catarina-horizontal",
          },
        }}
      />

      {/* Top 10 Cidades Mais Pobre de Santa Catarina */}
      <Composition
        id="Top10CidadesMaisPobresSC"
        component={Top10CidadesVideo}
        durationInFrames={1260}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          videoData: top10PobresSCData,
        }}
      />
      <Composition
        id="Top10CidadesMaisPobresSCHorizontal"
        component={Top10CidadesVideo}
        durationInFrames={1950}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          videoData: {
            ...top10PobresSCData,
            format: "horizontal",
            videoId: "top-10-cidades-mais-pobres-santa-catarina-horizontal",
          },
        }}
      />
    </>
  );
};
