import { Top10CidadesData, Top10Cidade } from "../types";

interface IBGEResponse {
  id: number;
  nome: string;
  microrregiao: {
    mesorregiao: {
      UF: {
        sigla: string;
        nome: string;
      };
    };
  };
}

interface GenerateOptions {
  state: string;
  metric: "population" | "idh" | "incomePerCapita" | "povertyRate";
  order: "asc" | "desc";
  title: string;
  subtitle: string;
  theme: "elegant-dark" | "clean-modern" | "gradient-burst" | "data-focused";
  format: "vertical" | "horizontal";
}

export async function generateRealData(
  options: GenerateOptions,
): Promise<Top10CidadesData> {
  const { state, metric, order, title, subtitle, theme, format } = options;

  console.log(`📡 Buscando municípios de ${state} no IBGE...`);

  const response = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
  );

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.statusText}`);
  }

  const municipios: IBGEResponse[] = await response.json();
  console.log(`✓ ${municipios.length} municípios encontrados`);

  console.log(`📊 Buscando dados de ${metric} para todos os municípios...`);

  const dadosCompletos: (IBGEResponse & { metricValue?: number })[] =
    await Promise.all(
      municipios.map(async (mun) => {
        try {
          let metricValue: number | undefined;

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
            case "povertyRate":
              metricValue = await fetchPovertyRate(mun.id);
              break;
          }

          return { ...mun, metricValue };
        } catch (error) {
          console.error(`Erro ao buscar ${metric} para ${mun.nome}:`, error);
          return { ...mun, metricValue: undefined };
        }
      }),
    );

  const filtered = dadosCompletos.filter(
    (m) => m.metricValue !== undefined && m.metricValue !== null,
  );

  const sorted = filtered.sort((a, b) => {
    const aVal = a.metricValue!;
    const bVal = b.metricValue!;
    return order === "asc" ? aVal - bVal : bVal - aVal;
  });

  const top10 = sorted.slice(0, 10);

  console.log(`✓ Top 10 cidades identificadas`);

  const cities: Top10Cidade[] = top10.map((mun, index) => ({
    name: mun.nome,
    state: mun.microrregiao.mesorregiao.UF.sigla,
    nickname: "",
    data: {
      population: 0,
      incomePerCapita: 0,
      idh: 0,
      povertyRate: 0,
      [metric]: mun.metricValue!,
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
      title: getMetricTitle(metric),
      unit: getMetricUnit(metric),
      format: getMetricFormat(metric),
      order,
    },
    cities,
  };
}

async function fetchIDH(municipioId: number): Promise<number> {
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

async function fetchIncomePerCapita(municipioId: number): Promise<number> {
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

async function fetchPopulation(municipioId: number): Promise<number> {
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

async function fetchPovertyRate(municipioId: number): Promise<number> {
  try {
    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v3/agregados/2019/periodos/2010/variaveis/3024?localidades=${municipioId}`,
    );
    const data = await response.json();
    const value = data[0]?.resultados?.[0]?.series?.[0]?.serie?.["2010"];
    return value ? parseFloat(value) : 0;
  } catch {
    return 0;
  }
}

function getMetricTitle(metric: string): string {
  const titles: Record<string, string> = {
    population: "População",
    idh: "IDH",
    incomePerCapita: "Renda per capita",
    povertyRate: "Taxa de pobreza",
  };
  return titles[metric] || metric;
}

function getMetricUnit(metric: string): string {
  const units: Record<string, string> = {
    population: "hab",
    idh: "",
    incomePerCapita: "R$",
    povertyRate: "%",
  };
  return units[metric] || "";
}

function getMetricFormat(
  metric: string,
): "compact" | "currency" | "number" | "decimal" | "percent" {
  const formats: Record<
    string,
    "compact" | "currency" | "number" | "decimal" | "percent"
  > = {
    population: "compact",
    idh: "decimal",
    incomePerCapita: "currency",
    povertyRate: "percent",
  };
  return formats[metric] || "number";
}

export function getBrazilianStates(): string[] {
  return [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];
}

export function getAvailableMetrics(): string[] {
  return ["population", "idh", "incomePerCapita", "povertyRate"];
}
