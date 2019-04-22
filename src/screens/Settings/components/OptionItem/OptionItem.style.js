import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../../../reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  container: {
    ...LAYOUT.STYLE.ROW,
    paddingHorizontal: SPACE.MEDIUM,
    paddingVertical: SPACE.XS,
  },

  content: {
    flex: 1,
  },

  switch: {
    marginBottom: 0,
  },
});
