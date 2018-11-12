import C from './constants';

const { TX: { TYPE } } = C;

export default (txs = []) => {
  let income = 0;
  let expenses = 0;

  txs.forEach(({ type, value }) => {
    if (type === TYPE.EXPENSE) expenses += value;
    else if (type === TYPE.INCOME) income += value;
  });

  return { income, expenses };
};
