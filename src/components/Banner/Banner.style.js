import { StyleSheet } from 'react-native';
import { LAYOUT } from 'reactor/common';

const {
  VIEWPORT: { H },
} = LAYOUT;

let IMAGE_HEIGHT = H / 4;
if (IMAGE_HEIGHT > 512) IMAGE_HEIGHT = 512;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  image: {
    height: IMAGE_HEIGHT,
    width: '100%',
  },

  left: {
    alignItems: 'left',
  },

  right: {
    alignItems: 'right',
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
