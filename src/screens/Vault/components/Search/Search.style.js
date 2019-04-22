import { StyleSheet } from 'react-native';

import { THEME } from '../../../../reactor/common';

const {
  COLOR, FONT, UNIT, SPACE,
} = THEME;

export default StyleSheet.create({
  input: {
    ...FONT.HEADLINE,
    backgroundColor: COLOR.BASE,
    borderWidth: 0,
    color: COLOR.TEXT,
    height: UNIT * 4.2,
    marginBottom: SPACE.MEDIUM,
    paddingHorizontal: SPACE.MEDIUM,
  },
});
