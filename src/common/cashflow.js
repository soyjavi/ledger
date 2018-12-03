import C from './constants';

const { VAULT_TRANSFER, TX: { TYPE } } = C;

export default (txs = []) => {
  let incomes = 0;
  let expenses = 0;

  txs.forEach(({ category, type, value }) => {
    if (category !== VAULT_TRANSFER) {
      if (type === TYPE.EXPENSE) expenses += value;
      else if (type === TYPE.INCOME) incomes += value;
    }
  });

  return { incomes, expenses };
};
