import { C } from '../../../common';

const { TX: { TYPE: { TRANSFER_EXPENSE, TRANSFER_INCOME } } } = C;

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
    previousHash,
    title: to.title,
    type: TRANSFER_EXPENSE,
    value: parseFloat(value, 10),
    vault,
  });

  if (hash) {
    response = await onTransaction({
      previousHash: hash,
      title: from.title,
      type: TRANSFER_INCOME,
      value: parseFloat(exchange, 10),
      vault: to.hash,
    });
  }

  return response;
};
