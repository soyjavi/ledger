export const exchange = (value = 0, currency = 'USD', baseCurrency = 'EUR', rates = {}, timestamp) => {
  if (currency === baseCurrency || value === 0) return value;

  const keys = Object.keys(rates);
  const lastKey = keys[keys.length - 1];
  let key;

  if (timestamp) key = new Date(timestamp).toISOString().substr(0, 7);
  if (!timestamp && !keys.includes(key)) key = lastKey;

  if (!rates[key] || !rates[key][currency]) {
    const keyIndex = keys.indexOf(key);
    key = lastKey;

    keys.some((item, index) => {
      if (index > keyIndex && rates[item][currency]) {
        key = item;
        return true;
      }
      return false;
    });
  }

  return value / rates[key][currency];
};
