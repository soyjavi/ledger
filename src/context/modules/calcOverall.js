import { C, exchange } from '../../common';

const { WEEKS } = C;
const KEYS = ['progression', 'incomes', 'expenses'];
const EXPENSES = 'expenses';
const INCOMES = 'incomes';

export default ({ baseCurrency, rates, vaults = [] }) => {
  const chartBalance = new Array(WEEKS).fill(0);
  const chartExpenses = new Array(WEEKS).fill(0);
  const currentMonth = { progression: 0, incomes: 0, expenses: 0 };
  const stats = { incomes: {}, expenses: {} };
  let balance = 0;
  let currentBalance = 0;
  let total = 0;

  vaults.forEach(({
    balance: vaultBalance,
    currentBalance: vaultCurrentBalance,
    currency,
    currentMonth: vaultLast30Days,
    stats: vaultStats,
    weekBalance,
    weekExpenses,
  }) => {
    const sameCurrency = currency === baseCurrency;

    const exchangeProps = [currency, baseCurrency, rates];
    currentBalance += sameCurrency ? vaultCurrentBalance : exchange(vaultCurrentBalance, ...exchangeProps);
    balance += sameCurrency ? vaultBalance : exchange(vaultBalance, ...exchangeProps);

    chartBalance.forEach((week, weekIndex) => {
      const value = weekBalance[weekIndex];
      chartBalance[weekIndex] += sameCurrency ? value : exchange(value, ...exchangeProps);
    });

    chartExpenses.forEach((week, weekIndex) => {
      const value = weekExpenses[weekIndex];
      chartExpenses[weekIndex] += sameCurrency ? value : exchange(value, ...exchangeProps);
    });

    KEYS.forEach((key) => {
      currentMonth[key] += vaultLast30Days[key];
    });

    [EXPENSES, INCOMES].forEach((type) => {
      Object.keys(vaultStats[type]).forEach((category) => {
        const amount = sameCurrency
          ? vaultStats[type][category]
          : exchange(vaultStats[type][category], ...exchangeProps);

        stats[type][category] = (stats[type][category] || 0) + amount;
      });
    });
  });

  return {
    balance,
    chart: {
      balance: chartBalance
        .map((value) => {
          total += value;
          return total;
        })
        .map(value => (value !== 0 ? value + balance : 0)),
      expenses: chartExpenses,
    },
    currentBalance,
    currentMonth,
    stats: {
      incomes: Object.keys(stats.incomes).map(category => ({ category, value: stats.incomes[category] })),
      expenses: Object.keys(stats.expenses).map(category => ({ category, value: stats.expenses[category] })),
    },
  };
};
