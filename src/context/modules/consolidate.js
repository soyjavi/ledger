import { getMonthDiff } from '@common';

import { calcOverall } from './calcOverall';
import { calcVault } from './calcVault';

export const consolidate = ({
  rates = {},
  settings: { baseCurrency } = {},
  txs: baseTxs = [],
  vaults: baseVaults = [],
} = {}) => {
  let txs = baseTxs.map(({ hash, timestamp, data = {}, ...others }) => ({
    hash,
    timestamp,
    ...others,
    ...data,
  }));

  let vaults = [];

  if (baseVaults.length > 0) {
    const { timestamp: blockTimestamp, data: { timestamp } = {} } = baseVaults[0].balance
      ? baseVaults[0]
      : baseVaults[1];
    const genesisDate = new Date(timestamp || blockTimestamp);
    const months = getMonthDiff(genesisDate, new Date());

    vaults = baseVaults.map(({ hash, timestamp, data = {}, ...others }) =>
      calcVault({
        baseCurrency,
        genesisDate,
        months,
        rates,
        txs,
        vault: { hash, timestamp, ...data, ...others },
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
