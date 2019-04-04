import { StyleSheet } from 'react-native';

import { C } from '../../../../common';
import { LAYOUT, THEME } from '../../../../reactor/common';

const {
  BORDER_RADIUS, COLOR, UNIT, SPACE,
} = THEME;

export default StyleSheet.create({
  bar: {
    borderRadius: BORDER_RADIUS / 2,
    height: UNIT * 0.7,
    width: '50%',
    backgroundColor: COLOR.PRIMARY,
  },

  container: {
  },

  content: {
    paddingTop: SPACE.XS,
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
