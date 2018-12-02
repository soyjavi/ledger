import { exchange } from '../../common';

export default ({ baseCurrency, vaults = [], rates }) => {
  const currentMonth = new Date().toISOString().substr(0, 7);
  const months = [currentMonth];
  const exchangeProps = [baseCurrency, rates];
  let expenses = 0;
  let incomes = 0;
  let total = 0;

  vaults.forEach(({ balance, months: vaultMonths, currency }) => {
    const keysMonths = Object.keys(vaultMonths);
    keysMonths.forEach((month) => {
      if (!months.includes(month)) months.push(month);
    });

    const lastMonth = keysMonths[keysMonths.length - 1];
    const month = vaultMonths[lastMonth];
    const sameCurrency = currency === baseCurrency;

    if (month) {
      total += sameCurrency ? month.balance : exchange(month.balance, currency, ...exchangeProps);
      if (lastMonth === currentMonth) {
        expenses += sameCurrency ? month.expenses : exchange(month.expenses, currency, ...exchangeProps);
        incomes += sameCurrency ? month.incomes : exchange(month.incomes, currency, ...exchangeProps);
      }
    } else {
      total += sameCurrency ? balance : exchange(balance, currency, ...exchangeProps);
    }
  });

  return {
    expenses,
    incomes,
    months: months.sort(),
    total,
  };
};
