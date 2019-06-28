import { fetch } from '../../common';

export default async (component, props) => {
  const { onError, state: { authorization, secret } } = component;

  const vault = await fetch({
    method: 'POST',
    service: 'vault',
    headers: { authorization, secret },
    ...props,
  }).catch(onError);

  return vault;
};
