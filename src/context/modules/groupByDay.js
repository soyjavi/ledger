import { C } from '../../common';

const { TX: { TYPE: { EXPENSE } } } = C;

export default (txs, { vault, year, month }) => {
  const dataSource = [];
  let group;
  let groupIndex = 0;

  txs
    .sort((a, b) => {
      if (a.timestamp < b.timestamp) return 1;
      if (a.timestamp > b.timestamp) return -1;
      return 0;
    })
    .forEach((tx) => {
      if (tx.vault === vault) {
        const tsDate = new Date(tx.timestamp);

        if (tsDate.getMonth() === month && tsDate.getFullYear() === year) {
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
      }
    });

  if (dataSource.length > 0) dataSource[dataSource.length - 1].last = true;

  return dataSource;
};
