import { C, FORM } from '../../../common';

const { CATEGORY_INTERNAL_TRANSFER } = C;
const { TRANSACTION } = FORM;

export default ({ l10n: { CATEGORIES }, type }) => {
  const dataSource = Object.values(CATEGORIES[type] || {}).filter(category => category !== CATEGORY_INTERNAL_TRANSFER);
  const [defaultValue] = dataSource;

  return Object.assign({}, TRANSACTION, {
    category: { ...TRANSACTION.category, dataSource, defaultValue },
  });
};
