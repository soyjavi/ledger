import { getAuthorization, getSyncStatus } from '@services';

// import { isSynced } from './isSynced';

export const nodeStatus = async ({ snackbar, store }) => {
  const { blocks = {}, latestHash = {}, settings, updateSettings } = store;

  if (!settings.authorization) {
    // @TODO: Test this case
    const authorization = await getAuthorization(settings, snackbar);
    await updateSettings({ authorization });
  }

  const { blocks: nodeBlocks = {}, latestHash: nodeLatestHash = {} } =
    (await getSyncStatus({ settings, snackbar })) || {};

  const synced =
    nodeBlocks.txs === blocks.txs &&
    nodeBlocks.vaults === blocks.vaults &&
    nodeLatestHash.txs === latestHash.txs &&
    nodeLatestHash.vaults === latestHash.vaults;

  // const synced = isSynced({ store, node: await getSyncStatus({ settings, snackbar }) });

  return synced;
};
