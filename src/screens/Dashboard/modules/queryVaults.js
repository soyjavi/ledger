export default (vaults = []) => vaults
  .filter(vault => vault.active !== false)
  .sort(({ currentMonth: { txs } }, { currentMonth: { txs: nextTxs } }) => nextTxs - txs);
