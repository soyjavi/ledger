import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, OFFSET } = THEME;

export default StyleSheet.create({
  container: {
    paddingHorizontal: OFFSET,
  },

  content: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-end',
    borderBottomColor: COLOR.BASE,
    borderBottomWidth: 1,
    paddingVertical: OFFSET,
  },

  info: {
    flex: 1,
  },

  title: {
    marginBottom: OFFSET / 2,
  },
});
