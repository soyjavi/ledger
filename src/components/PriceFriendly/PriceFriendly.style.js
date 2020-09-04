import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, COLOR, FONT, SPACE } = THEME;

const HORIZONTAL_PADDING = SPACE.S;

export default StyleSheet.create({
  bold: FONT.EXTRA_BOLD,
  highlight: {
    backgroundColor: COLOR.BRAND_OPACITY,
    borderRadius: BORDER_RADIUS / 2,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: SPACE.XS / 2,
    marginRight: -HORIZONTAL_PADDING,
  },
});
