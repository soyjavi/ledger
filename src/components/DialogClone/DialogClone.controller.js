import { C } from '@common';

const {
  TX: {
    TYPE: { INCOME, EXPENSE },
  },
  WIPE,
} = C;

const createTx = async ({
  dataSource: { category, hash, location, value, vault, title, type },
  store: { addTx },
  wipe = false,
}) =>
  await addTx({
    category,
    title,
    type,
    value,
    vault: vault,
    ...(wipe ? { category: WIPE, tx: hash, type: type === EXPENSE ? INCOME : EXPENSE } : { location }),
  });

export { createTx };
