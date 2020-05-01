export default (vaults = [], vaultHash) =>
  vaults
    .filter(({ hash }) => hash !== vaultHash)
    .sort(({ currentMonth: { txs } }, { currentMonth: { txs: nextTxs } }) => nextTxs - txs);
