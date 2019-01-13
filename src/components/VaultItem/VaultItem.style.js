import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  bullet: {
    width: UNIT,
    height: UNIT,
    borderRadius: UNIT,
  },

  container: {
    paddingHorizontal: OFFSET,
    paddingVertical: OFFSET / 2,
  },

  content: {
    ...LAYOUT.STYLE.ROW,
  },

  info: {
    flex: 1,
    marginHorizontal: OFFSET,
  },

  title: {
  },
});
