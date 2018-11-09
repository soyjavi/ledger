import { StyleSheet } from 'react-native';

import { C } from 'common';
import { LAYOUT, THEME } from 'reactor/common';

const { STYLE: { HEADER_HEIGHT } } = C;
const { OFFSET } = THEME;

export default StyleSheet.create({
  scroll: {
    paddingTop: HEADER_HEIGHT,
  },

  buttons: {
    ...LAYOUT.STYLE.ROW,
  },

  dialog: {
    justifyContent: 'flex-end',
  },

  form: {
    marginVertical: OFFSET,
  }
});
