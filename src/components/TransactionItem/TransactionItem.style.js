import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { UNIT, SPACE } = THEME;

export default StyleSheet.create({
  box: {
    marginRight: UNIT,
  },

  boxContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    paddingVertical: SPACE.XS,
    paddingHorizontal: SPACE.MEDIUM,
  },

  content: {
    alignItems: 'flex-start',
    flex: 1,
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
