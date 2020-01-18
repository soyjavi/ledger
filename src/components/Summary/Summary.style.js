import { StyleSheet } from 'react-native';

import { LAYOUT, THEME } from '../../reactor/common';

const { COLOR, SPACE, UNIT } = THEME;

export default StyleSheet.create({
  balance: {
    fontSize: UNIT * 3.2,
    lineHeight: UNIT * 3.2,
    marginTop: SPACE.XS,
  },

  box: {
    marginRight: SPACE.S,
    flex: 1,
  },

  button: {
    backgroundColor: COLOR.ACCENT,
  },

  spaceBetween: {
    justifyContent: 'space-between',
  },

  container: {
    paddingHorizontal: SPACE.MEDIUM,
    marginBottom: SPACE.MEDIUM,
  },

  content: {
    alignItems: 'flex-start',
    marginBottom: SPACE.MEDIUM,
  },

  image: {
    height: UNIT * 1.4,
    width: UNIT * 1.4,
    marginRight: SPACE.XXS,
  },

  row: LAYOUT.STYLE.ROW,
});
