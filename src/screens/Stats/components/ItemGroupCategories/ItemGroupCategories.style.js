import { StyleSheet } from 'react-native';

import { C } from '../../../../common';
import { LAYOUT, THEME } from '../../../../reactor/common';

const {
  BORDER_RADIUS, COLOR, UNIT, SPACE,
} = THEME;

export default StyleSheet.create({
  bar: {
    backgroundColor: COLOR.PRIMARY,
    borderRadius: BORDER_RADIUS / 2,
    height: UNIT * 0.2,
    minWidth: UNIT * 0.2,
  },

  container: {
    marginBottom: SPACE.REGULAR,
  },

  content: {
    paddingTop: SPACE.XXS,
    paddingHorizontal: SPACE.MEDIUM,
  },

  heading: {
    flex: 1,
    alignItems: 'flex-end',
  },

  row: LAYOUT.STYLE.ROW,

  title: {
    flex: 1,
  },
});
