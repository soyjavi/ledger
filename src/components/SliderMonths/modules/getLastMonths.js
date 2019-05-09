export default () => {
  const today = new Date();
  const values = [];
  const month = today.getMonth();
  const year = today.getFullYear();
  let currentMonth = 11 - today.getMonth();

  if (11 - today.getMonth()) {
    currentMonth = today.getMonth() + 1;
    while (currentMonth < 12) {
      values.push({ month: currentMonth, year: year - 1 });
      currentMonth += 1;
    }
  }

  currentMonth = 0;
  while (currentMonth <= month) {
    values.push({ month: currentMonth, year });
    currentMonth += 1;
  }

  console.log('values', values);

  return values;
};
