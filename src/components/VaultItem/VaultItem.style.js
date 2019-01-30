import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { OFFSET } = THEME;

export default StyleSheet.create({
  container: {
    paddingHorizontal: OFFSET,
    paddingVertical: OFFSET / 2,
  },

  content: {
    flex: 1,
    marginHorizontal: OFFSET,
  },

  row: LAYOUT.STYLE.ROW,
});
