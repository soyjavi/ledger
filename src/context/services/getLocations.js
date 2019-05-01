import { fetch } from '../../common';

export default async (component, query) => {
  const { onError, state: { hash } } = component;
  const headers = { authorization: hash };
  const today = new Date();
  const { year = today.getFullYear(), month = today.getMonth() } = query;

  const response = await fetch({
    service: 'locations',
    headers,
    year,
    month,
  }).catch(onError);

  return response;
};
