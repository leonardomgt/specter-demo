/* eslint-disable functional/immutable-data */
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { useIntersectionObserver } from "src/hooks/useIntersectionObserver";
import { useRouterParam } from "src/hooks/useRouterParam";
import { Company } from "src/types";
import { paginate } from "src/utils";

import companies from "../api/companies.json";

// TODO: Remove this at the end. This is just for shrink the dataset for testing purposes.
// const data = paginate(companies as Company[], 50, 0);
const data = companies as Company[];

export const industries = data.reduce((acc, company) => {
  acc.add(company.Industry);
  return acc;
}, new Set<Company["Industry"]>());

const employees_count = data.map((company) => company["Employee Count"]).filter(Boolean);
export const employee_count_range = [Math.min(...employees_count), Math.max(...employees_count)];

const founded_year = data.map((company) => company["Founded Date"]).filter(Boolean);
export const founded_year_range = [Math.min(...founded_year), Math.max(...founded_year)];

export function getPage({
  page_number,
  page_size = 10,
  search = "",
  filters = {},
}: {
  page_number: number;
  page_size?: number;
  search: string | null;
  filters?: Partial<Record<keyof Company, [number, number] | string[]>>;
}) {
  const hasFilters = search || Object.keys(filters).length > 0;
  const filtered = !hasFilters
    ? data
    : data.filter((company) => {
        const filterBarriers = [];

        if (search) {
          const searchLower = search.toLowerCase();

          filterBarriers.push(
            company["Company Name"].toLowerCase().includes(searchLower) ||
              company.Industry.toLowerCase().includes(searchLower)
          );
        }

        filterBarriers.push(
          Object.entries(filters).every(([key, value]) => {
            const companyValue = company[key as keyof Company];

            if (typeof value[0] === "number" && value.length === 2) {
              const [min, max] = value;
              return companyValue >= min && companyValue <= max;
            }

            return (value as string[]).includes(companyValue);
          })
        );

        return filterBarriers.every((barrier) => barrier);
      });

  const page = paginate(filtered, page_size, page_number);

  // TODO: Remove this at the end. This is just to show off the loading state.
  return new Promise<Company[]>((resolve) => {
    setTimeout(() => {
      resolve(page);
    }, 500);
  });
  // return Promise.resolve(page);
}

export function useCompanies() {
  return useQuery(["companyData"], () => Promise.resolve(data as Company[]));
}

export function useInfiniteCompanies<T extends Element = HTMLElement>() {
  const [search] = useRouterParam("search");
  const [industryFilter] = useRouterParam("industry", true);
  const [employeeCountFilter] = useRouterParam("employee_count", true);
  const [foundedYearFilter] = useRouterParam("founded_year", true);

  const filters = {
    ...(industryFilter && { Industry: industryFilter }),
    ...(employeeCountFilter && {
      "Employee Count": employeeCountFilter.map((v) => +v) as [number, number],
    }),
    ...(foundedYearFilter && {
      "Founded Date": foundedYearFilter.map((v) => +v) as [number, number],
    }),
  };

  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["companyData", search, industryFilter, employeeCountFilter, foundedYearFilter],
    queryFn: ({ pageParam = 0 }) => getPage({ page_number: pageParam, search, filters }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.length !== 0 ? nextPage : undefined;
    },
  });

  const observerRef = useIntersectionObserver<T>(() => hasNextPage && fetchNextPage());

  return {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    observerRef,
  };
}
