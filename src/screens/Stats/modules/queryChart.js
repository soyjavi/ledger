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

const range = STATS_MONTHS_LIMIT;

export default (store) => {
  const { baseCurrency, overall, rates, txs, vaults } = store;
  const chart = {
    balance: new Array(range).fill(0),
    expenses: new Array(range).fill(0),
    incomes: new Array(range).fill(0),
    transfers: new Array(range).fill(0),
  };
  const now = parseDate();
  const originDate = new Date(now.getFullYear(), now.getMonth() - STATS_MONTHS_LIMIT, 1, 0, 0);

  filterTxs(txs).forEach((tx) => {
    const { category, timestamp, type, value } = tx;
    const { currency } = vaults.find(({ hash }) => hash === tx.vault);
    const valueExchange = exchange(value, currency, baseCurrency, rates, timestamp);
    const monthIndex = getMonthDiff(originDate, parseDate(timestamp)) - 1;
    const isTransfer = category === VAULT_TRANSFER;

    if (!isTransfer) {
      chart.balance[monthIndex] += type === EXPENSE ? -valueExchange : valueExchange;
      chart[type === EXPENSE ? 'expenses' : 'incomes'][monthIndex] += valueExchange;
    } else if (isTransfer && type === EXPENSE) {
      chart.transfers[monthIndex] += valueExchange;
    }
  });

  let total = 0;

  return {
    ...chart,
    balance: chart.balance
      .map((value = 0) => {
        total += value;
        return total;
      })
      .map((value, index) => {
        const baseBalance = overall.chartBalance[index];
        return value !== 0 ? baseBalance + value : 0;
      }),
  };
};
