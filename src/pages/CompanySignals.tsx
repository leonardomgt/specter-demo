import { useInfiniteCompanies } from "src/api/companies";
import { CompanyCard } from "src/components/CompanyCard";

import styles from "./CompanySignals.module.css";

const CompanySignalsPage = () => {
  const { data, observerRef, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteCompanies<HTMLDivElement>();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles.companies_feed}>
      {data?.pages.map((page) =>
        page.map((company) => <CompanyCard key={company.Domain} company={company} />)
      )}
      <div ref={observerRef}>
        {isFetchingNextPage && hasNextPage ? "Loading..." : "No search left"}
      </div>
    </section>
  );
};

export default CompanySignalsPage;
