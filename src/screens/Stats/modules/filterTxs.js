import { C } from '@common';

import { parseDate } from './parseDate';

const { STATS_MONTHS_LIMIT } = C;

export const filterTxs = (txs = []) => {
  const now = parseDate();
  const originDate = new Date(now.getFullYear(), now.getMonth() - STATS_MONTHS_LIMIT, 1, 0, 0);

  return txs.filter((tx) => {
    const { timestamp, value } = tx;

    return value && parseDate(timestamp) > originDate;
  });
};
