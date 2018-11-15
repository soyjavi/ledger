import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const {
  BORDER_RADIUS, COLOR, OFFSET, UNIT,
} = THEME;

export default StyleSheet.create({
  button: {
    paddingHorizontal: UNIT,
  },

  dialog: {
    backgroundColor: COLOR.BLACK,
    borderRadius: BORDER_RADIUS,
    bottom: OFFSET,
    left: OFFSET,
    right: OFFSET,
    position: 'absolute',
  },

  container: {
    ...LAYOUT.STYLE.ROW,
    marginTop: OFFSET,
  },

  text: {
    color: COLOR.WHITE,
    flex: 1,
    lineHeight: UNIT * 1.4,
  },
});
