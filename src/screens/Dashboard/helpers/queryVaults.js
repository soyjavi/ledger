export const queryVaults = ({ query, vaults = [] }) =>
  vaults
    .filter((tx = {}) => {
      const title = tx.title ? tx.title.toLowerCase() : undefined;
      return !query || (title && title.includes(query));
    })
    .sort(({ currentMonth: { txs } }, { currentMonth: { txs: nextTxs } }) => nextTxs - txs);
