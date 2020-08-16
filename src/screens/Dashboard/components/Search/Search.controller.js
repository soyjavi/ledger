import { groupTxsByDate } from '@common';

export const querySearchTxs = (next, { txs = [], vaults = [] }, l10n) =>
  groupTxsByDate(
    txs
      .slice()
      .reverse()
      .filter((tx) => {
        const title = tx.title ? tx.title.toLowerCase() : undefined;
        const category = l10n.CATEGORIES[tx.type] ? l10n.CATEGORIES[tx.type][tx.category].toLowerCase() : undefined;

        return (title && title.includes(next)) || (category && category.includes(next));
      })
      .slice(0, 16)
      .map((tx) => {
        const { currency } = vaults.find(({ hash }) => hash === tx.vault);
        return { ...tx, currency };
      }),
  );
