export default (value = 0, currency = 'USD', baseCurrency = 'EUR', rates = {}) => (
  currency === baseCurrency
    ? value
    : value / rates[currency]
);
