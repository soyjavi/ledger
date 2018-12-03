import { C, FORM } from '../../../common';

const { VAULT_TRANSFER } = C;
const { TRANSACTION } = FORM;

export default ({ l10n: { CATEGORIES }, type }) => {
  const dataSource = Object.values(CATEGORIES[type] || {}).filter(category => category !== VAULT_TRANSFER);
  const [defaultValue] = dataSource;

  return Object.assign({}, TRANSACTION, {
    category: { ...TRANSACTION.category, dataSource, defaultValue },
  });
};
