import { RangeSlider as RangeSliderComponent, RangeSliderProps } from "@mantine/core";
import { useCallback } from "react";

import { logBaseN } from "src/utils";

import styles from "./RangeSlider.module.css";

type Props = {
  label: string;
  value: [number, number];
  scale?: (value: number) => number;
  onChange?: (value: [number, number]) => void;
  onChangeEnd?: (value: [string, string] | null) => void;
  min: number;
  max: number;
  color?: RangeSliderProps["color"];
  marks?: RangeSliderProps["marks"];
  labelFormatter?: (value: number) => React.ReactNode;
  logBase?: number;
  rangeMinDiff?: number;
  openMin?: number;
  openMax?: number;
};

const RangeSlider = ({
  label,
  value,
  onChange,
  onChangeEnd,
  min,
  max,
  color = "pink",
  marks,
  labelFormatter,
  rangeMinDiff = 1,
  logBase,
  openMin = min,
  openMax = max,
}: Props) => {
  const encode = useCallback(
    (v: number) => (logBase ? logBaseN(v, logBase) : v) * (10 / rangeMinDiff),
    [logBase, rangeMinDiff]
  );
  const decode = useCallback(
    (v: number) => (logBase ? logBase ** (v / (10 / rangeMinDiff)) : v / (10 / rangeMinDiff)),
    [logBase, rangeMinDiff]
  );

  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>
      <RangeSliderComponent
        w={300}
        value={value?.map(encode) as [number, number]}
        onChange={(v: [number, number]) => onChange?.(v.map(decode) as [number, number])}
        onChangeEnd={(value: [number, number]) => {
          const [newMin, newMax] = value.map(decode);

          if (min === newMin && max === newMax) {
            onChangeEnd?.(null);
          } else {
            onChangeEnd?.(
              [min === newMin ? openMin : newMin, max === newMax ? openMax : newMax].map((v) =>
                Math.round(v).toString()
              ) as [string, string]
            );
          }
        }}
        scale={decode}
        color={color}
        {...(min && { min: encode(min) })}
        {...(max && { max: encode(max) })}
        {...(labelFormatter && {
          label: (v: number) => {
            if (v === min && openMin !== min) return `<${min}`;
            if (v === max && openMax !== max) return `>${max}`;
            return labelFormatter?.(v);
          },
        })}
        marks={marks?.map((mark) => ({ ...mark, value: encode(mark.value) }))}
      />
    </div>
  );
};

export default RangeSlider;
