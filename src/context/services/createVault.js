import { fetch } from '../../common';

export default async (component, props) => {
  const { onError, state: { hash } } = component;
  const headers = { authorization: hash };

  const vault = await fetch({
    method: 'POST', service: 'vault', headers, ...props,
  }).catch(onError);

  return vault;
};
