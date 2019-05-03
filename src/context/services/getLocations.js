import { fetch } from '../../common';

export default async (component, query = {}) => {
  const { onError, state: { hash } } = component;
  const headers = { authorization: hash };
  const queryString = Object.keys(query)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join('&');

  const response = await fetch({ service: `locations?${queryString}`, headers }).catch(onError);

  return response;
};
