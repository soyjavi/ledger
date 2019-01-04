import { C } from '../../common';

const { VAULT_TRANSFER, COLORS, TX: { TYPE } } = C;

export default (vault = {}, txs = [], index) => {
  const vaultTXs = txs.filter(tx => tx.vault === vault.hash);
  const months = {};
  let { balance } = vault;

  vaultTXs.forEach(({
    category, timestamp, type, value,
  }) => {
    const date = (new Date(timestamp).toISOString()).substr(0, 7);

    if (!months[date]) months[date] = { balance: 0, expenses: 0, incomes: 0 };

    if (type === TYPE.EXPENSE) {
      if (category !== VAULT_TRANSFER) months[date].expenses += value;
      balance -= value;
    } else if (type === TYPE.INCOME) {
      if (category !== VAULT_TRANSFER) months[date].incomes += value;
      balance += value;
    }

    months[date].balance = balance;
  });

  const chart = Object.values(months)
    .map(item => item.balance)
    .slice(Math.max(Object.keys(months).length - 12, 0));

  return Object.assign({}, vault, {
    months,
    chart: [
      ...Array.from({ length: 12 - chart.length }, () => vault.balance),
      ...chart,
    ],
    color: COLORS[index],
    overallBalance: balance,
  });
};
