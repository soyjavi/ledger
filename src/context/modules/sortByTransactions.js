export default (vaults = []) => vaults.sort((a, b) => {
  const { progression: aValue } = a.currentMonth;
  const { progression: bValue } = b.currentMonth;

  return (Math.abs(aValue) > Math.abs(bValue))
    ? -1
    : 1;
});
