import { exchange } from '../../common';

export default ({ baseCurrency, vaults = [], rates }) => {
  const currentMonth = new Date().toISOString().substr(0, 7);
  let total = 0;
  let incomes = 0;
  let expenses = 0;
  const exchangeProps = [baseCurrency, rates];

  vaults.forEach(({ balance, byMonth, currency }) => {
    const lastMonth = Object.keys(byMonth)[Object.keys(byMonth).length - 1];
    const month = byMonth[lastMonth];
    const sameCurrency = currency === baseCurrency;

    if (month) {
      total += sameCurrency ? month.balance : exchange(month.balance, currency, ...exchangeProps);
      if (lastMonth === currentMonth) {
        expenses += sameCurrency ? month.expenses : exchange(month.expenses, currency, ...exchangeProps);
        incomes += sameCurrency ? month.incomes : exchange(month.expenses, currency, ...exchangeProps);
      }
    } else {
      total += sameCurrency ? balance : exchange(balance, currency, ...exchangeProps);
    }
  });

  return {
    total,
    incomes,
    expenses,
  };
};
