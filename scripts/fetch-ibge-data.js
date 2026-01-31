/**
 * Script para gerar dados reais do IBGE
 * Uso: node scripts/fetch-ibge-data.js --state=MG --metric=incomePerCapita --order=asc --title="Título" --output=arquivo.json
 */

const fs = require("fs");
const path = require("path");

async function generateRealData(options) {
  const { state, metric, order, title, subtitle, theme, format } = options;

  console.log(`📡 Buscando municípios de ${state} no IBGE...`);

  const response = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
  );

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.statusText}`);
  }

  const municipios = await response.json();
  console.log(`✓ ${municipios.length} municípios encontrados`);

  console.log(`📊 Buscando dados de ${metric} para todos os municípios...`);

  const dadosCompletos = await Promise.all(
    municipios.map(async (mun) => {
      try {
        let metricValue;

        switch (metric) {
          case "idh":
            metricValue = await fetchIDH(mun.id);
            break;
          case "incomePerCapita":
            metricValue = await fetchIncomePerCapita(mun.id);
            break;
          case "population":
            metricValue = await fetchPopulation(mun.id);
            break;
          default:
            metricValue = 0;
        }

        return { ...mun, metricValue };
      } catch (error) {
        console.error(`Erro ao buscar ${metric} para ${mun.nome}:`, error);
        return { ...mun, metricValue: 0 };
      }
    }),
  );

  const filtered = dadosCompletos.filter(
    (m) => m.metricValue !== undefined && m.metricValue !== 0,
  );

  const sorted = filtered.sort((a, b) => {
    const aVal = a.metricValue;
    const bVal = b.metricValue;
    return order === "asc" ? aVal - bVal : bVal - aVal;
  });

  const top10 = sorted.slice(0, 10);

  console.log(`✓ Top 10 cidades identificadas`);

  const cities = top10.map((mun) => ({
    name: mun.nome,
    state: mun.microrregiao.mesorregiao.UF.sigla,
    nickname: "",
    data: {
      population: 0,
      incomePerCapita: 0,
      idh: 0,
      [metric]: mun.metricValue,
    },
    visual: {
      primaryColor: "#3B82F6",
      secondaryColor: "#FFFFFF",
      image: `cities/${mun.nome.toLowerCase().replace(/\s+/g, "-")}.jpg`,
    },
  }));

  return {
    videoId: `top-10-${metric}-${state}-${Date.now()}`,
    title,
    subtitle,
    theme,
    format,
    metric: {
      field: metric,
      title:
        metric === "idh"
          ? "IDH"
          : metric === "incomePerCapita"
            ? "Renda per capita"
            : metric,
      unit: metric === "incomePerCapita" ? "R$" : "",
      format: metric === "idh" ? "decimal" : "compact",
      order,
    },
    cities,
  };
}

async function fetchIDH(municipioId) {
  try {
    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v3/agregados/1098/periodos/2010/variaveis/3022?localidades=${municipioId}`,
    );
    const data = await response.json();
    const value = data[0]?.resultados?.[0]?.series?.[0]?.serie?.["2010"];
    return value ? parseFloat(value) / 10000 : 0;
  } catch {
    return 0;
  }
}

async function fetchIncomePerCapita(municipioId) {
  try {
    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v3/agregados/1219/periodos/2019/variaveis/3024?localidades=${municipioId}`,
    );
    const data = await response.json();
    const value = data[0]?.resultados?.[0]?.series?.[0]?.serie?.["2019"];
    return value ? parseFloat(value) : 0;
  } catch {
    return 0;
  }
}

async function fetchPopulation(municipioId) {
  try {
    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/2019/variaveis/9324?localidades=${municipioId}`,
    );
    const data = await response.json();
    const value = data[0]?.resultados?.[0]?.series?.[0]?.serie?.["2019"];
    return value ? parseInt(value) : 0;
  } catch {
    return 0;
  }
}

function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach((arg) => {
    const [key, value] = arg.split("=");
    const cleanKey = key.replace(/^--/, "");
    args[cleanKey] = value;
  });
  return args;
}

async function main() {
  console.log("🏙️  City Video Generator - Geração de Dados Reais do IBGE\n");

  const args = parseArgs();

  if (!args.state || !args.metric) {
    console.log("❌ Erro: Parâmetros obrigatórios: --state e --metric\n");
    console.log("📋 Uso:");
    console.log(
      '  node scripts/fetch-ibge-data.js --state=MG --metric=incomePerCapita --order=asc --title="Título" --output=arquivo.json\n',
    );
    console.log("📊 Métricas disponíveis:");
    console.log("  - incomePerCapita (renda per capita)");
    console.log("  - idh (Índice de Desenvolvimento Humano)");
    console.log("  - population (população)\n");
    console.log(
      "🌍 Estados: AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SC, SP, SE, TO\n",
    );
    process.exit(1);
  }

  try {
    const dados = await generateRealData({
      state: args.state,
      metric: args.metric,
      order: args.order || "asc",
      title: args.title || "Top 10 Cidades",
      subtitle: args.subtitle || "",
      theme: "elegant-dark",
      format: "vertical",
    });

    const outputPath =
      args.output || `top-10-${args.metric}-${args.state}.json`;
    fs.writeFileSync(
      `src/data/top-10/${outputPath}`,
      JSON.stringify(dados, null, 2),
    );

    console.log("\n✅ Dados gerados com sucesso!");
    console.log(`📁 Arquivo salvo em: src/data/top-10/${outputPath}\n`);
    console.log(`🏆 Top 10 cidades:`);
    dados.cities.forEach((c, i) => {
      const value = c.data[args.metric];
      console.log(`  ${i + 1}. ${c.name} (${c.state}): ${value}`);
    });
    console.log("");
  } catch (error) {
    console.error("❌ Erro ao gerar dados:", error);
    process.exit(1);
  }
}

main();
