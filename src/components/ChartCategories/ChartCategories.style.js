import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, OFFSET, UNIT } = THEME;

const BAR_HEIGHT = UNIT * 1.6;

export default StyleSheet.create({
  bar: {
    minWidth: BAR_HEIGHT,
  },

  chart: {
    backgroundColor: COLOR.BASE,
    borderRadius: BAR_HEIGHT / 2,
    height: BAR_HEIGHT,
    maxWidth: '100%',
    width: '100%',
  },

  content: {
    marginVertical: UNIT / 2,
  },

  row: LAYOUT.STYLE.ROW,

  text: {
    flex: 1,
    marginBottom: UNIT / 4,
  },
});
