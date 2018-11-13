export default (txs, { vault, year, month }) => {
  const dataSource = [];
  let group;

  txs
    .sort((a, b) => {
      if (a.timestamp < b.timestamp) return 1;
      if (a.timestamp > b.timestamp) return -1;
      return 0;
    })
    .forEach((tx) => {
      if (tx.vault === vault) {
        const tsDate = new Date(tx.timestamp);

        if (tsDate.getMonth() === month && tsDate.getFullYear() === year) {
          const txDate = tx.timestamp.substr(0, 10);

          if (group !== txDate) {
            if (dataSource.length > 0) dataSource[dataSource.length - 1].last = true;
            group = txDate;
            dataSource.push({ timestamp: tx.timestamp });
          }
          dataSource.push(tx);
        }
      }
    });

  if (dataSource.length > 0) dataSource[dataSource.length - 1].last = true;

  return dataSource;
};
