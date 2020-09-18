import { StyleSheet } from 'react-native';
import { THEME } from 'reactor/common';

const { COLOR, SPACE } = THEME;

const SIZE = {
  S: SPACE.M,
  M: SPACE.L,
  L: SPACE.XXL,
};

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR.TEXT,
    borderRadius: SIZE.M,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZE.M,
    width: SIZE.M,
  },

  S: {
    borderRadius: SIZE.S,
    height: SIZE.S,
    width: SIZE.S,
  },

  L: {
    borderRadius: SIZE.L,
    height: SIZE.L,
    width: SIZE.L,
  },

  font: {
    height: SIZE.M,
    lineHeight: SIZE.M,
    textAlign: 'center',
    width: SIZE.M,
  },

  fontS: {
    fontSize: SIZE.S * 0.68,
    height: SIZE.S,
    lineHeight: SIZE.S,
    width: SIZE.S,
  },

  fontL: {
    fontSize: SIZE.L * 0.5,
    height: SIZE.L,
    lineHeight: SIZE.L,
    width: SIZE.L,
  },
});
