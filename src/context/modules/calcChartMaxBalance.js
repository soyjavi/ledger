export default (vaults) => {
  let max = 0;

  vaults.forEach(({ chart }) => {
    const value = parseInt(Math.max(...chart), 10);
    if (value > max) max = value;
  });

  return max;
};
