import { C } from '../../../common';

const { TX: { TYPE } } = C;

export default(txs, date, method = 'getDate') => {
  const days = Array(30).fill(0); // @TODO: Determine days

  txs.forEach(({ timestamp, type, value }) => {
    if (type === TYPE.EXPENSE) days[new Date(timestamp)[method]() + 1] += value;
  });

  return days;
};
