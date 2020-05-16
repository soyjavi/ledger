import { C } from '@common';
import { createTx } from '@services';

const {
  TX: {
    TYPE: { INCOME, EXPENSE },
  },
  WIPE,
} = C;

export const onSubmit = async ({
  dataSource: { category, hash, value, vault, title, type },
  navigation: { showTx },
  snackbar,
  setBusy,
  setWipe,
  store,
  wipe = false,
}) => {
  setWipe(wipe);
  setBusy(true);
  const tx = await createTx(store, snackbar, {
    vault,
    category,
    value,
    title,
    type,
    ...(wipe ? { category: WIPE, tx: hash, type: type === EXPENSE ? INCOME : EXPENSE } : location),
  });
  setBusy(false);
  if (tx) showTx();
};
