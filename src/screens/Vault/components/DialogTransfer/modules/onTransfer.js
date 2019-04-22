import { C } from '../../../../../common';

const { VAULT_TRANSFER, TX: { TYPE: { EXPENSE, INCOME } } } = C;

export default async ({
  props: { vault },
  state: {
    form: {
      from, to, exchange, value,
    },
  },
  store: { onTransaction },
}) => {
  let response = await onTransaction({
    category: VAULT_TRANSFER,
    title: to.title,
    type: EXPENSE,
    value: parseFloat(value, 10),
    vault,
  });

  if (response) {
    response = await onTransaction({
      category: VAULT_TRANSFER,
      title: from.title,
      type: INCOME,
      value: parseFloat(exchange, 10),
      vault: to.hash,
    });
  }

  return response;
};
