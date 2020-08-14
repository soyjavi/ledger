import { signup, getSyncStatus } from '@services';

export const nodeStatus = async ({ snackbar, store }) => {
  const {
    //
    blockchain = {},
    latestHash: { txs: txLatestHash, vaults: vaultLatestHash } = {},
    settings: { fingerprint },
    updateSettings,
  } = store;
  let { settings } = store;

  if (!settings.authorization) {
    const authorization = await signup({ fingerprint });
    if (authorization) {
      settings.authorization = authorization;
      await updateSettings({ authorization });
    }
  }

  const response = await getSyncStatus({ settings, snackbar });
  if (response) {
    const { blocks = {}, latestHash = {} } = (await getSyncStatus({ settings, snackbar })) || {};

    const synced =
      blocks.txs === blockchain.txs.length &&
      blocks.vaults === blockchain.vaults.length &&
      latestHash.txs === txLatestHash &&
      latestHash.vaults === vaultLatestHash;
    return synced;
  } else return true;
};
