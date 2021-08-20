import { L10N } from '@common';
import { ServiceNode, ServiceRates } from '@services';

import { Notification } from '../Notification';

const findHashIndex = (blockchain = [], latestHash) => blockchain.findIndex(({ hash }) => hash === latestHash);

const blocksToSync = (blockchain = [], latestHash) => blockchain.slice(findHashIndex(blockchain, latestHash) + 1);

const parseBlocks = (values = [], field) =>
  values.map(({ data = {}, timestamp, ...others }) => ({
    ...others,
    timestamp: new Date(timestamp).getTime(),
    data:
      typeof data === 'string' ? data : { ...data, [field]: data[field] === null || !data[field] ? 0 : data[field] },
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
  const txs = blockchain.get('txs').blocks;
  const vaults = blockchain.get('vaults').blocks;
  const { txs: nodeTxs = {}, vaults: nodeVaults = {} } = (await ServiceNode.status({ settings })) || {};

  const vaultsToSync = parseBlocks(blocksToSync(vaults, nodeVaults.latestHash), 'balance');
  const txsToSync = parseBlocks(blocksToSync(txs, nodeTxs.latestHash), 'value');

  if (vaultsToSync.length > 0 && txsToSync.length > 0) {
    await ServiceNode.sync({ settings, blockchain: { vaults: vaultsToSync, txs: txsToSync } });
  } else {
    if (vaultsToSync.length > 0) await ServiceNode.sync({ settings, key: 'vaults', blocks: vaultsToSync });
    if (txsToSync.length > 0) await ServiceNode.sync({ settings, key: 'txs', blocks: txsToSync });
  }

  return await getSyncStatus({ store });
};

export { getRates, getSyncStatus, syncNode };
