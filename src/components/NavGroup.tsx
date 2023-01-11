import styles from "./NavGroup.module.css";

type Props = {
  label: string;
};

const NavGroup = ({ label }: Props) => {
  return <li className={styles.nav_group}>{label}</li>;
};

export default NavGroup;
