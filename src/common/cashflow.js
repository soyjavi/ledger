import C from './constants';

const { TX: { TYPE } } = C;

export default (txs = []) => {
  let incomes = 0;
  let expenses = 0;

  txs.forEach(({ type, value }) => {
    if (type === TYPE.EXPENSE) expenses += value;
    else if (type === TYPE.INCOME) incomes += value;
  });

  return { incomes, expenses };
};
