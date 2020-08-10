import calcOverall from './calcOverall';
import calcVault from './calcVault';

export default ({ rates = {}, settings: { baseCurrency } = {}, vaults: rawVaults = [], txs: rawTxs = [] } = {}) => {
  const txs = rawTxs.slice(1).map(({ data = {}, hash, timestamp }) => ({ ...data, hash, timestamp }));

  const vaults = rawVaults.slice(1).map(({ data }) =>
    calcVault({
      baseCurrency,
      rates,
      txs,
      vault: data,
    }),
  );

  return {
    overall: calcOverall({ baseCurrency, rates, vaults }),
    txs,
    vaults,
  };
};
