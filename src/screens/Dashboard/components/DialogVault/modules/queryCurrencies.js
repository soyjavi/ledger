export default ({ baseCurrency, rates = {} }) => {
  const keys = Object.keys(rates);

  return [...new Set([baseCurrency, ...Object.keys(rates[keys[keys.length - 1]])])];
};
