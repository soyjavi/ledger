export default (txs, date) => {
  const dataSource = date
    ? txs.filter(({ timestamp }) => date === new Date(timestamp).toISOString().substr(0, 7))
    : [...txs];

  return dataSource.sort((a, b) => {
    if (a.timestamp < b.timestamp) return 1;
    if (a.timestamp > b.timestamp) return -1;
    return 0;
  });
};
