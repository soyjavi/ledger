import { createTransfer } from '@services';

export default ({
  props: { vault = {} },
  state: {
    form: { from, to, exchange, value },
  },
  store,
  snackbar,
}) =>
  createTransfer(store, snackbar, {
    vault: vault.hash,
    from,
    to,
    exchange,
    value,
  });
