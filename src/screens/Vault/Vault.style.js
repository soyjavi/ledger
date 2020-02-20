import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const {
  STYLE: { HEADER_HEIGHT },
} = C;
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
