import { C, exchange } from '../../common';

const { TX: { TYPE }, VAULT_TRANSFER } = C;
const CURRENT_MONTH = 11;

export default ({
  vault = {}, txs = [], baseCurrency, rates = {},
}) => {
  const now = new Date();
  const lastYear = new Date(now.getFullYear(), now.getMonth() - 11, 1);
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
  dataSource.forEach(({
    category, timestamp, type, value,
  }) => {
    const isExpense = type === TYPE.EXPENSE;
    const date = new Date(timestamp);
    const monthNumber = date.getMonth() - lastYear.getMonth() + (12 * (date.getFullYear() - lastYear.getFullYear()));

    balance += isExpense ? -(value) : value;

    if (monthNumber >= 0) {
      if (monthNumber === CURRENT_MONTH) {
        if (category !== VAULT_TRANSFER) {
          currentMonthTxs += 1;
          if (isExpense) expenses += value;
          else incomes += value;
          progression += isExpense ? -(value) : value;

          if (date.getDate() === currentDay) today += isExpense ? -(value) : value;
        }
      }
    }
  });

  return {
    ...vault,
    chartBalance: new Array(12).fill(0).map((value, index) => {
      const timestamp = new Date(lastYear.getFullYear(), lastYear.getMonth() + index, 15);
      return exchange(vault.balance, currency, baseCurrency, rates, timestamp);
    }),
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
