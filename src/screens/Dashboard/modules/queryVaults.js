export const queryVaults = ({ settings: { visibleVaults } = {}, vaults = [] }) =>
  vaults
    .filter((vault) => visibleVaults[vault.hash] !== false)
    .sort(({ currentMonth: { txs } }, { currentMonth: { txs: nextTxs } }) => nextTxs - txs);
