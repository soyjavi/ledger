import { C } from '../../common';
import sortByTimestamp from './sortByTimestamp';

const { VAULT_TRANSFER, TX: { TYPE: { EXPENSE, INCOME } } } = C;
const MAX_DAYS = 31;

export default ({ txs }, { search = '', vault }) => {
  const dataSource = [];
  const hasSearch = search.length > 0;
  const offset = (new Date().getTimezoneOffset()) * 60 * 1000;
  let days = 0;
  let group;
  let groupIndex = 0;

  sortByTimestamp(txs).some((tx) => {
    const filter = !hasSearch || (tx.title && tx.title.toLowerCase().includes(search));

    if (vault === tx.vault && filter) {
      const txDate = new Date(new Date(tx.timestamp).getTime() - offset).toISOString().substr(0, 10);

      if (group !== txDate) {
        days += 1;
        if (dataSource.length > 0) dataSource[dataSource.length - 1].last = true;

        group = txDate;
        groupIndex = dataSource.length;
        dataSource.push({
          cashflow: { expenses: 0, incomes: 0 },
          timestamp: tx.timestamp,
        });
      }

      if (tx.category !== VAULT_TRANSFER) {
        if (tx.type === EXPENSE) dataSource[groupIndex].cashflow.expenses += tx.value;
        else if (tx.type === INCOME) dataSource[groupIndex].cashflow.incomes += tx.value;
      }

      dataSource.push(tx);
    }

    return days === MAX_DAYS;
  });

  if (dataSource.length > 0) dataSource[dataSource.length - 1].last = true;

  return dataSource;
};
