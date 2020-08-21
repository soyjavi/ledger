import { signup, syncStatus, sync } from '@services';

const findHashIndex = (blockchain = [], latestHash) => blockchain.findIndex(({ hash }) => hash === latestHash);

const blocksToSync = (blockchain = [], latestHash) => blockchain.slice(findHashIndex(blockchain, latestHash) + 1);

const existsHash = (blockchain = [], latestHash) => findHashIndex(blockchain, latestHash) > 0;

export const getSyncStatus = async ({ setState, STATE, snackbar, store }) => {
  const {
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

  const { blocks = {}, latestHash = {} } = (await syncStatus({ settings, snackbar }).catch(() => {})) || {};
  const synced =
    blocks.txs === blockchain.txs.length &&
    blocks.vaults === blockchain.vaults.length &&
    latestHash.txs === txLatestHash &&
    latestHash.vaults === vaultLatestHash;
  return synced;
};

export const syncNode = async ({ store, snackbar }) => {
  const {
    settings,
    blockchain: { vaults = [], txs = [] },
  } = store;
  const { latestHash = {} } = (await syncStatus({ settings, snackbar })) || {};

  const rebase = !existsHash(vaults, latestHash.vaults) || !existsHash(txs, latestHash.txs);
  if (rebase) await sync({ settings, blockchain: { vaults, txs } });
  else {
    const vaultsToSync = blocksToSync(vaults, latestHash.vaults);
    if (vaultsToSync.length > 0) await sync({ settings, key: 'vaults', blocks: vaultsToSync });
    const txsToSync = blocksToSync(txs, latestHash.txs);
    if (txsToSync.length > 0) await sync({ settings, key: 'txs', blocks: txsToSync });
  }
  return await getSyncStatus({ snackbar, store });
};
