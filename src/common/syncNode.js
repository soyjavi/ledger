import { ServiceNode } from '@services';

import { getSyncStatus } from './getSyncStatus';

const findHashIndex = (blockchain = [], latestHash) => blockchain.findIndex(({ hash }) => hash === latestHash);

const blocksToSync = (blockchain = [], latestHash) => blockchain.slice(findHashIndex(blockchain, latestHash) + 1);

// ! @TODO: use new system
export const syncNode = async (store) => {
  const { settings, txs, vaults } = store;
  const { txs: nodeTxs = {}, vaults: nodeVaults = {} } = (await ServiceNode.status({ settings })) || {};

  const vaultsToSync = blocksToSync(vaults, nodeVaults.latestHash);
  const txsToSync = blocksToSync(txs, nodeTxs.latestHash);

  if (vaultsToSync.length > 0 && txsToSync.length > 0) {
    await ServiceNode.sync({ settings, blockchain: { vaults, txs } });
  } else {
    if (vaultsToSync.length > 0) await ServiceNode.sync({ settings, key: 'vaults', blocks: vaultsToSync });
    if (txsToSync.length > 0) await ServiceNode.sync({ settings, key: 'txs', blocks: txsToSync });
  }

  return await getSyncStatus(store);
};
