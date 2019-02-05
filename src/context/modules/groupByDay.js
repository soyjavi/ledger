import { C } from '../../common';
import sortByTimestamp from './sortByTimestamp';

const { VAULT_TRANSFER, TX: { TYPE: { INCOME } } } = C;
const MAX_DAYS = 31;

export default ({ txs }, { l10n: { CATEGORIES = [] } = {}, search = '', vault }) => {
  const dataSource = [];
  const hasSearch = search.length > 0;
  const offset = (new Date().getTimezoneOffset()) * 60 * 1000;
  let days = 0;
  let group;
  let groupIndex = 0;

  sortByTimestamp(txs).some((tx) => {
    if (vault === tx.vault) {
      const title = tx.title ? tx.title.toLowerCase() : undefined;
      const category = CATEGORIES[tx.type] ? CATEGORIES[tx.type][tx.category].toLowerCase() : undefined;

      if (!hasSearch || (title && title.includes(search)) || (category && category.includes(search))) {
        const txDate = new Date(new Date(tx.timestamp).getTime() - offset).toISOString().substr(0, 10);

        if (group !== txDate) {
          days += 1;
          if (dataSource.length > 0) dataSource[dataSource.length - 1].last = true;

          group = txDate;
          groupIndex = dataSource.length;
          dataSource.push({ progression: 0, timestamp: tx.timestamp });
        }

        if (tx.category !== VAULT_TRANSFER) {
          dataSource[groupIndex].progression += tx.type === INCOME ? tx.value : -(tx.value);
        }

        dataSource.push(tx);
      }
    }

    return days === MAX_DAYS;
  });

  if (dataSource.length > 0) dataSource[dataSource.length - 1].last = true;

  return dataSource;
};
