import { LAYOUT, THEME } from '../../../reactor/common';
import { query } from './query';

const { SPACE } = THEME;

export const onScroll = (
  { l10n, dataSource, scroll, scrollQuery, search, setScroll, setScrollQuery, setTxs },
  {
    nativeEvent: {
      contentOffset: { y },
    },
  },
) => {
  const nextScroll = y > SPACE.MEDIUM;

  if (nextScroll !== scroll) setScroll(nextScroll);
  if (!scrollQuery && y > LAYOUT.VIEWPORT.H / 2) {
    setScrollQuery(true);
    setTxs(query({ l10n, txs: dataSource.txs, search, scroll: true }));
  }
};
