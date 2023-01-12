import { Badge, Flex, Skeleton, Tooltip } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import { useCompany } from "src/api/companies";
import { CompanyBasicInfo, CompanyCharts } from "src/components/CompanyCard";
import { LabelValue } from "src/components/LabelValue";
import SocialLinks from "src/components/SocialLinks";
import { Company } from "src/types";
import { groupBy } from "src/utils";

import styles from "./Company.module.css";

const infoKeys: (keyof Company)[] = [
  "Founders",
  "Total Funding Amount (in USD)",
  "Last Funding Amount (in USD)",
  "Last Funding Date",
  "Last Funding Type",
  "Number of Funding Rounds",
  "Number of Investors",
  // "Investors",
];

const CompanyPage = () => {
  const { id } = useParams();

  const { data: company, isLoading } = useCompany(id);

  if (!isLoading && !company) {
    return <Navigate replace to="/companies" />;
  }
  return (
    <>
      <header className={styles.header}>
        {!isLoading ? <CompanyPageHeader company={company} /> : <CompanyPageHeaderSkeleton />}
      </header>
      <section className={styles.page}>
        {!isLoading ? <CompanyPageContent company={company} /> : <CompanyPageContentSkeleton />}
      </section>
    </>
  );
};

const CompanyPageHeader = ({ company }: { company: Company }) => {
  const { "Company Name": Name, Rank } = company;

  return (
    <>
      <span className={styles.rank}>{Rank}</span>
      <h1 className={styles.title}>{Name}</h1>
      {Rank && (
        <Tooltip label="Previous">
          <Link to={`/company/${Rank - 1}`}>
            <IconChevronLeft color="#ee4e95" size={40} />
          </Link>
        </Tooltip>
      )}
      <Tooltip label="Next">
        <Link to={`/company/${Rank + 1}`}>
          <IconChevronRight color="#ee4e95" size={40} />
        </Link>
      </Tooltip>
    </>
  );
};

const CompanyPageHeaderSkeleton = () => {
  return (
    <>
      <Skeleton w={50} h={50} radius="md" />
      <Skeleton w={550} h={80} radius="md" mr="auto" />
      <Skeleton w={50} h={50} radius="md" />
      <Skeleton w={50} h={50} radius="md" />
    </>
  );
};

const CompanyPageContentSkeleton = () => {
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

const CompanyPageContent = ({ company }: { company: Company }) => {
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

  return (
    <>
      <div className={styles.basic_info}>
        <CompanyBasicInfo company={company} />
        <SocialLinks company={company} />
      </div>
      <p className={styles.description}>{Description}</p>
      <div className={styles.more_info}>
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

export default CompanyPage;
