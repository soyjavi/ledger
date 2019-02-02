import { C } from '../../common';

const { COLORS, TX: { TYPE }, WEEKS } = C;
const MS_IN_DAY = 1000 * 24 * 60 * 60;
const MS_IN_WEEK = MS_IN_DAY * 7;

export default (vault = {}, txs = [], index) => {
  const chartBalance = new Array(WEEKS).fill(0);
  const weekBalance = new Array(WEEKS).fill(0);
  const weekExpenses = new Array(WEEKS).fill(0);
  const now = new Date();
  let { balance = 0 } = vault;
  let progression = 0;
  let total = 0;

  txs.filter(tx => tx.vault === vault.hash).forEach(({ timestamp, type, value }) => {
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

      if (dayNumber <= 30) progression += isExpense ? -(value) : value;
    }
  });

  return Object.assign({}, vault, {
    months: {},
    color: COLORS[index],
    currentBalance: balance,
    progression,

    weekBalance,
    weekExpenses,
    chart: {
      balance: chartBalance
        // .reduce((total, value) => total + value)
        .map((value) => {
          total += value;
          return total;
        })
        .map(value => (value !== 0 ? value + vault.balance : 0)),
      expenses: weekExpenses,
    },
  });
};
