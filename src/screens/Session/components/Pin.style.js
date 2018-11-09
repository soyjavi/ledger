import { StyleSheet } from 'react-native';

import { THEME } from 'reactor/common';

const { COLOR, UNIT, OFFSET } = THEME;

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: OFFSET,
  },

  code: {
    width: OFFSET,
    height: OFFSET,
    borderRadius: OFFSET / 2,
    margin: UNIT,
    backgroundColor: COLOR.WHITE,
  },

  active: {
    backgroundColor: COLOR.TEXT_HIGHLIGHT,
  },
});
