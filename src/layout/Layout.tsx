import { ReactNode } from "react";

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
        <aside className={styles.filter_aside}></aside>
        {children}
      </main>
    </>
  );
};

export default Layout;
