import { C, exchange, getMonthDiff } from '@common';

import { filterTxs } from './filterTxs';
import { parseDate } from './parseDate';

const {
  STATS_MONTHS_LIMIT,
  TX: {
    TYPE: { EXPENSE },
  },
  VAULT_TRANSFER,
} = C;

export default ({ overall: { chartBalance = [] }, rates, settings: { baseCurrency }, txs, vaults }) => {
  const chart = {
    balance: chartBalance.slice(chartBalance.length - STATS_MONTHS_LIMIT),
    expenses: new Array(STATS_MONTHS_LIMIT).fill(0),
    incomes: new Array(STATS_MONTHS_LIMIT).fill(0),
    transfers: new Array(STATS_MONTHS_LIMIT).fill(0),
  };
  const now = parseDate();
  const originDate = new Date(now.getFullYear(), now.getMonth() - STATS_MONTHS_LIMIT, 1, 0, 0);

  const vaultsCurrency = {};
  vaults.forEach(({ currency, hash }) => (vaultsCurrency[hash] = currency));

  filterTxs(txs).forEach((tx) => {
    const { category, timestamp, type, value } = tx;
    const currency = vaultsCurrency[tx.vault];

    const valueExchange = exchange(value, currency, baseCurrency, rates, timestamp);
    const monthIndex = getMonthDiff(originDate, parseDate(timestamp)) - 1;

    if (category !== VAULT_TRANSFER) {
      chart[type === EXPENSE ? 'expenses' : 'incomes'][monthIndex] += valueExchange;
    } else if (type === EXPENSE) {
      chart.transfers[monthIndex] += valueExchange;
    }
  });

  return chart;
};
