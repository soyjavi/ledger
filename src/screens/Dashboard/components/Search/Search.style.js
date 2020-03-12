import { StyleSheet } from 'react-native';

import { THEME } from '../../../../reactor/common';

const { BORDER_RADIUS, COLOR, FONT, SPACE } = THEME;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.BASE,
    borderColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    width: 'auto',
  },

  focus: {
    borderColor: COLOR.TEXT,
  },

  input: {
    ...FONT.INPUT,
    color: COLOR.TEXT,
    borderWidth: 0,
    flex: 1,
    height: SPACE.XL + SPACE.S,
  },
});
