import { useLocation } from "react-router-dom";

import styles from "./Header.module.css";
import { PAGES } from "./SideMenu";

const Header = () => {
  const location = useLocation();
  const pageName = PAGES.find((page) => page.link === location.pathname)?.label;

  return (
    <header className={styles.header}>
      <h1>{pageName} Signals</h1>
    </header>
  );
};

export default Header;
