import { ServiceNode } from '@services';

import { getSyncStatus } from './getSyncStatus';

const findHashIndex = (blockchain = [], latestHash) => blockchain.findIndex(({ hash }) => hash === latestHash);

const blocksToSync = (blockchain = [], latestHash) => blockchain.slice(findHashIndex(blockchain, latestHash) + 1);

const parseBlocks = (values = [], field) =>
  values.map(({ data = {}, timestamp, ...others }) => ({
    ...others,
    timestamp: new Date(timestamp).getTime(),
    data:
      typeof data === 'string' ? data : { ...data, [field]: data[field] === null || !data[field] ? 0 : data[field] },
  }));

export const syncNode = async (store) => {
  const { blockchain, settings } = store;
  const txs = blockchain.get('txs').blocks;
  const vaults = blockchain.get('vaults').blocks;
  const { txs: nodeTxs = {}, vaults: nodeVaults = {} } = (await ServiceNode.status({ settings })) || {};

  const vaultsToSync = blocksToSync(vaults, nodeVaults.latestHash);
  const txsToSync = blocksToSync(txs, nodeTxs.latestHash);

  if (vaultsToSync.length > 0 && txsToSync.length > 0) {
    await ServiceNode.sync({
      settings,
      blockchain: { vaults: parseBlocks(vaults, 'balance'), txs: parseBlocks(txs, 'value') },
    });
  } else {
    if (vaultsToSync.length > 0)
      await ServiceNode.sync({ settings, key: 'vaults', blocks: parseBlocks(vaultsToSync, 'balance') });
    if (txsToSync.length > 0) await ServiceNode.sync({ settings, key: 'txs', blocks: parseBlocks(txsToSync, 'value') });
  }

  return await getSyncStatus(store);
};
