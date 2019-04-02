import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  icon: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BASE,
    borderRadius: UNIT,
    height: UNIT * 4,
    justifyContent: 'center',
    marginRight: UNIT,
    width: UNIT * 4,
  },

  container: {
    paddingVertical: OFFSET / 1.5,
    paddingLeft: OFFSET * 1.5,
    paddingRight: OFFSET,
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
