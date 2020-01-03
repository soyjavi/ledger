import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { LAYOUT, THEME } from '../../reactor/common';

const {
  STYLE: { CONTENT, HEADER_HEIGHT },
} = C;
const { SPACE } = THEME;

export default StyleSheet.create({
  activity: {
    alignSelf: 'center',
    marginTop: SPACE.MEDIUM,
  },

  centered: {
    ...LAYOUT.STYLE.CENTERED,
    padding: SPACE.MEDIUM,
  },

  container: {
    paddingBottom: HEADER_HEIGHT,
    paddingTop: HEADER_HEIGHT,
  },

  content: {
    ...CONTENT,
  },
});
