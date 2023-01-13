import { Company } from "src/types";

import ChartData from "../ChartData";

type ChartDefinition = { currentValue: string; points?: string; unit?: string; color?: string };

const CHARTS: ChartDefinition[] = [
  { currentValue: "Employee Count", points: "Employees", color: "#ee4e95" },
  { currentValue: "Web Visits", color: "#fcc301" },
  { currentValue: "LinkedIn", unit: "Followers", color: "#0077b5" },
  { currentValue: "Twitter", unit: "Followers", color: "#1DA1F2" },
  { currentValue: "Instagram", unit: "Followers", color: "#C13584" },
  { currentValue: "Google Play", unit: "Reviews", color: "#0F9D58" },
  { currentValue: "iTunes", unit: "Reviews", color: "#000" },
];

export const CompanyCharts = ({
  company,
  limit = CHARTS.length,
}: {
  company: Company;
  limit?: number;
}) => {
  const chartsData = CHARTS.map((chart) => ({
    data: getChartData(company, chart),
    chart,
  })).filter(({ data }) => !!data);

  return (
    <>
      {chartsData.slice(0, limit).map(({ data, chart }) => (
        <ChartData
          key={chart.currentValue}
          label={`${chart.currentValue}${chart.unit ? ` (${chart.unit})` : ""}`}
          data={data}
          color={chart.color}
        />
      ))}
    </>
  );
};

function getChartData(company: Company, chart: ChartDefinition, nPoints: number = 6) {
  const { currentValue: currentValueKey, points = currentValueKey, unit = "" } = chart;

  const currentValue: number =
    company[`${currentValueKey}${unit ? ` - ${unit}` : ""}` as keyof Company];

  if (!currentValue) return;

  const getMonthValue = (i: number): number => {
    let monthIdx = `${i + 1} Months`;

    if (i === 0) monthIdx = "Monthly";
    const key = `${points} - ${monthIdx} ${unit ? `${unit} ` : ""}Growth`;
    const value = company[key as keyof Company];

    return value;
  };

  const baseValue = getMonthValue(nPoints - 1);

  const data = [...new Array(nPoints)].map((_, i) => {
    const monthValue = getMonthValue(i);

    return { value: baseValue - monthValue };
  });

  return {
    currentValue,
    monthlyValue: getMonthValue(0),
    entries: [{ value: baseValue }, ...data].reverse(),
  };
}
