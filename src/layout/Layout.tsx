import { ReactNode } from "react";

import styles from "./Layout.module.css";
import SideMenu from "./SideMenu";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <SideMenu />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
