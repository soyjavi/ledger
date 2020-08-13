import { getSyncStatus, sync } from '@services';

export const syncNode = async ({ store: { settings, vaults, txs }, snackbar }) => {
  let synced;

  const { latestHash = {} } = (await getSyncStatus({ settings, snackbar })) || {};

  
  console.log(':::: syncNode ::::', { latestHash, vaults, txs });
  // synced = await sync({ key, blocks, settings, snackbar });

  return synced;
};
