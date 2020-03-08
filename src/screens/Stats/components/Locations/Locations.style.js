import { StyleSheet } from 'react-native';

import { THEME } from '../../../../reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  container: {
    marginHorizontal: SPACE.M,
  },

  content: {
    marginBottom: SPACE.L,
  },

  heatMap: {
    width: '100%',
  },
});
