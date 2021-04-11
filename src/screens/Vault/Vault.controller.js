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

export { onScroll, query };
