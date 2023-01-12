/* eslint-disable react-hooks/exhaustive-deps */
import { MultiSelect, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconFilter, IconSearch } from "@tabler/icons";
import { useEffect, useState } from "react";

import { employee_count_range, founded_year_range, industries } from "src/api/companies";
import { useRouterParam } from "src/hooks/useRouterParam";
import { nFormatter } from "src/utils";

import styles from "./Filter.module.css";
import RangeSlider from "./RangeSlider";

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
    (employeeCountFilter?.map((v) => +v) as [number, number]) ?? employee_count_range
  );

  const [foundedYearFilter, setFoundedYearFilter] = useRouterParam("founded_year", true);
  const [foundedYearValue, setFoundedYearValue] = useState<[number, number]>([
    Math.max(+(foundedYearFilter ?? founded_year_range)[0], 1950),
    +(foundedYearFilter ?? founded_year_range)[1],
  ]);

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
      <RangeSlider
        label="Founded year"
        value={foundedYearValue}
        onChange={setFoundedYearValue}
        onChangeEnd={setFoundedYearFilter}
        min={1950}
        openMin={founded_year_range[0]}
        max={founded_year_range[1]}
        marks={[
          { value: 1950, label: "<1950" },
          { value: 2000, label: "2000" },
          { value: 2020, label: "2020" },
        ]}
        labelFormatter={(v) => v.toFixed(0)}
        rangeMinDiff={1}
      />
      <RangeSlider
        label="Employee count"
        value={employeeCountValue}
        onChange={setEmployeeCountValue}
        onChangeEnd={setEmployeeCountFilter}
        min={employee_count_range[0]}
        max={employee_count_range[1]}
        marks={[
          { value: 0, label: "1" },
          { value: 10, label: "10" },
          { value: 100, label: "100" },
          { value: 1000, label: "1k" },
          { value: 10000, label: "10k" },
        ]}
        labelFormatter={(v) => nFormatter(v, 0)}
        logBase={2}
        rangeMinDiff={0.2}
      />
    </aside>
  );
};

export default Filter;
