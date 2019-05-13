export default ({ baseCurrency, rates = {} }) => [...new Set([baseCurrency, ...Object.keys(rates)])];
