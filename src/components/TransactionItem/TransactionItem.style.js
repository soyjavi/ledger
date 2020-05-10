import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { BORDER_RADIUS, COLOR, SPACE } = THEME;

const HORIZONTAL_PADDING = SPACE.S;

export default StyleSheet.create({
  highlight: {
    backgroundColor: COLOR.BRAND_HIGHLIGHT, // @TODO: use
    borderRadius: BORDER_RADIUS / 2,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: SPACE.XS / 2,
    marginRight: -HORIZONTAL_PADDING,
  },
});
