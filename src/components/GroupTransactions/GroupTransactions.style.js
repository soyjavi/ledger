import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  container: {
    marginTop: SPACE.XS,
    marginBottom: SPACE.S,
  },

  heading: {
    ...LAYOUT.STYLE.ROW,
    justifyContent: 'space-between',
    paddingHorizontal: SPACE.MEDIUM,
  },
});
