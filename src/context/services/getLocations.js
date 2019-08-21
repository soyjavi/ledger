import { fetch } from '../../common';

export default async (component, query = {}) => {
  const { onError, state: { authorization, secret } } = component;
  const queryString = Object.keys(query)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join('&');

  const response = await fetch({
    service: `locations?${queryString}`,
    headers: { authorization, secret },
  }).catch(onError);

  return response;
};
