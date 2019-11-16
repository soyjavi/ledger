import { C } from '../../../common';

const {
  CURRENCY, VAULT_TRANSFER, WIPE, TX: { TYPE: { INCOME } },
} = C;

const MAX_DAYS = 3;

export default ({ txs = [], vaults = [] }) => {
  const dataSource = [];
  const offset = (new Date().getTimezoneOffset()) * 60 * 1000;
  let days = 0;
  let date;
  let dateIndex = 0;

  txs
    .slice(-32)
    .reverse()
    .filter(({ category, vault }) => category !== VAULT_TRANSFER && category !== WIPE && vault !== undefined)
    .some((tx) => {
      const { currency = CURRENCY } = vaults.find((vault) => vault.hash === tx.vault) || {};
      const txDate = new Date(new Date(tx.timestamp).getTime() - offset).toISOString().substr(0, 10);

      if (date !== txDate) {
        days += 1;
        date = txDate;
        dateIndex = dataSource.length;
        dataSource.push({ value: 0, timestamp: tx.timestamp, txs: [] });
      }

      if (tx.category !== VAULT_TRANSFER) {
        dataSource[dateIndex].value += tx.type === INCOME ? tx.value : -(tx.value);
      }

      dataSource[dateIndex].txs.push({ currency, ...tx });

      return days === MAX_DAYS;
    });

  return dataSource;
};
