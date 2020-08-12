import { getAuthorization, getSyncState } from '@services';

export const handleSync = async ({ connected, snackbar, store }) => {
  if (connected) {
    const {
      //
      latestTx,
      latestVault,
      settings,
      txs: localTxs,
      updateSettings,
      vaults: localVaults,
    } = store;

    if (!settings.authorization) {
      updateSettings('authorization', await getAuthorization(settings, snackbar));
      return undefined;
    }

    const state = await getSyncState({ settings, snackbar });
    if (state) {
      const { vaults: serverVaults, txs: serverTxs } = state;
      const totalBlocks = localVaults.length + localTxs.length;
      const totalServerBlocks = serverTxs.length + serverVaults.length;

      const synced =
        totalServerBlocks === totalBlocks &&
        serverTxs.latestHash === latestTx.hash &&
        serverVaults.latestHash === latestVault.hash;

      return synced;
    }
  }
};
