import { Drawer } from "@mantine/core";
import cn from "classnames";
import { createContext, ReactNode, useState } from "react";

import { useMatchBreakpoint } from "src/hooks/useMatchBreakpoint";

import styles from "./Layout.module.css";
import SideMenu from "./SideMenu";

type LayoutProps = {
  children: ReactNode;
};
export const SideMenuContext = createContext<[boolean, (value: boolean) => void]>([
  false,
  () => null,
]);

const Layout = ({ children }: LayoutProps) => {
  const isMD = useMatchBreakpoint("md");
  const [opened, setOpened] = useState(false);

  return (
    <SideMenuContext.Provider value={[opened, setOpened]}>
      <div className={cn(styles.layout, { [styles.mobile]: !isMD })}>
        {isMD ? (
          <SideMenu />
        ) : (
          <Drawer opened={opened} onClose={() => setOpened(false)}>
            <SideMenu />
          </Drawer>
        )}
        <main className={styles.main}>{children}</main>
      </div>
    </SideMenuContext.Provider>
  );
};

export default Layout;
