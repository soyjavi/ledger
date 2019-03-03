export default (vaults = []) => vaults.sort((a, b) => {
  const { incomes = 0, expenses = 0, progression = 0 } = a.currentMonth;
  const { incomes: nextIncomes = 0, expenses: nextExpenses = 0, progression: nextProgression = 0 } = b.currentMonth;
  const total = incomes - expenses;
  const nextTotal = nextIncomes - nextExpenses;

  let order = 1;
  if (Math.abs(total) > Math.abs(nextTotal)) order = -1;
  else if (progression !== 0 || nextProgression !== 0);

  return order;
});
