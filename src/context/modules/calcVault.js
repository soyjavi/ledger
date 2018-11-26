import { C } from '../../common';

const { COLORS, TX: { TYPE } } = C;

export default (vault = {}, txs = [], index) => {
  const vaultTXs = txs.filter(tx => tx.vault === vault.hash);
  const byMonth = {};
  let { balance } = vault;

  vaultTXs.forEach(({ value, timestamp, type }) => {
    const date = (new Date(timestamp).toISOString()).substr(0, 7);

    if (!byMonth[date]) byMonth[date] = { balance: 0, expenses: 0, incomes: 0 };

    if (type === TYPE.EXPENSE) {
      byMonth[date].expenses += value;
      balance -= value;
    } else {
      byMonth[date].incomes += value;
      balance += value;
    }
    byMonth[date].balance = balance;
  });

  const chart = Object.values(byMonth)
    .map(item => item.balance)
    .slice(Math.max(Object.keys(byMonth).length - 12, 0));

  return Object.assign({}, vault, {
    byMonth,
    chart: [
      ...Array.from({ length: 12 - chart.length }, () => 0),
      ...chart,
    ],
    color: COLORS[index],
    overallBalance: balance,
  });
};
