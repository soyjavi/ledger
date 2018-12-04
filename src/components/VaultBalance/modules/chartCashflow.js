export default(txs, date, method = 'getDate') => {
  const days = [];
  txs.forEach(({ cashflow: { expenses } = {} }) => {
    if (expenses) days.splice(expenses.length, 0, expenses)
  });

  
  return [
  	...Array.from({ length: 30 - days.length }, () => 0),
  	...days
  ];
};
