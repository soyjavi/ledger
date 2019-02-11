import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE } = C;
const { COLOR, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    ...STYLE.CARD,
    backgroundColor: COLOR.BASE,
    margin: OFFSET / 2,
    minHeight: UNIT * 12.8,
    overflow: 'hidden',
  },

  content: {
    flex: 1,
  },

  row: LAYOUT.STYLE.ROW,

  separator: {
    flex: 1,
  },
});
