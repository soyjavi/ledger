import { C, cashflow } from '../../common';

const { COLORS } = C;

export default (vault = {}, storeTXs = [], index) => {
  const txs = storeTXs.filter(tx => tx.vault === vault.hash);
  let expensesByMonth = [];
  let group;
  let groupIndex = -1;

  txs.forEach((tx) => {
    const date = (new Date(tx.timestamp).toISOString()).substr(0, 7);

    if (group !== date) {
      expensesByMonth.push(0);
      group = date;
      groupIndex += 1;
    }
    expensesByMonth[groupIndex] += tx.value;
  });
  expensesByMonth = [...Array.from({ length: 12 - expensesByMonth.length }, () => 0), ...expensesByMonth];

  return Object.assign({}, vault, {
    cashflow: cashflow(txs),
    chart: expensesByMonth,
    color: COLORS[index],
  });
};
