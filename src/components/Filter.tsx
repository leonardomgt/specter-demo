/* eslint-disable react-hooks/exhaustive-deps */
import { MultiSelect, RangeSlider, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconFilter, IconSearch } from "@tabler/icons";
import { useCallback, useEffect, useState } from "react";

import { employee_count_max, industries } from "src/api/companies";
import { useRouterParam } from "src/hooks/useRouterParam";
import { nFormatter } from "src/utils";

import styles from "./Filter.module.css";

const Filter = () => {
  const [searchParam, setSearchParam] = useRouterParam("search");
  const [searchInput, setSearchInput] = useState(searchParam);
  const [value] = useDebouncedValue(searchInput, 200);

  useEffect(() => {
    setSearchParam(value);
  }, [value]);

  const [industryFilter, setIndustryFilter] = useRouterParam("industry", true);
  const [employeeCountFilter, setEmployeeCountFilter] = useRouterParam("employee_count", true);

  const [employeeCountValue, setEmployeeCountValue] = useState<[number, number]>(
    (employeeCountFilter?.map((v) => parseInt(v, 10)) as [number, number]) ?? [
      0,
      employee_count_max,
    ]
  );

  const emplToValue = useCallback((v: number) => Math.log10(v) * 100, []);
  const valueToEmpl = useCallback((v: number) => 10 ** (v / 100), []);

  return (
    <aside className={styles.filter}>
      <TextInput
        placeholder="Search"
        icon={<IconSearch size={16} stroke={1.5} />}
        value={searchInput ?? ""}
        onChange={(e) => setSearchInput(e.currentTarget.value)}
      />
      <MultiSelect
        className={styles.industry_filter}
        placeholder="Industry"
        icon={<IconFilter size={16} stroke={1.5} />}
        value={industryFilter ?? []}
        onChange={setIndustryFilter}
        data={Array.from(industries).sort()}
        searchable
        clearable
      />
      <div className={styles.employee_count}>
        <p className={styles.employee_count_label}>Employee count</p>
        <RangeSlider
          w={300}
          value={employeeCountValue?.map(emplToValue) as [number, number]}
          onChange={(v: [number, number]) =>
            setEmployeeCountValue(v.map(valueToEmpl) as [number, number])
          }
          onChangeEnd={(value: [number, number]) => {
            const [min, max] = value.map(valueToEmpl);

            if (min === 0 && max === employee_count_max) {
              setEmployeeCountFilter(null);
            } else {
              setEmployeeCountFilter([min, max].map((v) => Math.round(v).toString()));
            }
          }}
          scale={valueToEmpl}
          color="pink"
          min={0}
          max={emplToValue(employee_count_max)}
          label={(v) => nFormatter(v, 0)}
          marks={[
            { value: 0, label: "1" },
            { value: emplToValue(10), label: "10" },
            { value: emplToValue(100), label: "100" },
            { value: emplToValue(1000), label: "1k" },
            { value: emplToValue(10000), label: "10k" },
          ]}
        />
      </div>
    </aside>
  );
};

export default Filter;
