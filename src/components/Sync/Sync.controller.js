import { L10N } from '@common';
import { ServiceNode, ServiceRates } from '@services';

import { Notification } from '../Notification';

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
  Stack,
  store: {
    settings: { baseCurrency },
    updateRates,
  },
}) => {
  const rates = await ServiceRates.get({ baseCurrency, latest: true }).catch(() =>
    Stack.alert('rates', Notification, { text: L10N.ERROR_SERVICE_RATES, timeoutClose: 10000 }),
  );
  if (rates) await updateRates(rates);
};

const getSyncStatus = async ({ store }) => {
  const {
    latestHash = {},
    settings: { fingerprint },
    txs = [],
    updateSettings,
    vaults = [],
  } = store;
  let { settings } = store;
  let synced;

  const response = await ServiceNode.status({ settings }).catch(async (error) => {
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

const syncNode = async ({ store }) => {
  const { blockchain, settings } = store;

  const txs = blockchain
    .get('txs')
    .blocks.slice(1)
    .filter(({ data: { value } }) => value !== undefined);

  const vaults = blockchain.get('vaults').blocks.slice(1);

  const { txs: nodeTxs = {}, vaults: nodeVaults = {} } = (await ServiceNode.status({ settings })) || {};

  const rebase =
    !existsHash(vaults, nodeVaults.latestHash) ||
    !existsHash(txs, nodeTxs.latestHash) ||
    txs.length !== nodeTxs.length ||
    vaults.length !== nodeVaults.length;

  if (rebase) {
    await ServiceNode.sync({ settings, blockchain: { vaults: parseVaults(vaults), txs: parseTxs(txs) } });
  } else {
    const vaultsToSync = blocksToSync(vaults, nodeVaults.latestHash);
    if (vaultsToSync.length > 0) await ServiceNode.sync({ settings, key: 'vaults', blocks: parseVaults(vaultsToSync) });
    const txsToSync = blocksToSync(txs, nodeTxs.latestHash);
    if (txsToSync.length > 0) await ServiceNode.sync({ settings, key: 'txs', blocks: parseTxs(txsToSync) });
  }

  return await getSyncStatus({ store });
};

export { getRates, getSyncStatus, syncNode };
