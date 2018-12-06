import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { UNIT } = THEME;

const BAR_HEIGHT = UNIT * 1.6;

export default StyleSheet.create({
  bar: {
    minWidth: BAR_HEIGHT,
  },

  chart: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: BAR_HEIGHT / 2,
    height: BAR_HEIGHT,
    maxWidth: '100%',
    width: '100%',
  },

  content: {
    marginVertical: BAR_HEIGHT / 2,
  },

  row: {
    ...LAYOUT.STYLE.ROW,
    marginBottom: UNIT / 2,
  },

  text: {
    flex: 1,
  },
});
