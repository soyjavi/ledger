import { exchange } from '../../common';

export default ({ baseCurrency, rates, vaults = [] }) => {
  const currentMonth = new Date().toISOString().substr(0, 7);
  const chart = {};
  let balance = 0;
  let currentBalance = 0;
  let expenses = 0;
  let incomes = 0;

  vaults.forEach(({
    balance: vaultBalance, currentBalance: vaultCurrentBalance, months, currency,
  }) => {
    const sameCurrency = currency === baseCurrency;
    const exchangeProps = [currency, baseCurrency, rates];
    currentBalance += sameCurrency ? vaultCurrentBalance : exchange(vaultCurrentBalance, ...exchangeProps);
    balance += sameCurrency ? vaultBalance : exchange(vaultBalance, ...exchangeProps);

    Object.keys(months).forEach((month) => {
      const monthlyTotal = months[month].incomes - months[month].expenses;

      chart[month] = chart[month] || 0;
      chart[month] += sameCurrency ? monthlyTotal : exchange(monthlyTotal, ...exchangeProps);
    });

    const month = months[currentMonth];
    if (month) {
      expenses += sameCurrency ? month.expenses : exchange(month.expenses, ...exchangeProps);
      incomes += sameCurrency ? month.incomes : exchange(month.incomes, ...exchangeProps);
    }
  });

  let summation = 0;
  const last12Months = Object.keys(chart)
    .sort()
    .map(key => chart[key])
    .slice(Math.max(Object.keys(chart).length - 12, 0))
    .map((value) => {
      summation += value;
      return summation;
    });

  return {
    balance,
    chart: [
      ...Array.from({ length: 12 - last12Months.length }, () => balance),
      ...(last12Months.map(value => balance + value)),
    ],
    currentBalance,
    expenses,
    incomes,
  };
};
