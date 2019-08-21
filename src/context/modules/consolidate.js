import calcOverall from './calcOverall';
import calcVault from './calcVault';

export default (store = {}) => {
  let { vaults = [] } = store;

  vaults = vaults.map((vault) => calcVault({
    ...store, vault: { ...(vaults.find((item) => item.hash === vault.hash) || {}), ...vault },
  }));

  return { ...store, vaults, overall: calcOverall({ ...store, vaults }) };
};
