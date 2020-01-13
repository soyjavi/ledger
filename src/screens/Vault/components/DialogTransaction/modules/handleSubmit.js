import { C } from '../../../../../common';

import onTransaction from './onTransaction';
import onTransfer from './onTransfer';

const {
  TX: {
    TYPE: { EXPENSE, TRANSFER },
  },
} = C;

const INITIAL_STATE = {
  busy: false,
  category: undefined,
  form: {},
  type: EXPENSE,
  valid: false,
};

export default async ({ props, snackbar, setBusy, setState, state, store }) => {
  setBusy(true);
  const method = state.type === TRANSFER ? onTransfer : onTransaction;
  const value = await method({
    props,
    snackbar,
    state,
    store,
  });
  if (value) props.onClose();
  setBusy(false);
  setState(INITIAL_STATE);
};