import { C, exchange } from '../../common';
import sortByTimestamp from './sortByTimestamp';

const { VAULT_TRANSFER, TX: { TYPE: { EXPENSE, INCOME } } } = C;
const EXPENSES = 'expenses';
const INCOMES = 'incomes';

const sortByValue = (data = {}) => {
  let keysSorted = {};

  Object.keys(data)
    .sort((a, b) => data[b] - data[a])
    .forEach((key) => {
      keysSorted = { ...keysSorted, [key.toString()]: data[key] };
    });

  return keysSorted;
};

export default (state, { date }) => {
  const {
    baseCurrency, rates, txs, vaults,
  } = state;
  const data = {
    cashflow: { [EXPENSES]: 0, [INCOMES]: 0 },
    [EXPENSES]: {},
    group: { [EXPENSES]: {}, [INCOMES]: {} },
    [INCOMES]: {},
  };

  sortByTimestamp(txs, date)
    .forEach(({
      category, type, value, vault, ...tx
    }) => {
      if (value && category !== VAULT_TRANSFER) {
        const { currency } = vaults.find(({ hash }) => vault === hash);
        const amount = baseCurrency === currency ? value : exchange(value, currency, baseCurrency, rates);
        const categoryKey = `category:${category}`;
        let context;

        if (type === EXPENSE) context = EXPENSES;
        if (type === INCOME) context = INCOMES;

        data[context][categoryKey] = (data[context][categoryKey] || 0) + amount;
        data.cashflow[context] += amount;

        const title = tx.title ? tx.title.toLowerCase().trim() : undefined;
        if (title) {
          data.group[context][category] = data.group[context][category] || {};
          data.group[context][category][title] = (data.group[context][category][title] || 0) + amount;
        }
      }
    });

  [EXPENSES, INCOMES].forEach((context) => {
    data[context] = sortByValue(data[context]);

    Object.keys(data.group[context]).forEach((category) => {
      data.group[context][category] = sortByValue(data.group[context][category]);
    });
  });

  return data;
};
