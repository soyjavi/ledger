import { fetch } from '../../common';

export default async (component, props) => {
  const { onError, state: { authorization, secret, txs = [] } } = component;
  const { hash: previousHash } = txs[txs.length - 1] || {};

  const tx = await fetch({
    method: 'POST',
    service: 'transaction',
    headers: { authorization, secret },
    previousHash,
    ...props,
  }).catch(onError);

  return tx;
};
