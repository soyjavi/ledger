import { format } from '../../../reactor/components/Price/modules';

import { C } from '../../../common';

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
  let avg = 0;

  if (max > 0) {
    min = Math.floor(Math.min(...values));
    avg = Math.floor(values.reduce((a, b) => a + b) / values.filter(value => value > 0).length);
  }

  return [
    { value: formatScale(max, store) },
    { value: formatScale(avg, store), highlight: true },
    { value: formatScale(min, store) },
  ];
};
