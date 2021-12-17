import { getMonthDiff } from '@common';

import { calcOverall } from './calcOverall';
import { calcVault } from './calcVault';

export const consolidate = ({ rates = {}, settings = {}, txs: storeTxs = [], vaults: storeVaults = [] } = {}) => {
  const { baseCurrency } = settings;

  let txs = storeTxs.map(({ hash, timestamp, data = {}, ...others }) => ({
    hash,
    timestamp,
    ...others,
    ...data,
  }));

  let vaults = [];

  if (storeVaults.length > 0) {
    const { timestamp: blockTimestamp, data: { timestamp } = {} } = storeVaults[0].balance
      ? storeVaults[0]
      : storeVaults[1];
    const genesisDate = new Date(timestamp || blockTimestamp);
    const months = getMonthDiff(genesisDate, new Date());

    vaults = storeVaults.map(({ hash, timestamp, data = {}, ...others }) =>
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
    rates,
    settings,
    txs,
    vaults,
  };
};
