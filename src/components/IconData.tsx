import { TablerIcon } from "@tabler/icons";

import styles from "./IconData.module.css";

type Props = {
  Icon: TablerIcon;
  value: string | number;
};
export function IconData({ Icon, value }: Props) {
  return (
    <div className={styles.container}>
      <>
        <Icon className={styles.icon} />
        <p>{value}</p>
      </>
    </div>
  );
}
