export const getLastRates = (rates = []) => {
  if (rates.length === 0) return rates;

  const keys = Object.keys(rates);

  return rates[keys[keys.length - 1]];
};
