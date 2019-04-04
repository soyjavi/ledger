import { C, exchange } from '../../../common';

const {
  MS_IN_WEEK, TX: { TYPE: { EXPENSE, INCOME } }, VAULT_TRANSFER, WIPE,
} = C;
const CURRENT_MONTH = 11;
const CURRENT_WEEK = 0;

export default (store, { month = true, week = undefined } = {}) => {
  const {
    baseCurrency, rates, txs, vaults,
  } = store;
  const values = { [EXPENSE]: {}, [INCOME]: {} };
  const now = new Date();
  const lastYear = new Date(now.getFullYear(), now.getMonth() - 11, 1);

  txs.forEach(({
    category, timestamp, type, value, vault, title,
  }) => {
    const date = new Date(timestamp);
    const ms = Math.abs(now - date);
    const weekNumber = Math.floor(ms / MS_IN_WEEK);
    const monthNumber = date.getMonth() - lastYear.getMonth() + (12 * (date.getFullYear() - lastYear.getFullYear()));

    if ((month && monthNumber === CURRENT_MONTH) || (week && weekNumber === CURRENT_WEEK)) {
      const { currency } = vaults.find(({ hash }) => hash === vault);
      const valueExchange = currency !== baseCurrency
        ? exchange(value, currency, baseCurrency, rates)
        : undefined;


      if (category !== VAULT_TRANSFER && category !== WIPE) {
        const categoryKey = title.toLowerCase();

        values[type][category] = values[type][category] || {};
        values[type][category][categoryKey] = (values[type][category][categoryKey] || 0) + (valueExchange || value);
      }
    }
  });

  return values;
};
