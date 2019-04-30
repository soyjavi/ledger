import { fetch } from '../../common';

export default async (component, pin) => {
  const { onError, state: { fingerprint, pin: storedPin } } = component;

  const response = await fetch({
    method: 'POST',
    service: storedPin ? 'signin' : 'signup',
    fingerprint,
    pin,
  }).catch(onError);

  return response && response.hash ? response.hash : undefined;
};
