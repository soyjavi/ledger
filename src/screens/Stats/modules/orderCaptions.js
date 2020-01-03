export default ({ MONTHS }) => {
  const lastIndex = new Date().getMonth();
  const values = MONTHS.filter((value, index) => index > lastIndex);

  return [...values, ...MONTHS.filter((value) => !values.includes(value))];
};
