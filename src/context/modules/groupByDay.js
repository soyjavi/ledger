import { C } from '../../common';
import sortByTimestamp from './sortByTimestamp';

const { TX: { TYPE: { EXPENSE } } } = C;

export default ({ txs }, { vault, date }) => {
  const dataSource = [];
  let group;
  let groupIndex = 0;
  sortByTimestamp(txs, date).forEach((tx) => {
    if (vault === tx.vault) {
      const txDate = tx.timestamp.substr(0, 10);

      if (group !== txDate) {
        if (dataSource.length > 0) dataSource[dataSource.length - 1].last = true;

        group = txDate;
        groupIndex = dataSource.length;
        dataSource.push({
          cashflow: { expenses: 0, incomes: 0 },
          timestamp: tx.timestamp,
        });
      }

      if (tx.type === EXPENSE) dataSource[groupIndex].cashflow.expenses += tx.value;
      else dataSource[groupIndex].cashflow.incomes += tx.value;

      dataSource.push(tx);
    }
  });

  if (dataSource.length > 0) dataSource[dataSource.length - 1].last = true;

  return dataSource;
};
