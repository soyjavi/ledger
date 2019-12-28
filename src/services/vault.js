import { apiCall, composeHeaders } from './modules';

const createVault = async (store, props) => {
  const { onError, rates, vaults = [] } = store;

  const vault = await apiCall({
    method: 'POST',
    service: 'vault',
    headers: composeHeaders(store),
    ...props,
  }).catch(onError);

  const next = { vaults: [...vaults, vault] };
  if (vaults.length === 0) {
    next.baseCurrency = vault.currency;
    delete rates[vault.currency];
    next.rates = rates;
  }

  store.save(next);
  return vault;
};

export { createVault };
