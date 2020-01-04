export default (values = {}) =>
  Object.keys(values)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(values[k])}`)
    .join('&');
