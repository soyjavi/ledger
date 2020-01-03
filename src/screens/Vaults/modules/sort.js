export default (vaults = [], order) =>
  vaults.sort((a, b) => {
    if (a.currentBalanceBase < b.currentBalanceBase) return order ? 1 : -1;
    if (a.currentBalanceBase > b.currentBalanceBase) return order ? -1 : 1;
    return 0;
  });
