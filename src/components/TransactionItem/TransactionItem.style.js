import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  timestamp: {
    width: UNIT * 4.8,
  },

  container: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-start',
    paddingVertical: OFFSET / 1.5,
    paddingLeft: OFFSET * 1.5,
    paddingRight: OFFSET,
  },

  prices: {
    alignItems: 'flex-end',
  },

  texts: {
    flex: 1,
  },
});
