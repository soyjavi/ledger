import { LAYOUT } from 'reactor/common';

import { query } from './query';

export const onScroll = ({ dataSource, scrollQuery, setScroll, setScrollQuery, setTxs }, scroll, y) => {
  setScroll(scroll);
  if (!scrollQuery && y > LAYOUT.VIEWPORT.H / 2) {
    setScrollQuery(true);
    setTxs(query(dataSource.txs, true));
  }
};
