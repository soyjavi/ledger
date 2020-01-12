import { query } from './query';

export const onSearch = ({ l10n, dataSource, setSearch, setTxs }, value) => {
  const nextSearch = value.trim();
  setSearch(nextSearch);
  setTxs(query({ l10n, txs: dataSource.txs, search: nextSearch, scroll: true }));
};
