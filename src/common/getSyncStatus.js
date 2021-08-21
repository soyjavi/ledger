import { ServiceNode } from '@services';

export const getSyncStatus = async ({ latestHash = {}, settings, txs, vaults }) => {
  const node = await ServiceNode.status({ settings }).catch(() => {});

  const synced = node
    ? node.txs.length === txs.length &&
      node.vaults.length === vaults.length &&
      node.txs.latestHash === latestHash.txs &&
      node.vaults.latestHash === latestHash.vaults
    : undefined;

  return { synced, node };
};
