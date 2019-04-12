export default ({ txs, vaults }) => txs
  .slice(-10)
  .map((tx) => {
    const { currency } = vaults.find(vault => vault.hash === tx.vault);
    return { currency, ...tx };
  })
  .sort((a, b) => {
    if (a.timestamp < b.timestamp) return 1;
    if (a.timestamp > b.timestamp) return -1;
    return 0;
  });
