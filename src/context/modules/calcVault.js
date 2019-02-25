import { C, exchange } from '../../common';

const { TX: { TYPE }, VAULT_TRANSFER, WEEKS } = C;
const MS_IN_DAY = 1000 * 24 * 60 * 60;
const MS_IN_WEEK = MS_IN_DAY * 7;
const EXPENSES = 'expenses';
const INCOMES = 'incomes';

export default ({
  vault = {}, txs = [], baseCurrency, rates = {},
}) => {
  const chartBalance = new Array(WEEKS).fill(0);
  const weekBalance = new Array(WEEKS).fill(0);
  const weekExpenses = new Array(WEEKS).fill(0);
  const now = new Date();
  const currentMonth = now.toISOString().substr(0, 7);
  const stats = { incomes: {}, expenses: {} };
  const { currency } = vault;
  const exchangeProps = baseCurrency !== currency ? [currency, baseCurrency, rates] : undefined;
  let { balance = 0 } = vault;
  let incomes = 0;
  let expenses = 0;
  let progression = 0;

  txs.filter(tx => tx.vault === vault.hash).forEach(({
    category, timestamp, type, value,
  }) => {
    const isExpense = type === TYPE.EXPENSE;
    const ms = Math.abs(now - new Date(timestamp));
    const weekNumber = Math.floor(ms / MS_IN_WEEK);

    balance += isExpense ? -(value) : value;

    if (weekNumber < WEEKS) {
      const weekIndex = (WEEKS - 1) - weekNumber;

      chartBalance[weekIndex] += isExpense ? -(value) : value;
      if (isExpense) weekExpenses[weekIndex] += value;
      weekBalance[weekIndex] += isExpense ? -(value) : value;

      if (category !== VAULT_TRANSFER) {
        if (currentMonth === (new Date(timestamp).toISOString()).substr(0, 7)) {
          const key = isExpense ? EXPENSES : INCOMES;
          stats[key][category] = (stats[key][category] || 0) + value;

          if (isExpense) expenses += value;
          else incomes += value;
          progression += isExpense ? -(value) : value;
        }
      }
    }
  });

  return Object.assign({}, vault, {
    currentBalance: balance,
    currentMonth: {
      progression: exchangeProps ? exchange(progression, ...exchangeProps) : progression,
      incomes: exchangeProps ? exchange(incomes, ...exchangeProps) : incomes,
      expenses: exchangeProps ? exchange(expenses, ...exchangeProps) : expenses,
    },
    stats,
    weekBalance,
    weekExpenses,
  });
};
