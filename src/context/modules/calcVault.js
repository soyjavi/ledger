import { C } from '../../common';

const {
  VAULT_TRANSFER, COLORS, TX: { TYPE }, WEEKS,
} = C;
const MS_IN_WEEK = 1000 * 7 * 24 * 60 * 60;

export default (vault = {}, txs = [], index) => {
  const lastWeek = { expenses: 0, incomes: 0 };
  const chart = new Array(WEEKS).fill(0);
  const weekCashflow = new Array(WEEKS).fill(0);
  // const weekExpenses = new Array(WEEKS).fill(0);
  // const weekIncomes = new Array(WEEKS).fill(0);
  const now = new Date();
  let { balance = 0 } = vault;

  txs.filter(tx => tx.vault === vault.hash).forEach(({
    category, timestamp, type, value,
  }) => {
    const isExpense = type === TYPE.EXPENSE;
    const weekNumber = Math.floor(Math.abs(now - new Date(timestamp)) / MS_IN_WEEK);

    balance += isExpense ? -(value) : value;

    if (weekNumber < WEEKS) {
      const weekIndex = (WEEKS - 1) - weekNumber;
      // if (isExpense) weekExpenses[weekIndex] += value;
      // else weekIncomes[weekIndex] += value;

      if (category !== VAULT_TRANSFER) {
        weekCashflow[weekIndex] += isExpense ? -(value) : value;
        if (isExpense) chart[weekIndex] += value;
        if (weekNumber === 0) {
          if (isExpense) lastWeek.expenses += value;
          else lastWeek.incomes += value;
        }
      }
    }
  });

  return Object.assign({}, vault, {
    months: {},
    color: COLORS[index],
    currentBalance: balance,
    lastWeek,
    weekCashflow,
    // weekExpenses,
    // weekIncomes,
    chart,
  });
};
