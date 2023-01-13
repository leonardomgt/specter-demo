import { IconArrowDown, IconArrowUp } from "@tabler/icons";
import cn from "classnames";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

import { nFormatter } from "src/utils";

import styles from "./ChartData.module.css";

type Props = {
  label: string;
  data?: {
    entries: { name?: string; value: number }[];
    currentValue: number;
    monthlyValue: number;
  };
  color?: string;
};

function ChartData({ label, data, color = "#8884d8" }: Props) {
  if (!data) return null;

  const { currentValue, monthlyValue, entries } = data;
  const improvementPercentage = (100 * monthlyValue) / currentValue;

  const isSuccess = improvementPercentage >= 0;

  return (
    <div className={styles.container}>
      <h4 className={styles.label}>{label}</h4>
      <div className={styles.content}>
        <span className={styles.currentValue}>{nFormatter(currentValue, 1)}</span>
        <span
          className={cn(styles.monthlyValue, {
            [styles.success]: isSuccess,
          })}
        >
          {isSuccess ? (
            <IconArrowUp size="15px" color="#11993c" />
          ) : (
            <IconArrowDown size="15px" color="#d22020" />
          )}
          {Math.abs(improvementPercentage).toFixed(2)}% last month
        </span>
        <ResponsiveContainer minWidth={100} height={100}>
          <AreaChart className={styles.chart} data={entries}>
            <Area type="monotone" dataKey="value" stroke={color} fill={color} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartData;
