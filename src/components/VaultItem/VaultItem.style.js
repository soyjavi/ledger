import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const { STYLE } = C;
const { COLOR, SPACE, UNIT } = THEME;

export default StyleSheet.create({
  container: {
    ...STYLE.CARD,
    backgroundColor: COLOR.BASE,
    marginBottom: SPACE.MEDIUM,
    marginLeft: SPACE.MEDIUM,
    minHeight: UNIT * 12,
    overflow: 'hidden',
    width: (LAYOUT.VIEWPORT.W / 2) - (SPACE.MEDIUM * 1.5),
  },

  content: {
    flex: 1,
  },

  row: LAYOUT.STYLE.ROW,

  separator: {
    flex: 1,
  },
});
