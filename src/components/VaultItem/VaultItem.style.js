import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const {
  BORDER_RADIUS, COLOR, OFFSET, UNIT,
} = THEME;

export default StyleSheet.create({
  background: {
    left: -OFFSET / 2,
    opacity: 0.1,
    position: 'absolute',
    top: -OFFSET / 2,
  },

  balance: {
    marginTop: UNIT / 2,
    opacity: 0.5,
  },

  chart: {
    height: UNIT * 4,
    width: UNIT * 4,
    borderRadius: UNIT * 2,
    backgroundColor: COLOR.WHITE,
    marginRight: OFFSET / 2,
    opacity: 0.5,
  },

  container: {
    ...LAYOUT.STYLE.SHADOW,
    backgroundColor: COLOR.WHITE,
    borderRadius: BORDER_RADIUS,
    padding: OFFSET,
    margin: OFFSET / 2,
    shadowColor: COLOR.TEXT_LIGHTEN,
    overflow: 'hidden',
    width: (LAYOUT.VIEWPORT.W / 2) - (OFFSET * 1.5),
  },

  content: {
    ...LAYOUT.STYLE.ROW,
  },

  info: {
    flex: 1,
  },


  row: LAYOUT.STYLE.ROW,

  text: {
    // color: COLOR.WHITE,
  },
});
