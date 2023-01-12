import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type RouteValue<Multi> = (Multi extends true ? string[] : string) | null;

export function useRouterParam<Multi extends boolean = false>(
  param: string,
  multiValue: Multi = false as Multi
): [RouteValue<Multi>, (newValue: RouteValue<Multi>) => void] {
  const { search } = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(search).get(param);
  const value = multiValue ? params?.split(",") ?? null : params;

  const setValue = useCallback(
    (newValue: RouteValue<Multi>) => {
      const newParams = new URLSearchParams(search);

      if (!newValue || newValue.length === 0) newParams.delete(param);
      else if (multiValue) newParams.set(param, (newValue as string[]).join(","));
      else newParams.set(param, newValue as string);

      navigate(`?${newParams.toString()}`);
    },
    [param, search, navigate, multiValue]
  );

  return [value as RouteValue<Multi>, setValue];
}
