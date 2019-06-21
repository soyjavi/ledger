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

  expand: {
    marginBottom: SPACE.XS,
  },
});
