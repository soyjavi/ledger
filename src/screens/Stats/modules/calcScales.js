import { format } from '../../../reactor/components/Price/modules';

import { C, median } from '../../../common';

const { SYMBOL } = C;

const formatScale = (value = 0, { baseCurrency } = {}) => {
  if (value === 0) return value;

  return format({
    fixed: 0,
    symbol: SYMBOL[baseCurrency],
    value,
  });
};

export default (values, store) => {
  if (!values) return undefined;

  const max = Math.floor(Math.max(...values));
  let min = 0;
  let med = 0;

  if (max > 0) {
    min = Math.floor(Math.min(...values));
    med = median(values);
  }

  return [
    { value: formatScale(max, store) },
    med !== max && med !== min ? { value: formatScale(med, store), highlight: true } : {},
    { value: formatScale(min, store) },
  ];
};
