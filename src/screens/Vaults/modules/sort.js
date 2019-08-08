export default (vaults = [], currency) => vaults
  .filter(item => (currency ? item.currency === currency : true))
  .sort((a, b) => {
    if (a.currentBalanceBase < b.currentBalanceBase) return 1;
    if (a.currentBalanceBase > b.currentBalanceBase) return -1;
    return 0;
  });
