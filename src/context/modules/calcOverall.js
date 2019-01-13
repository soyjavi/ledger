import { C, exchange } from '../../common';

const { WEEKS } = C;

export default ({ baseCurrency, rates, vaults = [] }) => {
  let chart = new Array(WEEKS).fill(0);
  const lastWeek = { expenses: 0, incomes: 0 };
  let balance = 0;
  let currentBalance = 0;

  vaults.forEach(({
    balance: vaultBalance, currentBalance: vaultCurrentBalance, currency,
    weekCashflow, lastWeek: { expenses, incomes },
  }) => {
    const sameCurrency = currency === baseCurrency;
    const exchangeProps = [currency, baseCurrency, rates];
    currentBalance += sameCurrency ? vaultCurrentBalance : exchange(vaultCurrentBalance, ...exchangeProps);
    balance += sameCurrency ? vaultBalance : exchange(vaultBalance, ...exchangeProps);

    chart.forEach((week, weekIndex) => {
      const value = weekCashflow[weekIndex];
      chart[weekIndex] += sameCurrency ? value : exchange(value, ...exchangeProps);
    });

    lastWeek.expenses += sameCurrency ? expenses : exchange(expenses, ...exchangeProps);
    lastWeek.incomes += sameCurrency ? incomes : exchange(incomes, ...exchangeProps);
  });

  let progression = 0;
  chart = chart.map((value) => {
    progression += value;
    return progression;
  });

  return {
    balance,
    chart: chart.map(value => balance + value),
    currentBalance,
    lastWeek,
  };
};
