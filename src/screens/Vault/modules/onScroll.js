import { LAYOUT } from 'reactor/common';

import { query } from './query';

export const onScroll = (
  { l10n, dataSource, scroll, scrollQuery, search, setScroll, setScrollQuery, setTxs },
  nextScroll,
  y,
) => {
  if (nextScroll !== scroll) setScroll(nextScroll);
  if (!scrollQuery && y > LAYOUT.VIEWPORT.H / 2) {
    setScrollQuery(true);
    setTxs(query({ l10n, txs: dataSource.txs, search, scroll: true }));
  }
};
