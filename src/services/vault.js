import { apiCall, composeHeaders } from './modules';

export const createVault = async (store, snackbar, props) => {
  const { rates, vaults = [] } = store;
  const { snackbarError } = snackbar;

  const vault = await apiCall({
    method: 'POST',
    service: 'vault',
    headers: composeHeaders(store),
    ...props,
  }).catch((error) => snackbarError(error.message));

  const next = { vaults: [...vaults, vault] };
  if (vaults.length === 0) {
    next.baseCurrency = vault.currency;
    delete rates[vault.currency];
    next.rates = rates;
  }

  store.save(next);
  return vault;
};
