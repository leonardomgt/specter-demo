import { Badge, Flex, Skeleton } from "@mantine/core";
import cn from "classnames";
import { useMemo } from "react";

import { useMatchBreakpoint } from "src/hooks/useMatchBreakpoint";
import { Company } from "src/types";
import { groupBy } from "src/utils";

import { LabelValue } from "../LabelValue";
import SocialLinks from "../SocialLinks";

import { CompanyBasicInfo } from "./CompanyBasicInfo";
import { CompanyCharts } from "./CompanyCharts";
import styles from "./CompanyPageContent.module.css";

const infoKeys: (keyof Company)[] = [
  "Founders",
  "Total Funding Amount (in USD)",
  "Last Funding Amount (in USD)",
  "Last Funding Date",
  "Last Funding Type",
  "Number of Funding Rounds",
  "Number of Investors",
];

export const CompanyPageContent = ({ company }: { company: Company }) => {
  const { Investors, Description } = company;

  const CurrencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
    []
  );

  const DateFormatter = useMemo(() => new Intl.DateTimeFormat("en-US"), []);

  const investments = Investors.split(", ").map((investment) => {
    const [investor, action] = investment.split(" in ");
    const [market, company] = action.split(" - ");
    return { investor: investor.replace(" investment", ""), market, company };
  });

  const groupedInvestments = groupBy(investments, "market");

  const isLG = useMatchBreakpoint("lg");
  const isSM = useMatchBreakpoint("sm");

  return (
    <>
      <div className={cn(styles.basic_info, { [styles.mobile]: !isLG })}>
        <CompanyBasicInfo company={company} vertical={!isSM} />
        <SocialLinks company={company} />
      </div>
      <p className={cn(styles.description, { [styles.mobile]: !isLG })}>{Description}</p>
      <div className={cn(styles.more_info, { [styles.mobile]: !isLG })}>
        <div className={styles.info}>
          {infoKeys.map((key) => (
            <LabelValue
              key={key}
              label={key}
              value={
                key.includes("in USD")
                  ? CurrencyFormatter.format(company[key])
                  : key.includes("Date")
                  ? DateFormatter.format(new Date(company[key]))
                  : company[key]
              }
            />
          ))}
        </div>
        <div className={styles.investments}>
          <h3>Investments</h3>
          {Object.entries(groupedInvestments).map(([market, investments]) => (
            <>
              <h4>{market}</h4>
              <div key={market} className={styles.investors_list}>
                {investments.map(({ investor }) => (
                  <Badge
                    key={investor}
                    className={styles.investor}
                    size="lg"
                    radius="sm"
                    variant="outline"
                  >
                    {investor}
                  </Badge>
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
      <div className={styles.charts}>
        <CompanyCharts company={company} />
      </div>
    </>
  );
};

export const CompanyPageContentSkeleton = () => {
  return (
    <>
      <Flex gap="md" align="center" justify="space-between">
        <Skeleton w={550} h={50} radius="md" mr="auto" />
        <Skeleton w={200} h={50} radius="md" />
      </Flex>
      <Skeleton w="100%" h={200} radius="md" />
      <Flex gap="md" align="center" justify="space-between">
        <Skeleton w="50%" h={200} radius="md" />
        <Skeleton w="50%" h={200} radius="md" />
      </Flex>
      <Flex gap="md" align="center" justify="space-between">
        <Skeleton w="25%" h={100} radius="md" />
        <Skeleton w="25%" h={100} radius="md" />
        <Skeleton w="25%" h={100} radius="md" />
        <Skeleton w="25%" h={100} radius="md" />
      </Flex>
    </>
  );
};
