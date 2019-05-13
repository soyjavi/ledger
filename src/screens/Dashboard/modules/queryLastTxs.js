import { C } from '../../../common';

const { CURRENCY, VAULT_TRANSFER, WIPE } = C;

export default ({ txs = [], vaults = [] }) => txs
  .slice(-16)
  .filter(({ category, vault }) => category !== VAULT_TRANSFER && category !== WIPE && vault !== undefined)
  .map((tx) => {
    const { currency = CURRENCY } = vaults.find(vault => vault.hash === tx.vault) || {};
    return { currency, ...tx };
  })
  .sort((a, b) => {
    if (a.timestamp < b.timestamp) return 1;
    if (a.timestamp > b.timestamp) return -1;
    return 0;
  });
