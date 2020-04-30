import { StyleSheet } from 'react-native';

import { THEME } from '../../reactor/common';

const { COLOR, FONT, SPACE } = THEME;

export default StyleSheet.create({
  content: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.BASE,
  },

  focus: {
    borderBottomColor: COLOR.TEXT,
  },

  value: {
    // paddingLeft: SPACE.L,
    minWidth: SPACE.L,
  },

  input: {
    padding: 0,
    margin: 0,
    height: SPACE.XXL,
  },

  inputCurrency: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: SPACE.XXL,
    opacity: 0,
  },

  inputText: {
    ...FONT.SUBTITLE,
    flex: 1,
    textAlign: 'center',
  },
});
