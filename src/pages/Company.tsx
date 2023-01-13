import cn from "classnames";
import { Navigate, useParams } from "react-router-dom";

import { useCompany } from "src/api/companies";
import {
  CompanyPageContent,
  CompanyPageContentSkeleton,
} from "src/components/Company/CompanyPageContent";
import {
  CompanyPageHeader,
  CompanyPageHeaderSkeleton,
} from "src/components/Company/CompanyPageHeader";
import { useMatchBreakpoint } from "src/hooks/useMatchBreakpoint";

import styles from "./Company.module.css";

const CompanyPage = () => {
  const { id } = useParams();

  const { data: company, isLoading } = useCompany(id);
  const isXS = useMatchBreakpoint("xs");

  if (!isLoading && !company) {
    return <Navigate replace to="/companies" />;
  }

  return (
    <>
      <header className={cn(styles.header, { [styles.mobile]: !isXS })}>
        {!isLoading ? <CompanyPageHeader company={company} /> : <CompanyPageHeaderSkeleton />}
      </header>
      <section className={cn(styles.page, { [styles.mobile]: !isXS })}>
        {!isLoading ? <CompanyPageContent company={company} /> : <CompanyPageContentSkeleton />}
      </section>
    </>
  );
};

export default CompanyPage;
