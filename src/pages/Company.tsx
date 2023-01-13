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

import styles from "./Company.module.css";

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

export default CompanyPage;
