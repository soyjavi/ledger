import { C, exchange } from '../../common';
import sortByTimestamp from './sortByTimestamp';

const { VAULT_TRANSFER, TX: { TYPE: { EXPENSE, INCOME } } } = C;

export default (state, { date }) => {
  const {
    baseCurrency, rates, txs, vaults,
  } = state;
  const dataSource = {
    cashflow: { expenses: 0, incomes: 0 },
    expenses: {},
    incomes: {},
  };

  sortByTimestamp(txs, date)
    .forEach(({
      category, type, value, vault,
    }) => {
      if (category !== VAULT_TRANSFER) {
        const { currency } = vaults.find(({ hash }) => vault === hash);
        const amount = baseCurrency === currency ? value : exchange(value, currency, baseCurrency, rates);
        let context;

        if (type === EXPENSE) context = 'expenses';
        if (type === INCOME) context = 'incomes';

        dataSource[context][category] = (dataSource[context][category] || 0) + amount;
        dataSource.cashflow[context] += amount;
      }
    });

  return dataSource;
};
