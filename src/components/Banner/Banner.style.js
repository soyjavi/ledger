import { StyleSheet } from 'react-native';
import { LAYOUT, THEME } from 'reactor/common';

const { SPACE } = THEME;
const { VIEWPORT } = LAYOUT;
const IMAGE_HEIGHT = VIEWPORT.H / 4 > 512 ? 512 : VIEWPORT.H / 4;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  image: {
    height: IMAGE_HEIGHT,
    width: '75%',
  },

  imageSmall: {
    height: IMAGE_HEIGHT / 1.5,
    width: '75%',
  },

  left: {
    alignItems: 'flex-start',
  },

  right: {
    alignItems: 'flex-end',
    alignContent: 'flex-end',
  },

  text: {
    textAlign: 'center',
  },

  textleft: {
    textAlign: 'left',
    marginRight: SPACE.XXL,
  },

  textright: {
    textAlign: 'right',
    marginLeft: SPACE.XXL + SPACE.M,
  },
});
