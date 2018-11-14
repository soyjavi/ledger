import { queryString } from '../reactor/common';

const { NODE_ENV } = process.env;
const DEFAULT_METHOD = 'GET';
const ENDPOINT = NODE_ENV === 'production' ? 'https://voltvault.glitch.me' : 'http://localhost:8080';
const FORM_METHODS = ['POST'];
const HEADER_JSON = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};
const HEADER_FORM = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
};

if (typeof global.self === 'undefined') global.self = global;

export default async ({
  endpoint = ENDPOINT, headers, method = DEFAULT_METHOD, service, ...props
}) => (
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/${service}`, {
      headers: {
        ...(FORM_METHODS.includes(method) ? HEADER_FORM : HEADER_JSON),
        ...headers,
      },
      method,
      ...(FORM_METHODS.includes(method) ? { body: queryString(props) } : props),
    })
      .then(async (response) => {
        const json = await response.json();

        if (response.status >= 400) reject({ code: response.status, message: json.message }); // eslint-disable-line
        else resolve(json);
      }).catch(({ message = 'ERROR_CONNECTION', response } = {}) => {
        reject({ // eslint-disable-line
          code: response ? response.status : 500,
          message,
        });
      });
  })
);
