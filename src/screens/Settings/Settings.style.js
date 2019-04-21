import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT } } = C;
const { SPACE } = THEME;

export default StyleSheet.create({
  caption: {
    marginVertical: SPACE.XXS,
    marginHorizontal: SPACE.MEDIUM,
  },

  container: {
    paddingVertical: HEADER_HEIGHT,
  },

  content: {
    marginVertical: SPACE.MEDIUM,
  },
});
