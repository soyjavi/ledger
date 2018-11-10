export default ({ txs }, vaultHash, date) => {
  const dataSource = [];
  let timestamp;

  txs.forEach((tx) => {
    if (tx.vault === vaultHash && tx.timestamp.substr(0, 7) === date) {
      const txDate = tx.timestamp.substr(0, 10);

      if (timestamp !== txDate) {
        if (dataSource.length > 0) dataSource[dataSource.length - 1].last = true;

        timestamp = txDate;
        dataSource.push({ timestamp: tx.timestamp });
      }

      dataSource.push(tx);
    }
  });

  if (dataSource.length > 0) dataSource[dataSource.length - 1].last = true;

  return dataSource;
};
