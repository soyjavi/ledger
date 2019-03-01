export default (vaults = []) => vaults.sort((a, b) => {
  const { progression } = a.currentMonth;
  const { progression: nextProgression } = b.currentMonth;

  return (Math.abs(progression) > Math.abs(nextProgression))
    ? -1
    : 1;
});
