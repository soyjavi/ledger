import { FORM } from '../../../common';

const { TRANSACTION } = FORM;

export default ({ l10n: { CATEGORIES }, type }) => Object.assign({}, TRANSACTION, {
  category: {
    ...TRANSACTION.category,
    dataSource: CATEGORIES[type],
    defaultValue: CATEGORIES[type][0],
  },
});
