import { C, exchange } from '../../../common';

import calcHeatmap from './calcHeatmap';
import filterTxs from './filterTxs';
import parseDate from './parseDate';

const {
  TX: {
    TYPE: { EXPENSE },
  },
  VAULT_TRANSFER,
} = C;

export default (vault = {}, store, query = {}) => {
  const { baseCurrency, rates, txs, vaults } = store;
  const cities = {};
  const countries = {};
  const values = { expenses: {}, incomes: {} };
  const rangeTxs = [];

  filterTxs(txs, vault).forEach((tx) => {
    const { category, location: { place } = {}, timestamp, type, value, title } = tx;

    const date = parseDate(timestamp);
    const dMonth = date.getMonth();
    const dYear = date.getFullYear();

    const { currency } = vaults.find(({ hash }) => hash === tx.vault);
    const valueExchange = exchange(value, currency, baseCurrency, rates, timestamp);

    const isTransfer = category === VAULT_TRANSFER;
    if (query.month === dMonth && query.year === dYear) {
      const categoryKey = title ? title.toLowerCase() : 'Unknown';

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

  return {
    ...values,
    locations: {
      cities,
      countries,
      ...calcHeatmap(rangeTxs, cities, countries),
    },
  };
};
