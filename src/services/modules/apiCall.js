import { C } from '@common';

const { ENDPOINT } = C;
const DEFAULT_METHOD = 'GET';
const FORM_METHODS = ['POST', 'PUT'];

if (typeof global.self === 'undefined') global.self = global;

const apiCall = async ({ endpoint = ENDPOINT, headers, method = DEFAULT_METHOD, service, ...props }) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/${service}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...headers,
      },
      method,
      ...(FORM_METHODS.includes(method) ? { body: JSON.stringify(props) } : props),
    })
      .then(async (response) => {
        const json = await response.json();

        if (response.status >= 400) reject({ code: response.status, message: json.message });
        else resolve(json);
      })
      .catch(({ message = 'Something wrong happened. Try again.', response } = {}) => {
        reject({
          code: response ? response.status : 500,
          message,
        });
      });
  });

export { apiCall };
