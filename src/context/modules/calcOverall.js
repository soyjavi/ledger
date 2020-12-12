import { exchange } from '@common';

const KEYS = ['expenses', 'incomes', 'progression', 'today'];

export const calcOverall = ({ baseCurrency, rates, vaults = [] }) => {
  const currentMonth = {
    expenses: 0,
    incomes: 0,
    progression: 0,
    today: 0,
  };
  let balance = 0;
  let currentBalance = 0;
  const chartBalance = [];

  vaults.forEach(
    ({
      balance: vaultBalance,
      chartBalance: vaultChartBalance,
      currentBalanceBase: vaultCurrentBalanceBase,
      currency,
      currentMonth: vaultLast30Days,
    }) => {
      const sameCurrency = currency === baseCurrency;
      const exchangeProps = [currency, baseCurrency, rates];

      balance += sameCurrency ? vaultBalance : exchange(vaultBalance, ...exchangeProps);
      currentBalance += vaultCurrentBalanceBase;

      KEYS.forEach((key) => {
        currentMonth[key] += vaultLast30Days[key];
      });

      vaultChartBalance.forEach((value, index) => {
        chartBalance[index] = (chartBalance[index] || 0) + vaultChartBalance[index];
      });
    },
  );

  return {
    balance,
    chartBalance,
    currentBalance,
    currentMonth,
  };
};
