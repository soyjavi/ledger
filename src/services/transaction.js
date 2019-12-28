import { C } from '../common';
import { apiCall, composeHeaders } from './modules';

const { VAULT_TRANSFER, TX: { TYPE: { EXPENSE, INCOME } } } = C;

const createTx = async (store, props, save = true) => {
  const { onError, txs = [] } = store;
  const { hash: previousHash } = txs[txs.length - 1] || {};

  const tx = await apiCall({
    method: 'POST',
    service: 'transaction',
    headers: composeHeaders(store),
    previousHash,
    ...props,
  }).catch(onError);

  if (save) store.save({ txs: [...txs, tx] });

  return tx;
};

const createTransfer = async (store, props) => {
  const {
    vault, from, to, exchange, value,
  } = props;

  const fromTx = await createTx(
    store, {
      category: VAULT_TRANSFER, title: to.title, type: EXPENSE, value: parseFloat(value, 10), vault,
    },
    false,
  );

  if (fromTx) {
    const { onError, txs = [] } = store;
    const toTx = await apiCall({
      method: 'POST',
      service: 'transaction',
      headers: composeHeaders(store),
      category: VAULT_TRANSFER,
      title: from.title,
      type: INCOME,
      value: parseFloat(exchange, 10),
      vault: to.hash,
      previousHash: fromTx.hash,
    }).catch(onError);

    store.save({ txs: [...txs, fromTx, toTx] });

    return [toTx, fromTx];
  }
};

export { createTx, createTransfer };
