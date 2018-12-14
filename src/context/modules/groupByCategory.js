import { C, exchange } from '../../common';
import sortByTimestamp from './sortByTimestamp';

const { VAULT_TRANSFER, TX: { TYPE: { EXPENSE, INCOME } } } = C;

export default (state, { date }) => {
  const {
    baseCurrency, rates, txs, vaults,
  } = state;
  const data = {
    cashflow: { expenses: 0, incomes: 0 },
    expenses: {},
    group: { expenses: {}, incomes: {} },
    incomes: {},
  };

  sortByTimestamp(txs, date)
    .forEach(({
      category, type, value, vault, ...tx
    }) => {
      if (value && category !== VAULT_TRANSFER) {
        const { currency } = vaults.find(({ hash }) => vault === hash);
        const amount = baseCurrency === currency ? value : exchange(value, currency, baseCurrency, rates);
        let context;

        if (type === EXPENSE) context = 'expenses';
        if (type === INCOME) context = 'incomes';

        data[context][category] = (data[context][category] || 0) + amount;
        data.cashflow[context] += amount;

        const title = tx.title ? tx.title.toLowerCase().trim() : undefined;
        if (title) {
          data.group[context][category] = data.group[context][category] || {};
          data.group[context][category][title] = (data.group[context][category][title] || 0) + amount;
        }
      }
    });

  return data;
};
