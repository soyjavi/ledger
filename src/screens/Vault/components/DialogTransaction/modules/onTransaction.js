import { createTx } from '../../../../../services';

export default ({
  props: { vault },
  state: {
    category,
    coords = {},
    form: { value, title = '' },
    place,
    type,
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
