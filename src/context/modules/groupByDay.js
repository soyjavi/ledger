import { C } from '../../common';
import sortByTimestamp from './sortByTimestamp';

const { TX: { TYPE: { INCOME } } } = C;
const MAX_DAYS = 60;

export default ({ txs }, { l10n: { CATEGORIES = [] } = {}, search = '', vault }) => {
  const dataSource = [];
  const hasSearch = search.length > 0;
  const offset = (new Date().getTimezoneOffset()) * 60 * 1000;
  let days = 0;
  let date;
  let dateIndex = 0;
  let month;

  sortByTimestamp(txs).some((tx) => {
    if (vault === tx.vault) {
      const title = tx.title ? tx.title.toLowerCase() : undefined;
      const category = CATEGORIES[tx.type] ? CATEGORIES[tx.type][tx.category].toLowerCase() : undefined;

      if (!hasSearch || (title && title.includes(search)) || (category && category.includes(search))) {
        const txMonth = new Date(new Date(tx.timestamp).getTime() - offset).toISOString().substr(0, 7);
        const txDate = new Date(new Date(tx.timestamp).getTime() - offset).toISOString().substr(0, 10);

        if (month !== txMonth) {
          month = txMonth;
          dataSource.push({ heading: true, timestamp: tx.timestamp });
        }

        if (date !== txDate) {
          days += 1;
          date = txDate;
          dateIndex = dataSource.length;
          dataSource.push({ value: 0, timestamp: tx.timestamp, txs: [] });
        }

        dataSource[dateIndex].value += tx.type === INCOME ? tx.value : -(tx.value);

        dataSource[dateIndex].txs.push(tx);
      }
    }

    return days === MAX_DAYS;
  });

  return dataSource;
};
