import { IconBuildingSkyscraper, IconBulb, IconUsers } from "@tabler/icons";
import { Link } from "react-router-dom";

import logo from "../assets/specter_dark.png";

import styles from "./SideMenu.module.css";
import NavGroup from "./components/NavGroup";
import NavItem from "./components/NavItem";

export const PAGES = [
  {
    label: "Company",
    link: "/companies",
    Icon: IconBuildingSkyscraper,
  },
  {
    label: "Talent",
    link: "/talent",
    Icon: IconUsers,
  },
  {
    label: "Strategic Intelligence",
    link: "/si",
    Icon: IconBulb,
    iconSize: "30px",
  },
];

const SideMenu = () => {
  return (
    <aside className={styles.side_menu}>
      <Link to="/companies" className={styles.logo_link}>
        <img className={styles.logo} src={logo} alt="Specter Logo" />
      </Link>
      <nav>
        <NavGroup label="Signals" />
        <ul className={styles.nav_list}>
          {PAGES.map((page) => (
            <NavItem key={page.label} {...page} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideMenu;
