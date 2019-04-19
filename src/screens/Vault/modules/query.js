import { C } from '../../../common';

const { TX: { TYPE: { INCOME } } } = C;
const MAX_DAYS = 30;

export default (
  { l10n: { CATEGORIES = [] } = {} },
  { txs = [], search = '' },
) => {
  const dataSource = [];
  const hasSearch = search.length > 0;
  const offset = (new Date().getTimezoneOffset()) * 60 * 1000;
  let days = 0;
  let date;
  let dateIndex = 0;

  txs
    .slice(!hasSearch ? -128 : 0)
    .reverse()
    .some((tx) => {
      const title = tx.title ? tx.title.toLowerCase() : undefined;
      const category = CATEGORIES[tx.type] ? CATEGORIES[tx.type][tx.category].toLowerCase() : undefined;

      if (!hasSearch || (title && title.includes(search)) || (category && category.includes(search))) {
        const txDate = new Date(new Date(tx.timestamp).getTime() - offset).toISOString().substr(0, 10);

        if (date !== txDate) {
          days += 1;
          date = txDate;
          dateIndex = dataSource.length;
          dataSource.push({ value: 0, timestamp: tx.timestamp, txs: [] });
        }

        dataSource[dateIndex].value += tx.type === INCOME ? tx.value : -(tx.value);
        dataSource[dateIndex].txs.push(tx);
      }

      return days === MAX_DAYS && !hasSearch;
    });

  return dataSource;
};
