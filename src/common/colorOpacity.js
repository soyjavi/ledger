import color from 'color';
import { THEME } from 'reactor/common';

const { OPACITY } = THEME;

export const colorOpacity = (value, opacity = OPACITY.S) => color(value).alpha(opacity).string();
