import { CATEGORIES, CATEGORIES_NIGHTMODE } from '../assets';

import C from './constants';

const { SETTINGS: { NIGHT_MODE } } = C;

export default ({ type, category }, { settings: { [NIGHT_MODE]: nightMode } = {} } = {}) => (
  (nightMode ? CATEGORIES_NIGHTMODE : CATEGORIES)[type][category]
);
