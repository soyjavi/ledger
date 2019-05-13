import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../../../reactor/common';

const {
  BORDER_RADIUS, COLOR, FONT, UNIT, SPACE,
} = THEME;

const INPUT_HEIGHT = UNIT * 4.4;
const ICON_HEIGHT = INPUT_HEIGHT / 3;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    backgroundColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    marginHorizontal: SPACE.MEDIUM,
    marginBottom: SPACE.MEDIUM,
    paddingHorizontal: SPACE.MEDIUM,
  },

  icon: {
    height: ICON_HEIGHT,
    marginRight: SPACE.MEDIUM,
    opacity: 0.65,
    width: ICON_HEIGHT,
  },

  input: {
    ...FONT.INPUT,
    fontSize: UNIT * 1.6,
    borderWidth: 0,
    color: COLOR.TEXT,
    flex: 1,
    height: INPUT_HEIGHT,
  },
});
