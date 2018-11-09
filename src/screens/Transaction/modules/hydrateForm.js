export default (form, key, dataSource) => (
  Object.assign({}, form, {
    [key]: {
      ...form[key],
      dataSource: dataSource.map(({ title }) => title),
      defaultValue: dataSource[1] ? dataSource[1].title : undefined,
    },
  })
);
