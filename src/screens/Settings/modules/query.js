export default (vaults = []) => vaults.sort((a, b) => {
  if (a.currency < b.currency) return -1;
  if (a.currency > b.currency) return 1;
  return 0;
});
