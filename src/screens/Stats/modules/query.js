import { C, exchange } from '../../../common';

import calcHeatmap from './calcHeatmap';

const { TX: { TYPE: { EXPENSE, INCOME } }, VAULT_TRANSFER } = C;

const parseDate = (date) => {
  const value = date ? new Date(date) : new Date();

  return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 0, 0, 0);
};

export default (props, query = {}) => {
  const range = 12;
  const {
    baseCurrency, overall, rates, txs, vault = {}, vaults,
  } = props;
  const chart = {
    balance: new Array(range).fill(0),
    expenses: new Array(range).fill(0),
    incomes: new Array(range).fill(0),
  };
  const cities = {};
  const countries = {};
  const values = { [EXPENSE]: {}, [INCOME]: {} };
  const now = parseDate();
  const lastYear = new Date(now.getFullYear(), now.getMonth() - 11, 1);
  const rangeTxs = [];

  txs
    // .filter(tx => vault.hash === tx.vault)
    .forEach((tx) => {
      const {
        category, location: { place } = {}, timestamp, type, value, title,
      } = tx;

      if (vault.hash && vault.hash !== tx.vault) return true;

      const date = parseDate(timestamp);
      const dMonth = date.getMonth();
      const dYear = date.getFullYear();

      const month = date.getMonth() - lastYear.getMonth() + (12 * (date.getFullYear() - lastYear.getFullYear()));
      const index = date.getMonth() - lastYear.getMonth() + (12 * (date.getFullYear() - lastYear.getFullYear()));

      if (value && month >= 0) {
        const { currency } = vaults.find(({ hash }) => hash === tx.vault);
        const valueExchange = exchange(value, currency, baseCurrency, rates, timestamp);

        chart.balance[index] += type === EXPENSE ? -(valueExchange) : valueExchange;

        if (category !== VAULT_TRANSFER) {
          if (type === EXPENSE) chart.expenses[index] += valueExchange;
          else chart.incomes[index] += valueExchange;

          if (query.month === dMonth && query.year === dYear) {
            const categoryKey = title ? title.toLowerCase() : 'Unknown';

            // @TODO Aggregate by location
            if (place) {
              const parts = place.split(',');
              const city = parts[0].trim();
              const country = parts[2].trim();

              cities[city] = cities[city] ? cities[city] + 1 : 1;
              countries[country] = countries[country] ? countries[country] + 1 : 1;
            }

            values[type][category] = values[type][category] || {};
            values[type][category][categoryKey] = (values[type][category][categoryKey] || 0) + valueExchange;

            rangeTxs.push(tx);
          }
        }
      }
    });

  let total = 0;

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
    locations: {
      cities,
      countries,
      ...calcHeatmap(rangeTxs, cities, countries),
    },
  };
};
