import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, OFFSET, UNIT } = THEME;

const ICON_SIZE = UNIT * 3.6;

export default StyleSheet.create({
  icon: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BASE,
    borderRadius: ICON_SIZE / 2,
    height: ICON_SIZE,
    justifyContent: 'center',
    marginRight: UNIT,
    width: ICON_SIZE,
  },

  container: {
    paddingVertical: OFFSET / 1.5,
    paddingHorizontal: OFFSET,
  },

  content: {
    alignItems: 'flex-start',
    flex: 1,
  },

  row: LAYOUT.STYLE.ROW,

  prices: {
    alignItems: 'flex-end',
  },

  texts: {
    flex: 1,
  },
});
