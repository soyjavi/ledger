import { C, exchange } from '@common';

import calcHeatmap from './calcHeatmap';
import { filterTxs } from './filterTxs';
import { parseDate } from './parseDate';

const {
  TX: {
    TYPE: { EXPENSE },
  },
  VAULT_TRANSFER,
} = C;

const RANGE_MONTHS = 12;

export default ({ overall, rates, settings: { baseCurrency }, txs = [], vaults = [] }, { month, year }) => {
  const chart = {
    expenses: new Array(RANGE_MONTHS).fill(0),
    incomes: new Array(RANGE_MONTHS).fill(0),
    transfers: new Array(RANGE_MONTHS).fill(0),
  };
  const cities = {};
  const countries = {};
  const values = { expenses: {}, incomes: {} };
  const now = parseDate();
  const lastYear = new Date(now.getFullYear(), now.getMonth() - 11, 1);
  const rangeTxs = [];
  const currencies = {};

  filterTxs(txs).forEach((tx) => {
    const { category, location: { place } = {}, timestamp, type, value, title } = tx;

    const date = parseDate(timestamp);
    const dMonth = date.getMonth();
    const dYear = date.getFullYear();
    const index = date.getMonth() - lastYear.getMonth() + 12 * (date.getFullYear() - lastYear.getFullYear());

    const { currency } = vaults.find(({ hash }) => hash === tx.vault) || {};

    const valueExchange = exchange(value, currency, baseCurrency, rates, timestamp);

    const isTransfer = category === VAULT_TRANSFER;

    if (isTransfer && type === EXPENSE) chart.transfers[index] += valueExchange;
    else if (!isTransfer && type === EXPENSE) chart.expenses[index] += valueExchange;
    else if (!isTransfer) chart.incomes[index] += valueExchange;

    if (month === dMonth && year === dYear) {
      const categoryKey = title ? title.toLowerCase().trim() : 'Unknown';

      if (!isTransfer && place) {
        const parts = place.split(',');
        const city = parts[0].trim();
        const country = parts[2].trim();

        cities[city] = cities[city] ? cities[city] + 1 : 1;
        countries[country] = countries[country] ? countries[country] + 1 : 1;
      }

      if (!isTransfer) {
        const keyType = type === EXPENSE ? 'expenses' : 'incomes';

        values[keyType][category] = values[keyType][category] || {};
        values[keyType][category][categoryKey] = (values[keyType][category][categoryKey] || 0) + valueExchange;
      }

      rangeTxs.push(tx);
    }
  });

  vaults.forEach(({ currency, currentBalance: balance, currentBalanceBase: base }) => {
    let item = currencies[currency] || { balance: 0, base: 0 };
    item = { balance: item.balance + balance, base: item.base + base };
    item.weight = (item.base * 100) / overall.currentBalance;

    currencies[currency] = item;
  });

  return {
    chart,
    ...values,
    locations: {
      cities,
      countries,
      ...calcHeatmap(rangeTxs, cities, countries),
    },
  };
};
