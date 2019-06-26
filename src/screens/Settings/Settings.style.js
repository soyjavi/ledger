import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT } } = C;
const {
  BORDER_RADIUS, COLOR, SPACE, UNIT,
} = THEME;
const FLAG_SIZE = UNIT * 1.6;

export default StyleSheet.create({
  caption: {
    marginVertical: SPACE.XXS,
    marginHorizontal: SPACE.MEDIUM,
  },

  container: {
    paddingVertical: HEADER_HEIGHT,
  },

  content: {
    marginVertical: SPACE.REGULAR,
  },

  frame: {
    alignItems: 'center',
    backgroundColor: COLOR.BASE,
    borderRadius: BORDER_RADIUS,
    marginHorizontal: SPACE.REGULAR,
    padding: SPACE.REGULAR,
  },

  optionFlag: {
    borderRadius: FLAG_SIZE / 2,
    height: FLAG_SIZE,
    width: FLAG_SIZE,
    marginBottom: SPACE.XXS / 2,
    marginRight: SPACE.XXS,
  },

  row: LAYOUT.STYLE.ROW,
});
