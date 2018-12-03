import { C } from '../../../common';

const { VAULT_TRANSFER, TX: { TYPE: { EXPENSE, INCOME } } } = C;

export default async ({
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
    category: VAULT_TRANSFER,
    previousHash,
    title: to.title,
    type: EXPENSE,
    value: parseFloat(value, 10),
    vault,
  });

  if (hash) {
    response = await onTransaction({
      category: VAULT_TRANSFER,
      previousHash: hash,
      title: from.title,
      type: INCOME,
      value: parseFloat(exchange, 10),
      vault: to.hash,
    });
  }

  return response;
};
