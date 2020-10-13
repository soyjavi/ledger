import { LAYOUT } from 'reactor/common';

import { groupTxsByDate } from '@common';

const onScroll = ({ dataSource, scrollQuery, setScroll, setScrollQuery, setTxs }, scroll, y) => {
  setScroll(scroll);
  if (!scrollQuery && y > LAYOUT.VIEWPORT.H / 2) {
    setScrollQuery(true);
    setTxs(query(dataSource.txs, true));
  }
};

const query = (txs = [], scroll = false) =>
  groupTxsByDate(
    txs
      .slice()
      .reverse()
      .slice(0, scroll ? 256 : 16),
  );

const search = (query, txs = [], l10n) =>
  groupTxsByDate(
    txs
      .slice()
      .reverse()
      .filter((tx) => {
        const title = tx.title ? tx.title.toLowerCase() : undefined;
        const category = l10n.CATEGORIES[tx.type] ? l10n.CATEGORIES[tx.type][tx.category].toLowerCase() : undefined;

        return (title && title.includes(query)) || (category && category.includes(query));
      })
      .slice(0, 16),
  );

export { onScroll, query, search };
