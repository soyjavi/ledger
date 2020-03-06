import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { UNIT, SPACE } = THEME;

export default StyleSheet.create({
  box: {
    marginRight: UNIT,
  },

  boxContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    flex: 1,
  },

  buttonGap: {
    width: SPACE.M,
  },

  day: {
    lineHeight: UNIT * 2,
  },

  month: {
    fontSize: UNIT,
    lineHeight: UNIT,
  },

  prices: {
    alignItems: 'flex-end',
  },

  texts: {
    flex: 1,
  },
});
