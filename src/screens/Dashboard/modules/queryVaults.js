export default ({ settings = {}, vaults = [] }) => vaults
  .filter((vault) => settings[vault.hash] === (true || undefined))
  .sort(({ currentMonth: { txs } }, { currentMonth: { txs: nextTxs } }) => nextTxs - txs);
