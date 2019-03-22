import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE } = C;
const { COLOR, OFFSET } = THEME;

export default StyleSheet.create({
  container: {
    ...STYLE.CARD,
    backgroundColor: COLOR.BASE,
    marginLeft: OFFSET,
    overflow: 'hidden',
    minHeight: 0,
  },

  row: LAYOUT.STYLE.ROW,
});
