import { Dimensions } from 'react-native';

import { groupTxsByDate } from '@common';

const { height } = Dimensions.get('window');

const onScroll = ({ dataSource, scrollQuery, setScroll, setScrollQuery, setTxs }, scroll, y) => {
  setScroll(scroll);
  if (!scrollQuery && y > height / 2) {
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
