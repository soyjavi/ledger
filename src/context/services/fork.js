import { fetch } from '../../common';

export default async (component, query = '') => {
  const { onError, state: { authorization, secret } } = component;
  const [secure, file] = query.split('|');

  console.log({ query, secure, file });

  const response = await fetch({
    method: 'POST',
    service: 'fork',
    headers: { authorization, secret },
    secure,
    file,
  }).catch(onError);

  return response;
};
