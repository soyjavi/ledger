import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../../../reactor/common';

const { BORDER_RADIUS, COLOR, FONT, UNIT, SPACE } = THEME;

const INPUT_HEIGHT = UNIT * 4.4;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    backgroundColor: COLOR.BASE,
    borderColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    marginHorizontal: SPACE.MEDIUM,
    marginBottom: SPACE.MEDIUM,
    paddingHorizontal: SPACE.S,
  },

  focus: {
    borderColor: COLOR.TEXT,
  },

  input: {
    ...FONT.INPUT,
    borderWidth: 0,
    color: COLOR.TEXT,
    flex: 1,
    fontSize: UNIT * 1.6,
    height: INPUT_HEIGHT,
    marginLeft: SPACE.S,
  },
});
