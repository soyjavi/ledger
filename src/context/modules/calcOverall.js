import { C, exchange } from '../../common';

const { WEEKS } = C;
const KEYS = ['progression', 'incomes', 'expenses'];
const EXPENSES = 'expenses';
const INCOMES = 'incomes';

export default ({ baseCurrency, rates, vaults = [] }) => {
  const chart = {
    balance: new Array(WEEKS).fill(0),
    expenses: new Array(WEEKS).fill(0),
    incomes: new Array(WEEKS).fill(0),
  };
  const currentMonth = { progression: 0, incomes: 0, expenses: 0 };
  const stats = { incomes: {}, expenses: {} };
  let balance = 0;
  let currentBalance = 0;
  let total = 0;

  vaults.forEach(({
    balance: vaultBalance,
    chart: vaultChart,
    currentBalance: vaultCurrentBalance,
    currency,
    currentMonth: vaultLast30Days,
    stats: vaultStats,
  }) => {
    const sameCurrency = currency === baseCurrency;
    const exchangeProps = [currency, baseCurrency, rates];

    currentBalance += sameCurrency ? vaultCurrentBalance : exchange(vaultCurrentBalance, ...exchangeProps);
    balance += sameCurrency ? vaultBalance : exchange(vaultBalance, ...exchangeProps);

    Object.keys(vaultChart).forEach((key) => {
      chart[key].forEach((week, index) => {
        chart[key][index] += vaultChart[key][index];
      });
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
      ...chart,
      // balance: chart.balance
      //   .map((value) => {
      //     total += value;
      //     return total;
      //   })
      //   .map(value => (value !== 0 ? value + balance : 0)),
    },
    currentBalance,
    currentMonth,
    stats: {
      incomes: Object.keys(stats.incomes).map(category => ({ category, value: stats.incomes[category] })),
      expenses: Object.keys(stats.expenses).map(category => ({ category, value: stats.expenses[category] })),
    },
  };
};
