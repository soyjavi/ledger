import { C, exchange } from '../../../common';

const {
  MS_IN_DAY, MS_IN_WEEK, TX: { TYPE: { EXPENSE, INCOME } }, VAULT_TRANSFER,
} = C;
const CURRENT_MONTH = 11;
const CURRENT_WEEK = 0;
const MONTHLY = 0;

const parseDate = (date) => {
  const value = date ? new Date(date) : new Date();

  return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 0, 0, 0);
};

export default (props, typeQuery = MONTHLY) => {
  const monthly = typeQuery === MONTHLY;
  const range = monthly ? 12 : 7;
  const {
    baseCurrency, overall, rates, txs, vault = {}, vaults,
  } = props;
  const chart = {
    balance: new Array(range).fill(0),
    expenses: new Array(range).fill(0),
    incomes: new Array(range).fill(0),
  };

  const values = { [EXPENSE]: {}, [INCOME]: {} };
  const now = parseDate();
  const lastYear = new Date(now.getFullYear(), now.getMonth() - 11, 1);

  txs.forEach(({
    category, timestamp, type, value, title, ...tx
  }) => {
    if (vault.hash && vault.hash !== tx.vault) return;

    const date = parseDate(timestamp);
    const ms = Math.abs(now - date);
    const month = date.getMonth() - lastYear.getMonth() + (12 * (date.getFullYear() - lastYear.getFullYear()));
    const week = Math.floor(ms / MS_IN_WEEK);
    const index = monthly
      ? date.getMonth() - lastYear.getMonth() + (12 * (date.getFullYear() - lastYear.getFullYear()))
      : Math.abs(Math.floor(ms / MS_IN_DAY) - 6);

    if (value && ((monthly && month >= 0) || (!monthly && week === 0))) {
      const { currency } = vaults.find(({ hash }) => hash === tx.vault);
      const valueExchange = currency !== baseCurrency
        ? exchange(value, currency, baseCurrency, rates)
        : value;

      chart.balance[index] += type === EXPENSE ? -(valueExchange) : valueExchange;
      if (category !== VAULT_TRANSFER) {
        if (type === EXPENSE) chart.expenses[index] += valueExchange;
        else chart.incomes[index] += valueExchange;

        if ((monthly && month === CURRENT_MONTH) || (!monthly && week === CURRENT_WEEK)) {
          const categoryKey = title.toLowerCase();

          values[type][category] = values[type][category] || {};
          values[type][category][categoryKey] = (values[type][category][categoryKey] || 0) + valueExchange;
        }
      }
    }
  });

  let total = 0;
  let baseBalance = monthly ? overall.balance : overall.currentBalance;
  if (vault.hash) {
    baseBalance = monthly ? vault.balance : vault.currentBalance;
    baseBalance = vault.currency !== baseCurrency
      ? exchange(baseBalance, vault.currency, baseCurrency, rates)
      : baseBalance;
  }

  return {
    chart: {
      ...chart,
      balance: chart.balance
        .map((value) => {
          total += value;
          return total;
        })
        .map(value => (value !== 0 ? baseBalance + value : 0)),
    },
    ...values,
  };
};
