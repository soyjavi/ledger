import { exchange } from '../../common';

export default ({ baseCurrency, vaults = [], rates }) => {
  const currentMonth = new Date().toISOString().substr(0, 7);
  const months = [currentMonth];
  const exchangeProps = [baseCurrency, rates];
  let total = 0;
  let incomes = 0;
  let expenses = 0;

  vaults.forEach(({ balance, byMonth, currency }) => {
    const vaultsMonths = Object.keys(byMonth);
    vaultsMonths.forEach((month) => {
      if (!months.includes(month)) months.push(month);
    });

    const lastMonth = vaultsMonths[vaultsMonths.length - 1];
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
    expenses,
    incomes,
    months: months.sort(),
    total,
  };
};
