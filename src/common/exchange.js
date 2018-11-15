export default (value = 0, base = 'USD', currency = 'EUR', rates = {}) => (
  base === currency
    ? value
    : value / rates[base]
);
