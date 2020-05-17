import { C, exchange } from '@common';

const { STATS_MONTHS_LIMIT } = C;
const KEYS = ['expenses', 'incomes', 'progression', 'today'];

export default ({ baseCurrency, rates, vaults = [] }) => {
  const currentMonth = {
    expenses: 0,
    incomes: 0,
    progression: 0,
    today: 0,
  };
  let balance = 0;
  let currentBalance = 0;
  const chartBalance = new Array(STATS_MONTHS_LIMIT).fill(0);

  vaults.forEach(
    ({
      balance: vaultBalance,
      chartBalance: vaultChartBalance,
      currentBalance: vaultCurrentBalance,
      currency,
      currentMonth: vaultLast30Days,
    }) => {
      const sameCurrency = currency === baseCurrency;
      const exchangeProps = [currency, baseCurrency, rates];

      currentBalance += sameCurrency ? vaultCurrentBalance : exchange(vaultCurrentBalance, ...exchangeProps);
      balance += sameCurrency ? vaultBalance : exchange(vaultBalance, ...exchangeProps);

      KEYS.forEach((key) => {
        currentMonth[key] += vaultLast30Days[key];
      });

      vaultChartBalance.forEach((value, index) => {
        if (value) chartBalance[index] += vaultChartBalance[index];
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
