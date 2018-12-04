export default (vaults = []) => {
  const currentMonth = new Date().toISOString().substr(0,7);

  return vaults.sort((a, b) => {
    const { expenses: aExpenses = 0, incomes: aIncomes = 0 } = a.months[currentMonth] || {};
    const { expenses: bExpenses = 0, incomes: bIncomes = 0 } = b.months[currentMonth] || {};

    if ((aExpenses + aIncomes) < (bExpenses + bIncomes)) return 1;
    if ((aExpenses + aIncomes) > (bExpenses + bIncomes)) return -1;
    return 0;
  });
}