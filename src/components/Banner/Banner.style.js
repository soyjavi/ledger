import { StyleSheet } from 'react-native';

import { THEME } from 'reactor/common';

const { COLOR, OFFSET } = THEME;

export default StyleSheet.create({
  container: {
    margin: OFFSET,
    backgroundColor: COLOR.TEXT,
    padding: OFFSET,
  },

  text: {
    color: COLOR.WHITE,
  },
});
