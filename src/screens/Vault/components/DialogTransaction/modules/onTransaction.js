export default async (component, { onTx }) => {
  const {
    props: { vault },
    state: {
      category, coords = {}, form: { value, title = '' }, place, type,
    },
  } = component;

  const response = await onTx({
    category,
    title,
    type,
    value: parseFloat(value, 10),
    vault,
    place,
    ...coords,
  });

  return response;
};
