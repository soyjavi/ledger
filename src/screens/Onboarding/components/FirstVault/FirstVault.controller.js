import { L10N } from '@common';
import { ServiceRates, ServiceNode } from '@services';

export const fetchRates = async ({ snackbar, store: { settings, updateRates } }) => {
  const rates = await ServiceRates.get(settings).catch(() => snackbar.alert({ text: L10N.ERROR_SERVICE_RATES }));
  if (rates) updateRates(rates);
};

export const createVault = async ({ form, store: { addVault, blockchain, settings } }) => {
  if (settings.authorization) {
    await ServiceNode.sync({ key: 'vaults', blocks: blockchain.vaults, settings });
    await ServiceNode.sync({ key: 'txs', blocks: blockchain.txs, settings });
  }

  return addVault(form);
};
