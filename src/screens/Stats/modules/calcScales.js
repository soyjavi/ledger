import { median } from '../../../common';

export default (values) => {
  if (!values) return undefined;

  const max = Math.floor(Math.max(...values));
  let min = 0;
  let med = 0;

  if (max > 0) {
    min = Math.floor(Math.min(...values));
    med = median(values);

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
