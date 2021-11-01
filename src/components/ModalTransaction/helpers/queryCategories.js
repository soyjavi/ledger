import { C, L10N } from '@common';

const { INTERNAL_TRANSFER, WIPE } = C;
const INTERNAL_KEYS = [INTERNAL_TRANSFER.toString(), WIPE.toString()];

export const queryCategories = ({ type }) =>
  Object.keys(L10N.CATEGORIES[type] || {})
    .filter((key) => !INTERNAL_KEYS.includes(key))
    .map((key) => ({ key, caption: L10N.CATEGORIES[type][key] }));
