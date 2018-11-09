import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from 'reactor/common';

const { COLOR, OFFSET, UNIT } = THEME;

export default StyleSheet.create({
  button: {
    paddingHorizontal: UNIT,
  },

  dialogContainer: {
    justifyContent: 'flex-end',
    padding: OFFSET,
  },

  dialog: {
    width: '100%',
    backgroundColor: COLOR.BLACK,
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
