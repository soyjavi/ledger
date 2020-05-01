import { createTx } from '@services';

export default ({
  props: { vault, type },
  state: {
    coords = {},
    form: { category, value, title = '' },
    place,
  },
  store,
  snackbar,
}) =>
  createTx(store, snackbar, {
    category,
    title,
    type,
    value: parseFloat(value, 10),
    vault,
    place,
    ...coords,
  });
