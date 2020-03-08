import { C, exchange } from '../../../common';
import filterTxs from './filterTxs';
import parseDate from './parseDate';

const {
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
  VAULT_TRANSFER,
} = C;

export default (vault = {}, store) => {
  const range = 12;
  const { baseCurrency, overall, rates, txs, vaults } = store;
  const chart = {
    balance: new Array(range).fill(0),
    expenses: new Array(range).fill(0),
    incomes: new Array(range).fill(0),
    transfers: new Array(range).fill(0),
  };
  const now = parseDate();
  const lastYear = new Date(now.getFullYear(), now.getMonth() - 11, 1);

  filterTxs(txs, vault).forEach((tx) => {
    const { category, timestamp, type, value } = tx;

    const date = parseDate(timestamp);
    const index = date.getMonth() - lastYear.getMonth() + 12 * (date.getFullYear() - lastYear.getFullYear());

    const { currency } = vaults.find(({ hash }) => hash === tx.vault);
    const valueExchange = exchange(value, currency, baseCurrency, rates, timestamp);

    chart.balance[index] += type === EXPENSE ? -valueExchange : valueExchange;
    const isTransfer = category === VAULT_TRANSFER;

    if (isTransfer && type === EXPENSE) chart.transfers[index] += valueExchange;
    else if (!isTransfer && type === EXPENSE) chart.expenses[index] += valueExchange;
    else if (!isTransfer && type === INCOME) chart.incomes[index] += valueExchange;
  });

  let total = 0;

  return {
    ...chart,
    balance: chart.balance
      .map((value) => {
        total += value;
        return total;
      })
      .map((value, index) => {
        const baseBalance = vault.hash ? vault.chartBalance[index] : overall.chartBalance[index];
        return value !== 0 ? baseBalance + value : 0;
      }),
  };
};
