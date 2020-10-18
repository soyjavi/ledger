import { C, exchange, getMonthDiff } from '@common';

const {
  STATS_MONTHS_LIMIT,
  TX: { TYPE },
  VAULT_TRANSFER,
} = C;

export const calcVault = ({ baseCurrency, rates = {}, txs = [], vault }) => {
  const now = new Date();
  const originDate = new Date(now.getFullYear(), now.getMonth() - STATS_MONTHS_LIMIT, 1, 0, 0);

  const currentDay = now.getDate();
  const { currency } = vault;
  const exchangeProps = [currency, baseCurrency, rates];
  let { balance = 0 } = vault;
  let currentMonthTxs = 0;
  let expenses = 0;
  let incomes = 0;
  let progression = 0;
  let today = 0;

  const dataSource = txs.filter((tx) => tx.vault === vault.hash);
  dataSource.forEach(({ category, timestamp, type, value }) => {
    const isExpense = type === TYPE.EXPENSE;
    const date = new Date(timestamp);
    const monthIndex = getMonthDiff(originDate, date);

    balance += isExpense ? -value : value;
    if (monthIndex === STATS_MONTHS_LIMIT) {
      if (category !== VAULT_TRANSFER) {
        currentMonthTxs += 1;
        if (isExpense) expenses += value;
        else incomes += value;
        progression += isExpense ? -value : value;

        if (date.getDate() === currentDay) today += isExpense ? -value : value;
      }
    }
  });

  return {
    ...vault,
    chartBalance: new Array(STATS_MONTHS_LIMIT)
      .fill(0)
      .map((value, index) =>
        currency !== baseCurrency
          ? exchange(
              vault.balance,
              ...exchangeProps,
              new Date(originDate.getFullYear(), originDate.getMonth() + index + 1, 1),
            )
          : vault.balance,
      ),
    currentBalance: balance,
    currentBalanceBase: exchange(balance, ...exchangeProps),
    currentMonth: {
      expenses: exchange(expenses, ...exchangeProps),
      incomes: exchange(incomes, ...exchangeProps),
      progression: exchange(progression, ...exchangeProps),
      today: exchange(today, ...exchangeProps),
      txs: currentMonthTxs,
    },
    txs: dataSource,
  };
};
