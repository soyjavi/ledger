import { ServiceNode } from '@services';

export const getSyncStatus = async ({ latestHash = {}, settings, txs, updateSettings, vaults }) => {
  const node = await ServiceNode.status({ settings }).catch(async (error) => {
    if (error.code === 403) {
      const { fingerprint } = settings;

      const authorization = await ServiceNode.signup({ fingerprint }).catch(() => {});
      if (authorization) {
        settings.authorization = authorization;
        await updateSettings({ authorization });
      }
    }
  });

  const synced = node
    ? node.txs.length === txs.length &&
      node.vaults.length === vaults.length &&
      node.txs.latestHash === latestHash.txs &&
      node.vaults.latestHash === latestHash.vaults
    : undefined;

  return { synced, node };
};
