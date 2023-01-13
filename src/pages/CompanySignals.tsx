import { useInfiniteCompanies } from "src/api/companies";
import { CompanyCard, CompanyCardSkeleton } from "src/components/Company/CompanyCard";
import Filter from "src/components/Filter";
import Header from "src/layout/Header";
import EndOfFeed from "src/layout/components/EndOfFeed";

import styles from "./CompanySignals.module.css";

const CompanySignalsPage = () => {
  const { data, observerRef, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteCompanies<HTMLDivElement>();

  return (
    <>
      <Header />
      <Filter />
      <section className={styles.companies_feed}>
        {isLoading ? (
          <>
            <CompanyCardSkeleton />
            <CompanyCardSkeleton />
            <CompanyCardSkeleton />
          </>
        ) : (
          <>
            {data?.pages.map((page) =>
              page.map((company) => <CompanyCard key={company.Domain} company={company} />)
            )}
            <div ref={observerRef}>
              {isFetchingNextPage && hasNextPage ? <CompanyCardSkeleton /> : <EndOfFeed />}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default CompanySignalsPage;
