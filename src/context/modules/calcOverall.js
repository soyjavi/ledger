import { C, exchange } from '../../common';

const { WEEKS } = C;

export default ({ baseCurrency, rates, vaults = [] }) => {
  const chartBalance = new Array(WEEKS).fill(0);
  const chartExpenses = new Array(WEEKS).fill(0);
  let balance = 0;
  let currentBalance = 0;
  let progression = 0;
  let total = 0;

  vaults.forEach(({
    balance: vaultBalance,
    currentBalance: vaultCurrentBalance,
    currency,
    progression: vaultProgression = 0,
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

    progression += sameCurrency ? vaultProgression : exchange(vaultProgression, ...exchangeProps);
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
    progression,
  };
};
