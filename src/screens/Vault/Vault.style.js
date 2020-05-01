import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

import { HEADER_HEIGHT } from '@components';

const { SPACE } = THEME;

export default StyleSheet.create({
  activity: {
    alignSelf: 'center',
    marginTop: SPACE.M,
  },

  container: {
    paddingBottom: HEADER_HEIGHT,
    paddingTop: HEADER_HEIGHT,
    zIndex: 0,
  },
});
