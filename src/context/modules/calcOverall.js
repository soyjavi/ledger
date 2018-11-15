import { C, exchange } from '../../common';

const { TX: { TYPE: { EXPENSE, INCOME } } } = C;

export default ({
  baseCurrency, txs = [], vaults = [], rates,
}) => {
  let total = 0;
  let income = 0;
  let expenses = 0;

  const currencies = {};
  vaults.forEach(({
    balance, cashflow = {}, hash, currency,
  }) => {
    currencies[hash] = currency;

    total += exchange(balance, currency, baseCurrency, rates);
    expenses += exchange(cashflow.expenses, currency, baseCurrency, rates);
    income += exchange(cashflow.income, currency, baseCurrency, rates);
  });

  txs.forEach(({ type, value, vault }) => {
    const amount = exchange(value, currencies[vault], baseCurrency, rates);
    if (type === EXPENSE) total -= amount;
    else if (type === INCOME) total += amount;
  });

  return {
    total,
    income,
    expenses,
  };
};
