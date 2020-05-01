export const getLastRates = (rates) => {
  const keys = Object.keys(rates);

  return rates[keys[keys.length - 1]];
};
