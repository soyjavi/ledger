export default (baseCurrency, rates = {}) => {
  const keys = Object.keys(rates);

  return keys.length > 0
    ? [...new Set([baseCurrency, ...Object.keys(rates[keys[keys.length - 1]])])]
    : [];
};
