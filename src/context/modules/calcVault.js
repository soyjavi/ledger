import { C, cashflow, exchange } from '../../common';

const { COLORS, TX: { TYPE } } = C;

export default (vault = {}, { baseCurrency, rates, txs = [] }, index) => {
  const vaultTXs = txs.filter(tx => tx.vault === vault.hash);
  const { income, expenses } = cashflow(vaultTXs);
  let cashflowMonth = {};
  let { balance } = vault;

  vaultTXs.forEach((tx) => {
    const date = (new Date(tx.timestamp).toISOString()).substr(0, 7);
    const value = vault.currency === baseCurrency
      ? tx.value
      : exchange(tx.value, vault.currency, baseCurrency, rates);

    balance += tx.type === TYPE.EXPENSE ? -(value) : value;
    cashflowMonth[date] = balance;
  });
  cashflowMonth = Object.values(cashflowMonth);
  cashflowMonth = cashflowMonth.slice(Math.max(cashflowMonth.length - 12, 0));

  return Object.assign({}, vault, {
    chart: [
      ...Array.from({ length: 12 - cashflowMonth.length }, () => 0),
      ...cashflowMonth,
    ],
    color: COLORS[index],
    overallBalance: vault.balance + income - expenses,
  });
};
