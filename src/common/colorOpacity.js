import color from 'color';

import { THEME } from 'reactor/common';

const { OPACITY } = THEME;

export default (value, opacity = OPACITY.S) => color(value).alpha(opacity);
