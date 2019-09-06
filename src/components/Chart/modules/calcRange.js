import { median } from '../../../common';

export default (values = []) => {
  if (values.length === 0) return {};
  const max = Math.floor(Math.max(...values));
  let min = Math.floor((parseInt(Math.min(...(values.filter((value) => value > 0))), 10) || 0) / 1.05);
  // min = 0;
  let med = median(values);

  if (med === max) {
    med /= 2;
    min = 0;
  }

  return { max, min, med };
};
