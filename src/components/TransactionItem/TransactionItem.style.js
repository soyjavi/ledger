import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { UNIT, SPACE } = THEME;
const ICON_SIZE = UNIT * 3.6;

export default StyleSheet.create({
  caption: {
    marginTop: SPACE.XXS,
  },

  container: {
    paddingVertical: SPACE.XS,
    paddingHorizontal: SPACE.REGULAR,
  },

  content: {
    alignItems: 'flex-start',
    flex: 1,
  },

  icon: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    height: ICON_SIZE,
    justifyContent: 'center',
    marginRight: UNIT,
    width: ICON_SIZE,
  },

  prices: {
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
  },

  row: LAYOUT.STYLE.ROW,

  texts: {
    flex: 1,
  },


});
