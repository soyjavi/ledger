import { groupTxsByDate } from '../../../common';

export const query = ({ txs = [], scroll = false }) =>
  groupTxsByDate(
    txs
      .slice()
      .reverse()
      .slice(0, scroll ? 256 : 16),
  );
