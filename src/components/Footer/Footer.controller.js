import { signup, syncStatus, sync } from '@services';

const findHashIndex = (blockchain = [], latestHash) => blockchain.findIndex(({ hash }) => hash === latestHash);

const blocksToSync = (blockchain = [], latestHash) => blockchain.slice(findHashIndex(blockchain, latestHash) + 1);

const existsHash = (blockchain = [], latestHash) => findHashIndex(blockchain, latestHash) > 0;

export const isSynced = async ({ snackbar, store }) => {
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

  const response = await syncStatus({ settings, snackbar });
  if (response) {
    const { blocks = {}, latestHash = {} } = (await syncStatus({ settings, snackbar })) || {};
    const synced =
      blocks.txs === blockchain.txs.length &&
      blocks.vaults === blockchain.vaults.length &&
      latestHash.txs === txLatestHash &&
      latestHash.vaults === vaultLatestHash;
    return synced;
  } else return true;
};

export const syncNode = async ({
  store: {
    settings,
    blockchain: { vaults = [], txs = [] },
  },
  snackbar,
}) => {
  const { latestHash = {} } = (await syncStatus({ settings, snackbar })) || {};

  let synced;

  // Check if needs wipe
  const wipe = !existsHash(vaults, latestHash.vaults) || !existsHash(txs, latestHash.txs);
  if (wipe) await sync({ settings, blockchain: { vaults, txs } });
  else {
    await sync({ settings, key: 'vaults', blocks: blocksToSync(vaults, latestHash.vaults) });
    await sync({ settings, key: 'txs', blocks: blocksToSync(txs, latestHash.txs) });
  }
  synced = true;

  return synced;
};
