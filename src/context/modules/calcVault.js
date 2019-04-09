import { C, exchange } from '../../common';

const { TX: { TYPE }, VAULT_TRANSFER } = C;
const CURRENT_MONTH = 11;

export default ({
  vault = {}, txs = [], baseCurrency, rates = {},
}) => {
  const now = new Date();
  const lastYear = new Date(now.getFullYear(), now.getMonth() - 11, 1);
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
    const date = new Date(timestamp);
    const monthNumber = date.getMonth() - lastYear.getMonth() + (12 * (date.getFullYear() - lastYear.getFullYear()));

    balance += isExpense ? -(value) : value;

    if (monthNumber >= 0) {
      if (monthNumber === CURRENT_MONTH) {
        if (category !== VAULT_TRANSFER) {
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
      expenses: exchangeProps ? exchange(expenses, ...exchangeProps) : expenses,
      incomes: exchangeProps ? exchange(incomes, ...exchangeProps) : incomes,
      progression: exchangeProps ? exchange(progression, ...exchangeProps) : progression,
    },
  });
};
