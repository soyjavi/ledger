export default ({ vaults = [] }, vault) => vaults
  .filter(({ hash }) => hash !== vault)
  .sort(({ currentMonth: { txs } }, { currentMonth: { txs: nextTxs } }) => nextTxs - txs);
