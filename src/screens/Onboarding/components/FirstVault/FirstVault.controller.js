import { ServiceRates, sync } from '@services';

export const fetchRates = async ({ l10n, snackbar, store: { settings, updateRates } }) => {
  const rates = await ServiceRates.get(settings).catch(() => snackbar.error(l10n.ERROR_SERVICE_RATES));
  if (rates) updateRates(rates);
};

export const createVault = async ({ form, store: { addVault, blockchain, settings } }) => {
  if (settings.authorization) {
    await sync({ key: 'vaults', blocks: blockchain.vaults, settings });
    await sync({ key: 'txs', blocks: blockchain.txs, settings });
  }

  return addVault(form);
};
