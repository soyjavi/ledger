import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { OFFSET, UNIT } = THEME;
const ICON_SIZE = UNIT * 3.6;

export default StyleSheet.create({
  container: {
    paddingVertical: OFFSET / 1.5,
    paddingHorizontal: OFFSET,
  },

  containerHighlight: {
    opacity: 0.66,
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
    alignItems: 'flex-end',
  },

  row: LAYOUT.STYLE.ROW,

  texts: {
    flex: 1,
  },
});
