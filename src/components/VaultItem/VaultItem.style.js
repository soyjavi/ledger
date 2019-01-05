import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { BORDER_RADIUS, COLOR, OFFSET } = THEME;

export default StyleSheet.create({
  container: {
    borderColor: COLOR.BASE,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    padding: OFFSET,
    marginHorizontal: OFFSET,
    marginBottom: OFFSET,
  },

  content: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-end',
  },

  info: {
    flex: 1,
  },

  title: {
    marginBottom: OFFSET / 2,
  },
});
