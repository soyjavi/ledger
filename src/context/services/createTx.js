import { fetch } from '../../common';

export default async (component, props) => {
  const { onError, state: { hash, txs = [] } } = component;
  const headers = { authorization: hash };
  const { hash: previousHash } = txs[txs.length - 1] || {};

  const tx = await fetch({
    method: 'POST', service: 'transaction', headers, previousHash, ...props,
  }).catch(onError);

  return tx;
};
