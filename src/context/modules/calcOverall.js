import { exchange } from '../../common';

const CHART_MONTHS = 12;

export default ({ baseCurrency, rates, vaults = [] }) => {
  const currentMonth = new Date().toISOString().substr(0, 7);
  const months = {};
  let balance = 0;
  let currentBalance = 0;
  let expenses = 0;
  let incomes = 0;

  vaults.forEach(({
    balance: vaultBalance, currentBalance: vaultCurrentBalance, months: vaultMonths, currency,
  }) => {
    const sameCurrency = currency === baseCurrency;
    const exchangeProps = [currency, baseCurrency, rates];
    currentBalance += sameCurrency ? vaultCurrentBalance : exchange(vaultCurrentBalance, ...exchangeProps);
    balance += sameCurrency ? vaultBalance : exchange(vaultBalance, ...exchangeProps);

    Object.keys(vaultMonths).forEach((month) => {
      const monthlyTotal = vaultMonths[month].incomes - vaultMonths[month].expenses;

      months[month] = months[month] || 0;
      months[month] += sameCurrency ? monthlyTotal : exchange(monthlyTotal, ...exchangeProps);
    });

    const month = vaultMonths[currentMonth];
    if (month) {
      expenses += sameCurrency ? month.expenses : exchange(month.expenses, ...exchangeProps);
      incomes += sameCurrency ? month.incomes : exchange(month.incomes, ...exchangeProps);
    }
  });

  let summation = 0;
  const lastMonths = Object.keys(months)
    .sort()
    .map(key => months[key])
    .slice(Math.max(Object.keys(months).length - CHART_MONTHS, 0))
    .map((value) => {
      summation += value;
      return summation;
    });

  return {
    balance,
    chart: [
      ...Array.from({ length: CHART_MONTHS - lastMonths.length }, () => balance),
      ...(lastMonths.map(value => balance + value)),
    ],
    currentBalance,
    expenses,
    incomes,
  };
};
