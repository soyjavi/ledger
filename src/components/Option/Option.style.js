import { StyleSheet } from 'react-native';
import { LAYOUT, THEME } from 'reactor/common';

const { BORDER_RADIUS, FONT, SPACE } = THEME;

let OPTION_SIZE = LAYOUT.VIEWPORT.W / 6 + SPACE.XS;
if (OPTION_SIZE > 80) OPTION_SIZE = 80;

export { OPTION_SIZE };

export default StyleSheet.create({
  container: {
    width: OPTION_SIZE,
    maxWidth: OPTION_SIZE,
    height: OPTION_SIZE,
  },

  content: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: SPACE.XS,
    height: '100%',
    width: '100%',
  },

  image: {
    height: SPACE.L,
    width: SPACE.L,
  },

  legend: FONT.LEGEND,
});
