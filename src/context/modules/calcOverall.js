import { C, exchange } from '../../common';

const { TX: { TYPE: { EXPENSE, INCOME } } } = C;

export default ({
  txs = [], vaults = [], currency, rates,
}) => {
  let total = 0;
  let income = 0;
  let expenses = 0;

  const currencies = {};
  vaults.forEach(({
    balance, cashflow = {}, hash, currency: base,
  }) => {
    currencies[hash] = base;

    total += exchange(balance, base, currency, rates);
    expenses += exchange(cashflow.expenses, base, currency, rates);
    income += exchange(cashflow.income, base, currency, rates);
  });

  txs.forEach(({ type, value, vault }) => {
    const amount = exchange(value, currencies[vault], currency, rates);
    if (type === EXPENSE) total -= amount;
    else if (type === INCOME) total += amount;
  });

  return {
    total,
    income,
    expenses,
  };
};
