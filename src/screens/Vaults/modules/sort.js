export default (vaults = []) => vaults.sort((a, b) => {
  if (a.currentBalanceBase < b.currentBalanceBase) return 1;
  if (a.currentBalanceBase > b.currentBalanceBase) return -1;
  return 0;
});
