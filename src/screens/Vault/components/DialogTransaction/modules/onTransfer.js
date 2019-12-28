import { createTransfer } from '../../../../../services';

export default ({
  props: { vault },
  state: {
    form: {
      from, to, exchange, value,
    },
  },
  store,
}) => createTransfer(store, {
  vault, from, to, exchange, value,
});
