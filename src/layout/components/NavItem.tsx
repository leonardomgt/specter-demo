import { TablerIcon } from "@tabler/icons";
import cn from "classnames";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./NavItem.module.css";

type Props = {
  link: string;
  label: string;
  Icon?: string | TablerIcon;
  iconSize?: string;
};

const NavItem = ({ link, label, Icon, iconSize }: Props) => {
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <li>
      <NavLink to={link} className={cn(styles.nav_link, { [styles.active]: isActive })}>
        {Icon &&
          (typeof Icon === "string" ? (
            <img className={styles.icon} src={Icon} alt={`Nav item: ${label}`} />
          ) : (
            <Icon className={styles.icon} {...(isActive && { color: "#ee4e95" })} size={iconSize} />
          ))}
        <span className={styles.label}>{label}</span>
      </NavLink>
    </li>
  );
};

export default NavItem;
