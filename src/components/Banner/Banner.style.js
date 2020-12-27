import { StyleSheet } from 'react-native';
import { LAYOUT } from 'reactor/common';

const { VIEWPORT } = LAYOUT;
const IMAGE_HEIGHT = VIEWPORT.H / 3 > 512 ? 512 : VIEWPORT.H / 3;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  image: {
    height: IMAGE_HEIGHT,
    width: '95%',
  },

  left: {
    alignItems: 'flex-start',
    maxWidth: '95%',
  },

  right: {
    alignItems: 'flex-end',
    maxWidth: '95%',
  },

  text: {
    textAlign: 'center',
  },

  textleft: {
    textAlign: 'left',
  },

  textright: {
    textAlign: 'right',
  },
});
