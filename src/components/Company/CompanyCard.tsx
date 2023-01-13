import { Skeleton } from "@mantine/core";
import cn from "classnames";
import { Link } from "react-router-dom";

import { useMatchBreakpoint } from "src/hooks/useMatchBreakpoint";
import { Company } from "src/types";

import { CompanyBasicInfo } from "./CompanyBasicInfo";
import styles from "./CompanyCard.module.css";
import { CompanyCharts } from "./CompanyCharts";

type CompanyCardProps = {
  company: Company;
};

export function CompanyCard({ company }: CompanyCardProps) {
  const { "Company Name": Name, Rank } = company;

  const isXS = useMatchBreakpoint("xs");
  const isSM = useMatchBreakpoint("sm");
  const isMD = useMatchBreakpoint("md");
  const isLG = useMatchBreakpoint("lg");
  const isXL = useMatchBreakpoint("xl");

  const nCharts = isXL ? 4 : isLG ? 3 : isMD ? 2 : isSM ? 3 : isXS ? 2 : 1;
  return (
    <Link className={cn(styles.card, { [styles.mobile]: !isMD })} to={`/company/${company.Rank}`}>
      <div className={styles.header}>
        <small className={styles.rank}>{Rank}</small>
        <h2 className={styles.title}>{Name}</h2>
      </div>
      <div className={styles.info}>
        <CompanyBasicInfo company={company} vertical />
      </div>
      <div className={styles.charts}>
        <CompanyCharts company={company} limit={nCharts} />
      </div>
    </Link>
  );
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
