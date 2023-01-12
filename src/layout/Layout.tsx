import { ReactNode } from "react";

import Filter from "src/components/Filter";

import Header from "./Header";
import styles from "./Layout.module.css";
import SideMenu from "./SideMenu";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <SideMenu />
      <main className={styles.main}>
        <Header />
        <Filter />
        {children}
      </main>
    </>
  );
};

export default Layout;
