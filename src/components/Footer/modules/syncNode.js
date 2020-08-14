import { getSyncStatus, sync } from '@services';

const blocksToSync = (blockchain = [], latestHash) => {
  const index = blockchain.findIndex(({ hash }) => hash === latestHash);

  return blockchain.slice(index + 1);
};

export const syncNode = async ({
  store: {
    settings,
    blockchain: { vaults = [], txs = [] },
  },
  snackbar,
}) => {
  const common = { settings, snackbar };
  const { latestHash = {} } = (await getSyncStatus({ settings, snackbar })) || {};

  let synced;
  await sync({ ...common, key: 'txs', blocks: blocksToSync(txs, latestHash.txs) });
  await sync({ ...common, key: 'vaults', blocks: blocksToSync(vaults, latestHash.vaults) });
  synced = true;

  return synced;
};
