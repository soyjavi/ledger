import { C, groupTxsByDate } from '@common';

const { CURRENCY } = C;

export const queryLastTxs = ({ txs = [], vaults = [] }) =>
  groupTxsByDate(
    txs
      .slice(-32)
      .reverse()
      .filter(({ vault }) => vault !== undefined)
      .map((tx) => {
        const { currency = CURRENCY } = vaults.find((vault) => vault.hash === tx.vault) || {};

        return { ...tx, currency };
      }),
  );

export const querySearchTxs = ({ l10n, query, txs = [], vaults = [] }) =>
  groupTxsByDate(
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
      .map((tx) => {
        const { currency } = vaults.find(({ hash }) => hash === tx.vault);
        return { ...tx, currency };
      }),
  );

export const queryVaults = ({ visibleVaults, vaults = [] }) =>
  vaults
    .filter((vault) => visibleVaults[vault.hash] !== false)
    .sort(({ currentMonth: { txs } }, { currentMonth: { txs: nextTxs } }) => nextTxs - txs);
