import { C, exchange } from '../../common';
import sortByTimestamp from './sortByTimestamp';

const { VAULT_TRANSFER, TX: { TYPE: { EXPENSE, INCOME } } } = C;
const EXPENSES = 'expenses';
const INCOMES = 'incomes';

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
        let context;

        if (type === EXPENSE) context = EXPENSES;
        if (type === INCOME) context = INCOMES;

        data[context][category] = (data[context][category] || 0) + amount;
        data.cashflow[context] += amount;

        const title = tx.title ? tx.title.toLowerCase().trim() : undefined;
        if (title) {
          data.group[context][category] = data.group[context][category] || {};
          data.group[context][category][title] = (data.group[context][category][title] || 0) + amount;
        }
      }
    });

  [EXPENSES, INCOMES].forEach((context) => {
    Object.keys(data.group[context]).forEach((category) => {
      const base = data.group[context][category];
      let keysSorted = {};
      Object.keys(base)
        .sort((a, b) => base[b] - base[a])
        .forEach((key) => { keysSorted = { ...keysSorted, [key]: base[key] }; });
      data.group[context][category] = keysSorted;
    });
  });

  return data;
};
