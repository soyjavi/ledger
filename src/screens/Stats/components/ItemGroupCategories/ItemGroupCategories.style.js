import { StyleSheet } from 'react-native';

import { THEME } from '../../../../reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  container: {
    marginBottom: SPACE.S,
  },

  content: {
    paddingHorizontal: SPACE.MEDIUM,
  },

  noHighlight: {
    opacity: 0.38,
  },

  expand: {
    marginBottom: SPACE.XS,
  },
});
