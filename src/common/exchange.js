export default (value = 0, currency = 'USD', baseCurrency = 'EUR', rates = {}, timestamp) => {
  if (currency === baseCurrency) return value;

  const keys = Object.keys(rates);
  let key;

  if (timestamp) key = (new Date(timestamp)).toISOString().substr(0, 7);
  if (!timestamp && !keys.includes(key)) key = keys[keys.length - 1];

  return rates[key] ? value / rates[key][currency] : undefined;
};
