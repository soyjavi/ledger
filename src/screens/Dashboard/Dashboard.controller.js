import { C, groupTxsByDate } from '@common';

const { CURRENCY } = C;

const queryLastTxs = ({ txs = [], vaults = [] }) =>
  groupTxsByDate(
    txs
      .slice(-32)
      .reverse()
      .filter(({ vault }) => vault !== undefined)
      .map((tx = {}) => {
        const { currency = CURRENCY } = vaults.find((vault) => vault.hash === tx.vault) || {};

        return { ...tx, currency };
      }),
  );

const querySearchTxs = ({ l10n, query, txs = [], vaults = [] }) =>
  query
    ? groupTxsByDate(
        txs
          .slice()
          .reverse()
          .filter((tx) => {
            const title = tx.title ? tx.title.toLowerCase() : undefined;

            const category = l10n.CATEGORIES[tx.type][tx.category]
              ? l10n.CATEGORIES[tx.type][tx.category].toLowerCase()
              : undefined;

            return (title && title.includes(query)) || (category && category.includes(query));
          })
          .slice(0, 16)
          .map((tx = {}) => {
            const { currency } = vaults.find(({ hash }) => hash === tx.vault);
            return { ...tx, currency };
          }),
      )
    : undefined;

const queryVaults = ({ query, vaults = [], visibleVaults }) =>
  vaults
    // .filter((vault) => visibleVaults[vault.hash] !== false)
    .filter((tx = {}) => {
      const title = tx.title ? tx.title.toLowerCase() : undefined;
      return !query || (title && title.includes(query));
    })
    .sort(({ currentMonth: { txs } }, { currentMonth: { txs: nextTxs } }) => nextTxs - txs);

export { queryLastTxs, querySearchTxs, queryVaults };
