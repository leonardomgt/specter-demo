import { useMantineTheme, MantineSize } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export function useMatchBreakpoint(breakpoint: MantineSize): boolean {
  const { breakpoints } = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${breakpoints[breakpoint]}px)`);

  return matches;
}
