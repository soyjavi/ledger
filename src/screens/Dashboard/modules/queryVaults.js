export default ({ settings = {}, vaults = [] }) => vaults
  .filter((vault) => settings[vault.hash] !== false)
  .sort(({ currentMonth: { txs } }, { currentMonth: { txs: nextTxs } }) => nextTxs - txs);
