import { fetch } from '../../common';

export default async (component) => {
  const { onError, state: { fingerprint } } = component;

  const response = await fetch({
    method: 'POST',
    service: 'signup',
    fingerprint,
  }).catch(onError);

  return response && response.hash ? response.hash : undefined;
};
