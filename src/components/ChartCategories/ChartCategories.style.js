import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, OFFSET, UNIT } = THEME;

const BAR_HEIGHT = OFFSET / 2;

export default StyleSheet.create({
  chart: {
    backgroundColor: COLOR.BASE,
    borderRadius: BAR_HEIGHT / 2,
    height: BAR_HEIGHT,
    maxWidth: '100%',
    width: '100%',
  },

  bar: {
    minWidth: BAR_HEIGHT,
  },

  container: {
    // marginBottom: OFFSET / 2,
  },

  content: {
    marginBottom: UNIT / 2,
  },

  row: LAYOUT.STYLE.ROW,

  text: {
    flex: 1,
  },
});
