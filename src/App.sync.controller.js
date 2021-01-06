import { ServiceNode, ServiceRates } from '@services';

const findHashIndex = (blockchain = [], latestHash) => blockchain.findIndex(({ hash }) => hash === latestHash);

const blocksToSync = (blockchain = [], latestHash) => blockchain.slice(findHashIndex(blockchain, latestHash) + 1);

const existsHash = (blockchain = [], latestHash) => findHashIndex(blockchain, latestHash) > 0;

const getRates = async ({
  l10n,
  snackbar,
  store: {
    settings: { baseCurrency },
    updateRates,
  },
}) => {
  const rates = await ServiceRates.get({ baseCurrency, latest: true }).catch(() =>
    snackbar.error(l10n.ERROR_SERVICE_RATES),
  );
  if (rates) await updateRates(rates);
};

const getSyncStatus = async ({ snackbar, store }) => {
  const {
    latestHash = {},
    settings: { fingerprint },
    txs = [],
    updateSettings,
    vaults = [],
  } = store;
  let { settings } = store;
  let synced;

  const response = await ServiceNode.status({ settings, snackbar }).catch(async (error) => {
    if (error.code === 403) {
      const authorization = await ServiceNode.signup({ fingerprint }).catch(() => {});
      if (authorization) {
        settings.authorization = authorization;
        await updateSettings({ authorization });
      }
    }
  });

  if (response) {
    const { txs: nodeTxs, vaults: nodeVaults } = response;

    synced =
      nodeTxs.length === txs.length &&
      nodeVaults.length === vaults.length &&
      nodeTxs.latestHash === latestHash.txs &&
      nodeVaults.latestHash === latestHash.vaults;
  }

  return synced;
};

const syncNode = async ({ store, snackbar }) => {
  const { settings, txs = [], vaults = [] } = store;

  const { latestHash = {} } = (await ServiceNode.status({ settings, snackbar })) || {};

  const rebase = !existsHash(vaults, latestHash.vaults) || !existsHash(txs, latestHash.txs);
  if (rebase) await ServiceNode.sync({ settings, blockchain: { vaults, txs } });
  else {
    const vaultsToSync = blocksToSync(vaults, latestHash.vaults);
    if (vaultsToSync.length > 0) await ServiceNode.sync({ settings, key: 'vaults', blocks: vaultsToSync });
    const txsToSync = blocksToSync(txs, latestHash.txs);
    if (txsToSync.length > 0) await ServiceNode.sync({ settings, key: 'txs', blocks: txsToSync });
  }
  return await getSyncStatus({ snackbar, store });
};

export { getRates, getSyncStatus, syncNode };
