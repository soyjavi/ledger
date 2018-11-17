import { C } from '../../../common';

const { TX: { TYPE: { EXPENSE, INCOME } } } = C;

export default async ({
  l10n: { CATEGORIES: [EXPENSES, INCOMES] },
  props: { vault },
  state: {
    form: {
      from, to, exchange, value,
    },
  },
  store: { latestTransaction: { hash: previousHash }, onTransaction },
}) => {
  let response = {};

  const { hash } = await onTransaction({
    category: EXPENSES.length - 1,
    previousHash,
    title: to.title,
    type: EXPENSE,
    value: parseFloat(value, 10),
    vault,
  });

  if (hash) {
    response = await onTransaction({
      category: INCOMES.length - 1,
      previousHash: hash,
      title: from.title,
      type: INCOME,
      value: parseFloat(exchange, 10),
      vault: to.hash,
    });
  }

  return response;
};
