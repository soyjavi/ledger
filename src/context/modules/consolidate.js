import calcOverall from './calcOverall';
import calcVault from './calcVault';

export default ({ rates = {}, settings: { baseCurrency } = {}, ...blockchain } = {}) => {
  const txs = (blockchain.txs || []).slice(1).map(({ data = {}, hash, timestamp }) => ({ ...data, hash, timestamp }));
  const vaults = (blockchain.vaults || []).slice(1).map(({ data = {}, timestamp, hash }) =>
    calcVault({
      baseCurrency,
      rates,
      txs,
      vault: { ...data, timestamp, hash },
    }),
  );

  return {
    blockchain,
    latestHash: {
      txs: blockchain.txs && blockchain.txs.length > 0 ? blockchain.txs.slice(-1).pop().hash : undefined,
      vaults: blockchain.vaults && blockchain.vaults.length > 0 ? blockchain.vaults.slice(-1).pop().hash : undefined,
    },
    overall: calcOverall({ baseCurrency, rates, vaults }),
    txs,
    vaults,
  };
};
