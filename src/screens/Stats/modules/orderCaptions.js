const MONTHLY = 0;

export default ({ DAY_NAMES, MONTHS }, typeQuery) => {
  const dataSource = typeQuery === MONTHLY ? MONTHS : DAY_NAMES;
  const lastIndex = (new Date())[typeQuery === MONTHLY ? 'getMonth' : 'getDay']();
  const values = dataSource.filter((value, index) => index > lastIndex);

  return [
    ...values,
    ...dataSource.filter(value => !values.includes(value)),
  ];
};
