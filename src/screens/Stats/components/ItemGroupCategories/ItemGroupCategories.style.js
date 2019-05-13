import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../../../reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  container: {
    marginTop: SPACE.XXS,
    marginBottom: SPACE.S,
  },

  content: {
    paddingVertical: SPACE.XXS,
    paddingHorizontal: SPACE.MEDIUM,
  },

  expand: {
    marginTop: SPACE.XXS,
    marginBottom: SPACE.MEDIUM,
  },

  row: LAYOUT.STYLE.ROW,

  title: {
    flex: 1,
  },
});
