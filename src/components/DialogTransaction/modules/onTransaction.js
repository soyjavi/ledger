export default async ({
  l10n,
  props: { type, vault },
  state: { form: { category, value, title = '' } },
  store: { onTransaction, latestTransaction: { hash: previousHash } },
}) => onTransaction({
  category: category ? l10n.CATEGORIES[type].indexOf(category) : 0,
  previousHash,
  title,
  type,
  value: parseFloat(value, 10),
  vault,
});
