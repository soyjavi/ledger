import { C, FORM } from '../../../../../common';

const { VAULT_TRANSFER, WIPE } = C;
const { TRANSACTION } = FORM;

const INTERNAL_KEYS = [VAULT_TRANSFER.toString(), WIPE.toString()];

export default ({ l10n: { CATEGORIES }, type }) => {
  const dataSource = Object.keys(CATEGORIES[type] || {})
    .filter(key => !INTERNAL_KEYS.includes(key))
    .map(key => CATEGORIES[type][key]);
  const [defaultValue] = dataSource;

  return Object.assign({}, TRANSACTION, {
    category: { ...TRANSACTION.category, dataSource, defaultValue },
  });
};
