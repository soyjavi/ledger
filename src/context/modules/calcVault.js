import { C } from '../../common';

const { TX: { TYPE }, VAULT_TRANSFER, WEEKS } = C;
const MS_IN_DAY = 1000 * 24 * 60 * 60;
const MS_IN_WEEK = MS_IN_DAY * 7;
const EXPENSES = 'expenses';
const INCOMES = 'incomes';

export default (vault = {}, txs = []) => {
  const chartBalance = new Array(WEEKS).fill(0);
  const weekBalance = new Array(WEEKS).fill(0);
  const weekExpenses = new Array(WEEKS).fill(0);
  const now = new Date();
  const currentMonth = now.toISOString().substr(0, 7);
  const stats = { incomes: {}, expenses: {} };
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
    const dayNumber = Math.round(ms / MS_IN_DAY);

    balance += isExpense ? -(value) : value;

    if (weekNumber < WEEKS) {
      const weekIndex = (WEEKS - 1) - weekNumber;

      chartBalance[weekIndex] += isExpense ? -(value) : value;
      if (isExpense) weekExpenses[weekIndex] += value;
      weekBalance[weekIndex] += isExpense ? -(value) : value;

      if (dayNumber <= 30) {
        if (category !== VAULT_TRANSFER) {
          if (isExpense) expenses += value;
          else incomes += value;

          if (currentMonth === (new Date(timestamp).toISOString()).substr(0, 7)) {
            const key = isExpense ? EXPENSES : INCOMES;
            stats[key][category] = (stats[key][category] || 0) + value;
          }
        }

        progression += isExpense ? -(value) : value;
      }
    }
  });

  return Object.assign({}, vault, {
    currentBalance: balance,
    last30Days: { progression, incomes, expenses },
    stats,
    weekBalance,
    weekExpenses,
  });
};
