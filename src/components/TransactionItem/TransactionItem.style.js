import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { UNIT, SPACE } = THEME;
const ICON_SIZE = UNIT * 3.6;

export default StyleSheet.create({
  box: {
    marginRight: UNIT,
  },

  container: {
    paddingVertical: SPACE.XS,
    paddingHorizontal: SPACE.MEDIUM,
  },

  content: {
    alignItems: 'flex-start',
    flex: 1,
  },

  icon: {
    alignSelf: 'center',
    marginTop: UNIT * 0.5,
  },

  prices: {
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
  },

  row: LAYOUT.STYLE.ROW,

  texts: {
    flex: 1,
  },
});
