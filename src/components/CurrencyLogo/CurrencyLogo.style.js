import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { COLOR, SPACE } = THEME;

const SIZE = SPACE.M + SPACE.XS;

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.TEXT,
    borderRadius: SIZE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZE,
    width: SIZE,
  },

  font: {
    height: SIZE,
    lineHeight: SIZE * 1.05,
    overflow: 'hidden',
    textAlign: 'center',
    width: SIZE,
  },
});
