import { IconBuildingFactory2, IconMapPin } from "@tabler/icons";
import { Link } from "react-router-dom";

import { Company } from "src/types";

import ChartData from "./ChartData";
import styles from "./CompanyCard.module.css";
import { IconData } from "./IconData";

type CompanyCardProps = {
  company: Company;
};

type ChartDefinition = { currentValue: string; points?: string; unit?: string; color?: string };

const CHARTS: ChartDefinition[] = [
  { currentValue: "Employee Count", points: "Employees", color: "#ee4e95" },
  { currentValue: "Web Visits", color: "#fcc301" },
  { currentValue: "LinkedIn", unit: "Followers", color: "#0077b5" },
  { currentValue: "Twitter", unit: "Followers", color: "#1DA1F2" },
];

export function CompanyCard({ company }: CompanyCardProps) {
  const {
    "Company Name": Name,
    Rank,
    "HQ Location": HQLocation,
    "HQ Region": HQRegion,
    Industry,
  } = company;

  return (
    <Link className={styles.card} to="/company">
      <div className={styles.header}>
        <small className={styles.rank}>{Rank}</small>
        <h2 className={styles.title}>{Name}</h2>
      </div>
      <div className={styles.info}>
        <IconData
          Icon={IconMapPin}
          value={(HQLocation || HQRegion).split(", ").slice(0, 2).join(", ")}
        />
        <IconData Icon={IconBuildingFactory2} value={Industry} />
      </div>

      <div className={styles.charts}>
        {CHARTS.map((chart) => (
          <ChartData
            key={chart.currentValue}
            label={`${chart.currentValue}${chart.unit ? ` (${chart.unit})` : ""}`}
            data={getChartData(company, chart)}
            color={chart.color}
          />
        ))}
      </div>
      {/* <ChartData label="Employee Count" data={data} /> */}

      {/* <LabelValue label="Founded Date" value={company["Founded Date"]} stacked /> */}
    </Link>
  );
}

function getChartData(company: Company, chart: ChartDefinition, nPoints: number = 6) {
  const { currentValue: currentValueKey, points = currentValueKey, unit = "" } = chart;
  console.warn(`${currentValueKey}${unit ? `- ${unit}` : ""}`);

  const currentValue = company[`${currentValueKey}${unit ? ` - ${unit}` : ""}` as keyof Company];

  const getMonthValue = (i: number) => {
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
