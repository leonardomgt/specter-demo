import { ActionIcon } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { useMatchBreakpoint } from "src/hooks/useMatchBreakpoint";

import styles from "./Header.module.css";
import { SideMenuContext } from "./Layout";
import { PAGES } from "./SideMenu";

const Header = () => {
  const location = useLocation();
  const pageName = PAGES.find((page) => page.link === location.pathname)?.label;

  const isMD = useMatchBreakpoint("md");

  const [, setOpened] = useContext(SideMenuContext);

  return (
    <header className={styles.header}>
      {isMD === false && (
        <ActionIcon onClick={() => setOpened(true)} size={40}>
          <IconMenu2 />
        </ActionIcon>
      )}
      <h1 className={styles.title}>{pageName} Signals</h1>
    </header>
  );
};

export default Header;
