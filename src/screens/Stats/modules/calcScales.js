import { C, median } from '@common';

const { STATS_MONTHS_LIMIT } = C;

export default (values = []) => {
  if (!values) return undefined;

  const historicValues = values.slice(0, STATS_MONTHS_LIMIT - 1);

  const max = Math.floor(Math.max(...historicValues));
  let min = 0;
  let med = 0;

  if (max > 0) {
    min = Math.floor(Math.min(...historicValues));
    med = median(historicValues);
    // if (med === max) {
    //   med /= 2;
    //   min = 0;
    // }
  }

  return {
    min,
    med: med !== max && med !== min ? med : undefined,
    max,
  };
};
