import parseDate from './parseDate';

export default (txs = [], vault = {}) => {
  const now = parseDate();
  const lastYear = new Date(now.getFullYear(), now.getMonth() - 11, 1);

  return txs
    .filter((tx) => vault.hash === undefined || vault.hash === tx.vault)
    .filter((tx) => {
      const { timestamp, value } = tx;

      const date = parseDate(timestamp);
      const month = date.getMonth() - lastYear.getMonth() + 12 * (date.getFullYear() - lastYear.getFullYear());

      return value && month >= 0;
    });
};
