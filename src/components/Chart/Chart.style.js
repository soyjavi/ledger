import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, UNIT } = THEME;
const BAR_SIZE = UNIT * 0.8;

export default StyleSheet.create({
  bar: {
    backgroundColor: COLOR.BASE,
    borderRadius: BAR_SIZE,
    height: '100%',
    marginLeft: UNIT * 0.1,
    minHeight: BAR_SIZE,
    width: BAR_SIZE,
  },

  barTiny: {
    borderRadius: BAR_SIZE / 2,
    minHeight: BAR_SIZE / 2,
    width: BAR_SIZE / 2,
  },

  chart: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
  },

  container: {
    alignSelf: 'flex-end',
    height: UNIT * 7.2,
    width: UNIT * 16.4,
  },

  title: {
    textAlign: 'right',
    marginBottom: UNIT / 4,
  },
});
