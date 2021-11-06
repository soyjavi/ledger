import { C, exchange, isInternalTransfer, isNonAccountingTx } from '@common';

import calcHeatmap from './calcHeatmap';
import { filterTxs } from './filterTxs';
import { parseDate } from './parseDate';

const {
  TX: {
    TYPE: { EXPENSE },
  },
} = C;

export default (
  { overall, rates, settings: { baseCurrency }, txs: [, ...txs], vaults: [, ...vaults] },
  { month, year },
) => {
  const cities = {};
  const countries = {};
  const values = { expenses: {}, incomes: {} };
  const rangeTxs = [];
  const currencies = {};

  filterTxs(txs)
    .filter((tx) => !isNonAccountingTx(tx) && !isInternalTransfer(tx))
    .forEach((tx) => {
      const { category, location: { place } = {}, timestamp, type, value, title } = tx;

      const date = parseDate(timestamp);
      const dMonth = date.getMonth();
      const dYear = date.getFullYear();

      if (month === dMonth && year === dYear) {
        const { currency } = vaults.find(({ hash }) => hash === tx.vault) || {};

        const valueExchange = exchange(value, currency, baseCurrency, rates, timestamp);

        const categoryKey = title ? title.toLowerCase().trim() : 'Unknown';

        if (place) {
          const parts = place.split(',');
          const city = parts[0].trim();
          const country = parts[2].trim();

          cities[city] = cities[city] ? cities[city] + 1 : 1;
          countries[country] = countries[country] ? countries[country] + 1 : 1;
        }

        const keyType = type === EXPENSE ? 'expenses' : 'incomes';

        values[keyType][category] = values[keyType][category] || {};
        values[keyType][category][categoryKey] = (values[keyType][category][categoryKey] || 0) + valueExchange;

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
    ...values,
    locations: {
      cities,
      countries,
      ...calcHeatmap(rangeTxs, cities, countries),
    },
  };
};
