export default (form, dataSource) => (
  Object.assign(
    {},
    form,
    {
      category: { ...form.category, dataSource, defaultValue: dataSource[0] },
    },
  )
);
