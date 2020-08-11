import { C } from '@common';

const {
  TX: {
    TYPE: { INCOME, EXPENSE },
  },
  WIPE,
} = C;

export const onSubmit = async ({
  dataSource: { category, hash, location, value, vault, title, type },
  navigation: { showTx },
  setBusy,
  store: { addTx },
  wipe = false,
}) => {
  setBusy(true);
  const tx = await addTx({
    category,
    title,
    type,
    value,
    vault: vault,
    ...(wipe ? { category: WIPE, tx: hash, type: type === EXPENSE ? INCOME : EXPENSE } : { location }),
  });

  if (tx) showTx();
  setBusy(false);
};
