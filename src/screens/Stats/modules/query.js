import { C, exchange } from '../../../common';

import calcHeatmap from './calcHeatmap';

const {
  TX: {
    TYPE: { EXPENSE },
  },
  VAULT_TRANSFER,
} = C;

const parseDate = (date) => {
  const value = date ? new Date(date) : new Date();

  return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 0, 0, 0);
};

export default (vault = {}, store, query = {}) => {
  const range = 12;
  const { baseCurrency, overall, rates, txs, vaults } = store;
  const chart = {
    balance: new Array(range).fill(0),
    expenses: new Array(range).fill(0),
    incomes: new Array(range).fill(0),
    transfers: new Array(range).fill(0),
  };
  const cities = {};
  const countries = {};
  const values = { expenses: {}, incomes: {} };
  const now = parseDate();
  const lastYear = new Date(now.getFullYear(), now.getMonth() - 11, 1);
  const rangeTxs = [];
  const currencies = {};

  txs
    .filter((tx) => vault.hash === undefined || vault.hash === tx.vault)
    .forEach((tx) => {
      const { category, location: { place } = {}, timestamp, type, value, title } = tx;

      const date = parseDate(timestamp);
      const dMonth = date.getMonth();
      const dYear = date.getFullYear();
      const month = date.getMonth() - lastYear.getMonth() + 12 * (date.getFullYear() - lastYear.getFullYear());
      const index = date.getMonth() - lastYear.getMonth() + 12 * (date.getFullYear() - lastYear.getFullYear());

      if (value && month >= 0) {
        const { currency } = vaults.find(({ hash }) => hash === tx.vault);
        const valueExchange = exchange(value, currency, baseCurrency, rates, timestamp);

        chart.balance[index] += type === EXPENSE ? -valueExchange : valueExchange;
        const isTransfer = category === VAULT_TRANSFER;

        if (isTransfer && type === EXPENSE) chart.transfers[index] += valueExchange;
        else if (!isTransfer && type === EXPENSE) chart.expenses[index] += valueExchange;
        else if (!isTransfer) chart.incomes[index] += valueExchange;

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
      }
    });

  let total = 0;
  vaults.forEach(({ currency, currentBalance: balance, currentBalanceBase: base }) => {
    let item = currencies[currency] || { balance: 0, base: 0 };
    item = { balance: item.balance + balance, base: item.base + base };
    item.weight = (item.base * 100) / overall.currentBalance;

    currencies[currency] = item;
  });

  return {
    chart: {
      ...chart,
      balance: chart.balance
        .map((value) => {
          total += value;
          return total;
        })
        .map((value, index) => {
          const baseBalance = vault.hash ? vault.chartBalance[index] : overall.chartBalance[index];
          return value !== 0 ? baseBalance + value : 0;
        }),
    },
    ...values,
    currencies,
    locations: {
      cities,
      countries,
      ...calcHeatmap(rangeTxs, cities, countries),
    },
  };
};
