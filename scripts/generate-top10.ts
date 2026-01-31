import { generateRealData } from "../src/features/top-10-cidades/utils/real-data-generator";

async function main() {
  console.log("🏙️  Gerando dados reais do IBGE...\n");

  // Exemplo: Cidades mais pobres de Minas Gerais
  const dados = await generateRealData({
    state: "MG",
    metric: "incomePerCapita",
    order: "asc",
    title: "As 10 CIDADES MAIS POBRES de Minas Gerais",
    subtitle: "Ranking 2024 - Menor renda per capita",
    theme: "elegant-dark",
    format: "vertical",
  });

  console.log("\n✅ Dados gerados com sucesso!");
  console.log(JSON.stringify(dados, null, 2));
}

main().catch(console.error);
