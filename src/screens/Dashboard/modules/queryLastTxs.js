import { C } from '../../../common';

const { CURRENCY } = C;
const MAX_DAYS = 3;

export default ({ txs = [], vaults = [] }) => {
  const dataSource = [];
  const offset = new Date().getTimezoneOffset() * 60 * 1000;
  let days = 0;
  let date;
  let dateIndex = 0;

  txs
    .slice(-32)
    .reverse()
    .filter(({ vault }) => vault !== undefined)
    .some((tx) => {
      const { currency = CURRENCY } = vaults.find((vault) => vault.hash === tx.vault) || {};
      const txDate = new Date(new Date(tx.timestamp).getTime() - offset).toISOString().substr(0, 10);

      if (date !== txDate) {
        days += 1;
        date = txDate;
        dateIndex = dataSource.length;
        dataSource.push({ timestamp: tx.timestamp, txs: [] });
      }

      dataSource[dateIndex].txs.push({ currency, ...tx });

      return days > MAX_DAYS;
    });

  return dataSource;
};
