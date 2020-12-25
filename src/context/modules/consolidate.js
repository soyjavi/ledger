import { getMonthDiff } from '@common';

import { calcOverall } from './calcOverall';
import { calcVault } from './calcVault';

export const consolidate = ({
  rates = {},
  settings: { baseCurrency } = {},
  txs: [, ...baseTxs] = [],
  vaults: [genesisVault, ...baseVaults] = [],
} = {}) => {
  let txs = baseTxs.map(({ data = {}, hash, timestamp }) => ({ timestamp, ...data, hash }));
  let vaults = [];

  if (baseVaults.length > 0) {
    const { timestamp: genesisTimestamp } = genesisVault;

    const genesisDate = new Date(genesisTimestamp);
    const months = getMonthDiff(genesisDate, new Date());

    vaults = baseVaults.map(({ data = {}, hash, timestamp }) =>
      calcVault({
        baseCurrency,
        genesisDate,
        months,
        rates,
        txs,
        vault: { timestamp, ...data, hash },
      }),
    );
  }

  return {
    latestHash: {
      txs: txs.length > 0 ? txs.slice(-1).pop().hash : undefined,
      vaults: vaults.length > 0 ? vaults.slice(-1).pop().hash : undefined,
    },
    overall: calcOverall({ baseCurrency, rates, vaults }),
    txs,
    vaults,
  };
};
