import { Skeleton } from "@mantine/core";
import { IconBuildingFactory2, IconMapPin, IconRocket } from "@tabler/icons";
import { Link } from "react-router-dom";

import { Company } from "src/types";

import ChartData from "./ChartData";
import styles from "./CompanyCard.module.css";
import { IconData } from "./IconData";

type CompanyCardProps = {
  company: Company;
};

export function CompanyCard({ company }: CompanyCardProps) {
  const { "Company Name": Name, Rank } = company;

  return (
    <Link className={styles.card} to={`/company/${company.Rank}`}>
      <div className={styles.header}>
        <small className={styles.rank}>{Rank}</small>
        <h2 className={styles.title}>{Name}</h2>
      </div>
      <div className={styles.info}>
        <CompanyBasicInfo company={company} />
      </div>
      <div className={styles.charts}>
        <CompanyCharts company={company} limit={4} />
      </div>
    </Link>
  );
}

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

export const CompanyCardSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <Skeleton className={styles.s_rank} radius="md" />
      <Skeleton className={styles.s_name} radius="md" />
      <Skeleton className={styles.s_info1} radius="md" />
      <Skeleton className={styles.s_info2} radius="md" />
      <Skeleton className={styles.s_info3} radius="md" />
      <Skeleton className={styles.s_chart1} radius="md" />
      <Skeleton className={styles.s_chart2} radius="md" />
      <Skeleton className={styles.s_chart3} radius="md" />
      <Skeleton className={styles.s_chart4} radius="md" />
    </div>
  );
};

export const CompanyBasicInfo = ({ company }: { company: Company }) => {
  const {
    "HQ Location": HQLocation,
    "HQ Region": HQRegion,
    Industry,
    "Founded Date": FoundedDate,
  } = company;

  return (
    <>
      <IconData
        Icon={IconMapPin}
        value={(HQLocation || HQRegion).split(", ").slice(0, 2).join(", ")}
      />
      <IconData Icon={IconBuildingFactory2} value={Industry} />
      <IconData Icon={IconRocket} value={FoundedDate} />
    </>
  );
};

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
