import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  icon: {
    backgroundColor: COLOR.BASE,
    borderRadius: UNIT,
    height: UNIT * 4.8,
    width: UNIT * 4.8,
    marginRight: UNIT,
  },

  container: {
    ...LAYOUT.STYLE.ROW,
    alignItems: 'flex-start',
    paddingVertical: OFFSET / 1.5,
    paddingLeft: OFFSET * 1.5,
    paddingRight: OFFSET,
  },

  prices: {
    alignItems: 'flex-end',
  },

  texts: {
    flex: 1,
  },
});
