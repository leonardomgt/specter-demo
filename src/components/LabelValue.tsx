import cn from "classnames";

import styles from "./LabelValue.module.css";

type Props = {
  label: string;
  value: string | number;
  stacked?: boolean;
};
export function LabelValue({ label, value, stacked }: Props) {
  return (
    <div className={cn(styles.container, { [styles.horizontal]: stacked })}>
      <span className={styles.label}>{label}</span>
      <p className={styles.value}>{value}</p>
    </div>
  );
}
