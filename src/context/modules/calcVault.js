import { C, exchange } from '../../common';

const {
  MS_IN_DAY, MS_IN_WEEK, TX: { TYPE }, VAULT_TRANSFER, WIPE,
} = C;
const CURRENT_MONTH = 11;
const CURRENT_WEEK = 0;

export default ({
  vault = {}, txs = [], baseCurrency, rates = {},
}) => {
  const chart = {
    balance: new Array(12).fill(0),
    expenses: new Array(12).fill(),
    incomes: new Array(12).fill(),
    week: new Array(7).fill(),
  };
  const now = new Date();
  const lastYear = new Date(now.getFullYear(), now.getMonth() - 11, 1);
  const { currency } = vault;
  const exchangeProps = baseCurrency !== currency ? [currency, baseCurrency, rates] : undefined;
  let { balance = 0 } = vault;
  let incomes = 0;
  let expenses = 0;
  let progression = 0;
  let transfers = 0;

  txs.filter(tx => tx.vault === vault.hash).forEach(({
    category, timestamp, type, value,
  }) => {
    const isExpense = type === TYPE.EXPENSE;
    const date = new Date(timestamp);
    const ms = Math.abs(now - date);
    const weekNumber = Math.floor(ms / MS_IN_WEEK);
    const monthNumber = date.getMonth() - lastYear.getMonth() + (12 * (date.getFullYear() - lastYear.getFullYear()));

    balance += isExpense ? -(value) : value;

    const valueExchange = exchangeProps ? exchange(value, ...exchangeProps) : value;

    if (monthNumber >= 0) {
      chart.balance[monthNumber] += isExpense ? -(valueExchange) : valueExchange;

      // @TODO: DRY
      chart.expenses[monthNumber] = chart.expenses[monthNumber] || {};
      chart.expenses[monthNumber][category] = chart.expenses[monthNumber][category] || 0;
      chart.incomes[monthNumber] = chart.incomes[monthNumber] || {};
      chart.incomes[monthNumber][category] = chart.incomes[monthNumber][category] || 0;
      // --

      if (category !== VAULT_TRANSFER) {
        if (isExpense) chart.expenses[monthNumber][category] += valueExchange;
        else chart.incomes[monthNumber][category] += valueExchange;
      }

      if (monthNumber === CURRENT_MONTH) {
        if (weekNumber === CURRENT_WEEK) {
          const dayNumber = Math.floor(ms / MS_IN_DAY);

          chart.week[dayNumber] = chart.week[dayNumber] || {};
          chart.week[dayNumber][category] = chart.week[dayNumber][category] || 0;
          if (isExpense) chart.week[dayNumber][category] += valueExchange;
        }

        if (category !== VAULT_TRANSFER) {
          if (isExpense) expenses += value;
          else incomes += value;
          progression += isExpense ? -(value) : value;
        } else if (isExpense) transfers += value;
      }
    }
  });

  return Object.assign({}, vault, {
    chart,
    currentBalance: balance,
    currentMonth: {
      expenses: exchangeProps ? exchange(expenses, ...exchangeProps) : expenses,
      incomes: exchangeProps ? exchange(incomes, ...exchangeProps) : incomes,
      progression: exchangeProps ? exchange(progression, ...exchangeProps) : progression,
      transfers: exchangeProps ? exchange(transfers, ...exchangeProps) : transfers,
    },
  });
};
