import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { SPACE } = THEME;

export default StyleSheet.create({
  container: {
    marginVertical: SPACE.XXS,
  },

  heading: {
    ...LAYOUT.STYLE.ROW,
    justifyContent: 'space-between',
    paddingHorizontal: SPACE.MEDIUM,
  },
});
