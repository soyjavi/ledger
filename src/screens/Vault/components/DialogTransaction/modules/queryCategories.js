import { C } from '../../../../../common';

const { VAULT_TRANSFER, WIPE } = C;
const INTERNAL_KEYS = [VAULT_TRANSFER.toString(), WIPE.toString()];

export default ({ l10n: { CATEGORIES }, type }) => Object.keys(CATEGORIES[type] || {})
  .filter((key) => !INTERNAL_KEYS.includes(key))
  .map((key) => ({ key, caption: CATEGORIES[type][key] }));
