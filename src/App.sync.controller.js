import { ServiceNode, ServiceRates } from '@services';

const findHashIndex = (blockchain = [], latestHash) => blockchain.findIndex(({ hash }) => hash === latestHash);

const blocksToSync = (blockchain = [], latestHash) => blockchain.slice(findHashIndex(blockchain, latestHash) + 1);

const existsHash = (blockchain = [], latestHash) => findHashIndex(blockchain, latestHash) > 0;

const parseVaults = (vaults = []) =>
  vaults.map(({ data: { balance = 0, title = '', ...data }, timestamp, ...others }) => ({
    ...others,
    timestamp: new Date(timestamp).getTime(),
    data: { ...data, balance: balance === null || !balance ? 0 : balance, title },
  }));

const parseTxs = (txs = []) =>
  txs.map(({ data: { value = 0, title = '', ...data }, timestamp, ...others }) => ({
    ...others,
    timestamp: new Date(timestamp).getTime(),
    data: { ...data, balance: value === null || !value ? 0 : value, title },
  }));

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
  const { blockchain, settings } = store;

  const txs = blockchain.get('txs').blocks.slice(1);
  const vaults = blockchain.get('vaults').blocks.slice(1);

  const { txs: nodeTxs = {}, vaults: nodeVaults = {} } = (await ServiceNode.status({ settings, snackbar })) || {};

  const rebase = !existsHash(vaults, nodeVaults.latestHash) || !existsHash(txs, nodeTxs.latestHash);
  if (rebase) {
    await ServiceNode.sync({ settings, blockchain: { vaults: parseVaults(vaults), txs: parseTxs(txs) } });
  } else {
    const vaultsToSync = blocksToSync(vaults, nodeVaults.latestHash);
    if (vaultsToSync.length > 0) await ServiceNode.sync({ settings, key: 'vaults', blocks: parseVaults(vaultsToSync) });
    const txsToSync = blocksToSync(txs, nodeTxs.latestHash);
    if (txsToSync.length > 0) await ServiceNode.sync({ settings, key: 'txs', blocks: parseTxs(txsToSync) });
  }

  return await getSyncStatus({ snackbar, store });
};

export { getRates, getSyncStatus, syncNode };
