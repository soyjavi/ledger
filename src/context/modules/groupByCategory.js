import { exchange } from '../../common';
import sortByTimestamp from './sortByTimestamp';

// const sortByValue = (data = {}) => {
//   let keysSorted = {};

//   Object.keys(data)
//     .sort((a, b) => data[b] - data[a])
//     .forEach((key) => {
//       keysSorted = { ...keysSorted, [key.toString()]: data[key] };
//     });

//   return keysSorted;
// };

export default (state, filter) => {
  const {
    baseCurrency, rates, txs, vaults,
  } = state;
  const { date = (new Date().toISOString()).substr(0, 7) } = filter;
  const data = {};


  sortByTimestamp(txs, date).forEach(({
    category, title, type, value, vault,
  }) => {
    if (value && type === filter.type && category === parseInt(filter.category, 10)) {
      const { currency } = vaults.find(({ hash }) => vault === hash);
      const amount = baseCurrency === currency ? value : exchange(value, currency, baseCurrency, rates);

      if (title) {
        const categoryKey = title.split(' ')[0].toLowerCase();
        data[categoryKey] = (data[categoryKey] || 0) + amount;
      }
    }
  });

  return data;
};
