export function paginate<T>(array: T[], page_size: number, page_number: number) {
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
}

export const nFormatter = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((item) => {
      return num >= item.value;
    });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
};

export const logBaseN = (n: number, base: number) => {
  return Math.log(n) / Math.log(base);
};

export const groupBy = <T extends Record<string, any>>(arr: T[], prop: string) =>
  arr.reduce((acc, val) => {
    // eslint-disable-next-line functional/immutable-data
    (acc[val[prop]] = acc[val[prop]] || []).push(val);
    return acc;
  }, {} as Record<string, T[]>);

export const countOccurrences = (arr: any[], val: any) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

export const nthOccurrence = (array: any[], index: number) => {
  const subArray = array.slice(0, index + 1);

  return countOccurrences(subArray, array[index]);
};
