import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { useIntersectionObserver } from "src/hooks/useIntersectionObserver";
import { Company } from "src/types";
import { paginate } from "src/utils";

import companies from "../api/companies.json";

// TODO: Remove this at the end. This is just for shrink the dataset for testing purposes.
const data = paginate(companies as Company[], 50, 0);

export function getPage(page_number: number, page_size: number = 10) {
  const page = paginate(data as Company[], page_size, page_number);

  return Promise.resolve(page);
}

export function useCompanies() {
  return useQuery(["companyData"], () => Promise.resolve(data as Company[]));
}

export function useInfiniteCompanies<T extends Element = HTMLElement>() {
  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["companyData"],
    queryFn: ({ pageParam = 0 }) => getPage(pageParam),
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
