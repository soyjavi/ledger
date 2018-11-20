import { StyleSheet } from 'react-native';

import { C } from '../../common';
import { THEME } from '../../reactor/common';

const { STYLE: { HEADER_HEIGHT, NOTCH_HEIGHT } } = C;
const { OFFSET } = THEME;

export default StyleSheet.create({
  form: {
    padding: OFFSET,
  },

  scroll: {
    paddingTop: HEADER_HEIGHT + NOTCH_HEIGHT,
  },
});
