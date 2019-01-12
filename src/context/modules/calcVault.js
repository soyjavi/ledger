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

    months[date] = months[date] || { balance: 0, expenses: 0, incomes: 0 };
    if (type === TYPE.EXPENSE) {
      if (category !== VAULT_TRANSFER) months[date].expenses += value;
      balance -= value;
    } else if (type === TYPE.INCOME) {
      if (category !== VAULT_TRANSFER) months[date].incomes += value;
      balance += value;
    }
    months[date].balance = balance;
  });

  return Object.assign({}, vault, {
    months,
    color: COLORS[index],
    currentBalance: balance,
  });
};
