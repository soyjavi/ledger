export default async ({
  props: { vault },
  state: {
    category, coords = {}, form: { value, title = '' }, place, type,
  },
  store: { onTx },
}) => onTx({
  category,
  title,
  type,
  value: parseFloat(value, 10),
  vault,
  place,
  ...coords,
});
